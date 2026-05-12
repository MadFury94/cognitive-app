'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BrainMeshProps {
    progress: number;
    currentQuestion: number;
}

function ProceduralBrain({ progress, currentQuestion }: BrainMeshProps) {
    const meshRef = useRef<THREE.Group>(null);

    // Create a procedural brain-like structure
    const brainGeometry = useMemo(() => {
        const group = new THREE.Group();

        // Main cerebrum (two hemispheres)
        const cerebrumGeometry = new THREE.SphereGeometry(1, 32, 32);
        const leftHemisphere = new THREE.Mesh(
            cerebrumGeometry,
            new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.05 + progress * 0.1, 0.7, 0.5),
                roughness: 0.7,
                metalness: 0.3,
            })
        );
        leftHemisphere.scale.set(0.5, 1, 1);
        leftHemisphere.position.x = -0.5;

        const rightHemisphere = new THREE.Mesh(
            cerebrumGeometry,
            new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.05 + progress * 0.1, 0.7, 0.5),
                roughness: 0.7,
                metalness: 0.3,
            })
        );
        rightHemisphere.scale.set(0.5, 1, 1);
        rightHemisphere.position.x = 0.5;

        // Cerebellum (back lower part)
        const cerebellumGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const cerebellum = new THREE.Mesh(
            cerebellumGeometry,
            new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.1 + progress * 0.15, 0.6, 0.45),
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        cerebellum.position.set(0, -0.6, -0.8);
        cerebellum.scale.set(1, 0.8, 1);

        // Brain stem
        const stemGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.8, 16);
        const stem = new THREE.Mesh(
            stemGeometry,
            new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.08, 0.5, 0.4),
                roughness: 0.9,
                metalness: 0.1,
            })
        );
        stem.position.set(0, -1, -0.3);

        group.add(leftHemisphere, rightHemisphere, cerebellum, stem);

        return group;
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle rotation
            meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;

            // Pulse effect based on progress
            const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02 * progress;
            meshRef.current.scale.setScalar(scale);
        }
    });

    useEffect(() => {
        if (meshRef.current) {
            // Update colors based on progress
            meshRef.current.children.forEach((child, index) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    const hue = 0.05 + (progress * 0.15) + (index * 0.02);
                    child.material.color.setHSL(hue, 0.7, 0.5 + progress * 0.1);
                    child.material.emissive.setHSL(hue, 0.5, progress * 0.3);
                    child.material.needsUpdate = true;
                }
            });
        }
    }, [progress, currentQuestion]);

    return (
        <group ref={meshRef}>
            <primitive object={brainGeometry} />
        </group>
    );
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#ff6b35" />
            <hemisphereLight args={['#ffffff', '#444444', 0.6]} />
        </>
    );
}

function CameraSetup() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(3, 1, 3);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    return null;
}

interface InteractiveBrainViewerProps {
    progress: number;
    currentQuestion: number;
}

export default function InteractiveBrainViewer({ progress = 0, currentQuestion = 0 }: InteractiveBrainViewerProps) {
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
            <Canvas
                camera={{ position: [3, 1, 3], fov: 50 }}
                shadows
                gl={{ antialias: true, alpha: true }}
            >
                <CameraSetup />
                <Lights />
                <ProceduralBrain progress={normalizedProgress} currentQuestion={currentQuestion} />
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={2}
                    maxDistance={6}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 6}
                    autoRotate={false}
                    enableDamping
                    dampingFactor={0.05}
                />
                <gridHelper args={[10, 10, '#444444', '#222222']} position={[0, -2, 0]} />
            </Canvas>

            {/* Progress indicator overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-semibold">Brain Activity</span>
                    <span className="text-brand-400 text-sm font-bold">{Math.round(normalizedProgress * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-brand-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${normalizedProgress * 100}%` }}
                    />
                </div>
                <p className="text-gray-300 text-xs mt-2">
                    {normalizedProgress < 0.3 && "Starting assessment..."}
                    {normalizedProgress >= 0.3 && normalizedProgress < 0.6 && "Processing cognitive patterns..."}
                    {normalizedProgress >= 0.6 && normalizedProgress < 0.9 && "Analyzing brain regions..."}
                    {normalizedProgress >= 0.9 && "Assessment complete!"}
                </p>
            </div>

            {/* Controls hint */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
                <p>🖱️ Drag to rotate</p>
                <p>🔍 Scroll to zoom</p>
            </div>
        </div>
    );
}
