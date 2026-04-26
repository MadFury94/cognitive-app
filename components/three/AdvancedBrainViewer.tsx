'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BrainModelProps {
    progress: number;
}

function BrainModel({ progress }: BrainModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const [color, setColor] = useState('#ffccaa');

    // Update color based on progress
    useEffect(() => {
        if (progress > 0.8) {
            setColor('#10b981'); // Green for excellent
        } else if (progress > 0.6) {
            setColor('#3b82f6'); // Blue for good
        } else if (progress > 0.4) {
            setColor('#f59e0b'); // Orange for needs attention
        } else {
            setColor('#ffccaa'); // Default brain color
        }
    }, [progress]);

    // Create procedural brain geometry
    const brainGeometry = useRef<THREE.Group>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        // Create a brain-like shape using multiple spheres
        const group = new THREE.Group();

        // Main cerebrum (two hemispheres)
        const leftHemisphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32, 0, Math.PI),
            new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.7,
                metalness: 0.1
            })
        );
        leftHemisphere.position.x = -0.3;

        const rightHemisphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32, Math.PI, Math.PI),
            new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.7,
                metalness: 0.1
            })
        );
        rightHemisphere.position.x = 0.3;

        // Cerebellum (smaller, at the back-bottom)
        const cerebellum = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 32, 32),
            new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.7,
                metalness: 0.1
            })
        );
        cerebellum.position.set(0, -0.6, -0.5);

        // Brain stem
        const brainStem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.2, 0.6, 16),
            new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.7,
                metalness: 0.1
            })
        );
        brainStem.position.set(0, -1, -0.3);

        group.add(leftHemisphere, rightHemisphere, cerebellum, brainStem);

        // Clear previous geometry
        while (meshRef.current.children.length > 0) {
            meshRef.current.remove(meshRef.current.children[0]);
        }

        meshRef.current.add(group);
        brainGeometry.current = group;
    }, [color]);

    // Animate rotation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    return (
        <group ref={meshRef} scale={1.2}>
            {/* Lighting will be added by the scene */}
        </group>
    );
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
            />
            <directionalLight
                position={[-5, 0, -5]}
                intensity={0.3}
                color="#8888ff"
            />
            <directionalLight
                position={[0, -5, 0]}
                intensity={0.4}
            />
            <hemisphereLight
                color="#ffffff"
                groundColor="#444444"
                intensity={0.3}
            />
        </>
    );
}

interface AdvancedBrainViewerProps {
    progress?: number;
}

export default function AdvancedBrainViewer({ progress = 0 }: AdvancedBrainViewerProps) {
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 75 }}
            >
                <Lights />
                <BrainModel progress={normalizedProgress} />
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    rotateSpeed={0.8}
                    minDistance={2}
                    maxDistance={10}
                    enablePan={true}
                    panSpeed={0.8}
                    zoomSpeed={1.2}
                />
            </Canvas>
        </div>
    );
}
