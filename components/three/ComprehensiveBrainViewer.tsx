'use client';

import { useRef, useEffect, useMemo, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Brain } from 'lucide-react';

interface BrainRegion {
    geometry: THREE.BufferGeometry;
    material: THREE.MeshPhysicalMaterial;
    position: THREE.Vector3;
    scale: THREE.Vector3;
    name: string;
}

interface BrainMeshProps {
    progress: number;
    currentQuestion: number;
}

function ComprehensiveBrain({ progress, currentQuestion }: BrainMeshProps) {
    const groupRef = useRef<THREE.Group>(null);
    const clockRef = useRef(new THREE.Clock());

    // Create detailed brain regions with PBR materials
    const brainRegions = useMemo(() => {
        const regions: BrainRegion[] = [];

        // Left Hemisphere - Cerebrum
        const leftHemisphereGeo = new THREE.SphereGeometry(1, 64, 64, 0, Math.PI);
        const leftHemisphereMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color().setHSL(0.05, 0.7, 0.5),
            roughness: 0.4,
            metalness: 0.1,
            clearcoat: 0.3,
            clearcoatRoughness: 0.2,
            envMapIntensity: 0.8,
        });
        regions.push({
            geometry: leftHemisphereGeo,
            material: leftHemisphereMat,
            position: new THREE.Vector3(-0.05, 0, 0),
            scale: new THREE.Vector3(1, 1.1, 1),
            name: 'leftHemisphere'
        });

        // Right Hemisphere - Cerebrum
        const rightHemisphereGeo = new THREE.SphereGeometry(1, 64, 64, Math.PI, Math.PI);
        const rightHemisphereMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color().setHSL(0.05, 0.7, 0.5),
            roughness: 0.4,
            metalness: 0.1,
            clearcoat: 0.3,
            clearcoatRoughness: 0.2,
            envMapIntensity: 0.8,
        });
        regions.push({
            geometry: rightHemisphereGeo,
            material: rightHemisphereMat,
            position: new THREE.Vector3(0.05, 0, 0),
            scale: new THREE.Vector3(1, 1.1, 1),
            name: 'rightHemisphere'
        });

        // Cerebellum
        const cerebellumGeo = new THREE.SphereGeometry(0.45, 48, 48);
        const cerebellumMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color().setHSL(0.08, 0.65, 0.45),
            roughness: 0.5,
            metalness: 0.05,
            clearcoat: 0.2,
            envMapIntensity: 0.7,
        });
        regions.push({
            geometry: cerebellumGeo,
            material: cerebellumMat,
            position: new THREE.Vector3(0, -0.7, -0.9),
            scale: new THREE.Vector3(1, 0.85, 1),
            name: 'cerebellum'
        });

        // Brain Stem
        const stemGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.9, 32);
        const stemMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color().setHSL(0.06, 0.55, 0.4),
            roughness: 0.6,
            metalness: 0.05,
            clearcoat: 0.15,
            envMapIntensity: 0.6,
        });
        regions.push({
            geometry: stemGeo,
            material: stemMat,
            position: new THREE.Vector3(0, -1.15, -0.35),
            scale: new THREE.Vector3(1, 1, 1),
            name: 'brainStem'
        });

        // Corpus Callosum (connecting structure)
        const corpusGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
        const corpusMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color().setHSL(0.1, 0.5, 0.55),
            roughness: 0.3,
            metalness: 0.2,
            clearcoat: 0.4,
            envMapIntensity: 0.9,
        });
        corpusGeo.rotateZ(Math.PI / 2);
        regions.push({
            geometry: corpusGeo,
            material: corpusMat,
            position: new THREE.Vector3(0, 0.1, 0),
            scale: new THREE.Vector3(1, 1, 1),
            name: 'corpusCallosum'
        });

        return regions;
    }, []);

    // Create meshes from regions
    const meshes = useMemo(() => {
        return brainRegions.map(region => {
            const mesh = new THREE.Mesh(region.geometry, region.material);
            mesh.position.copy(region.position);
            mesh.scale.copy(region.scale);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.name = region.name;
            return mesh;
        });
    }, [brainRegions]);

    // Animation loop
    useFrame((state) => {
        if (!groupRef.current) return;

        const elapsed = clockRef.current.getElapsedTime();
        const delta = state.clock.getDelta();

        // Gentle rotation based on progress
        groupRef.current.rotation.y = Math.sin(elapsed * 0.2) * 0.3 + progress * 0.5;
        groupRef.current.rotation.x = Math.sin(elapsed * 0.15) * 0.1;

        // Breathing/pulsing effect
        const pulseScale = 1 + Math.sin(elapsed * 1.5) * 0.02 * (progress + 0.2);
        groupRef.current.scale.setScalar(pulseScale);

        // Update materials based on progress and question
        meshes.forEach((mesh, index) => {
            const material = mesh.material as THREE.MeshPhysicalMaterial;

            // Color shift based on progress
            const hue = 0.05 + (progress * 0.15) + (Math.sin(elapsed + index) * 0.02);
            const saturation = 0.6 + progress * 0.2;
            const lightness = 0.45 + progress * 0.15;
            material.color.setHSL(hue, saturation, lightness);

            // Emissive glow based on activity
            const emissiveIntensity = progress * 0.3 + Math.sin(elapsed * 2 + index) * 0.1;
            material.emissive.setHSL(hue, 0.8, emissiveIntensity);
            material.emissiveIntensity = emissiveIntensity;

            // Highlight active region based on question
            if (index === currentQuestion % meshes.length) {
                material.clearcoat = 0.8;
                material.clearcoatRoughness = 0.1;
                const highlightPulse = (Math.sin(elapsed * 4) + 1) * 0.5;
                material.emissive.setHSL(0.15, 1, 0.3 + highlightPulse * 0.2);
            } else {
                material.clearcoat = 0.3;
                material.clearcoatRoughness = 0.2;
            }

            // Subtle individual oscillation
            mesh.position.y += Math.sin(elapsed * 2 + index) * 0.001;
        });
    });

    return (
        <group ref={groupRef}>
            {meshes.map((mesh, index) => (
                <primitive key={index} object={mesh} />
            ))}
        </group>
    );
}

function Lighting() {
    const lightGroupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!lightGroupRef.current) return;
        const elapsed = state.clock.getElapsedTime();
        lightGroupRef.current.rotation.y = elapsed * 0.1;
    });

    return (
        <group ref={lightGroupRef}>
            {/* Ambient base lighting */}
            <ambientLight intensity={0.3} />

            {/* Hemisphere light for natural gradient */}
            <hemisphereLight args={['#ffffff', '#444444', 0.4]} />

            {/* Key light */}
            <directionalLight
                position={[5, 8, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Fill light */}
            <directionalLight
                position={[-5, 3, -5]}
                intensity={0.5}
                color="#4488ff"
            />

            {/* Rim light */}
            <directionalLight
                position={[0, -5, -8]}
                intensity={0.6}
                color="#ff8844"
            />

            {/* Accent point lights */}
            <pointLight position={[3, 2, 3]} intensity={0.8} color="#ff6b35" distance={10} />
            <pointLight position={[-3, 2, -3]} intensity={0.8} color="#4ecdc4" distance={10} />
        </group>
    );
}

function CameraSetup() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(3.5, 1.5, 3.5);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    return null;
}

interface ComprehensiveBrainViewerProps {
    progress: number;
    currentQuestion: number;
}

// Fallback 2D Brain Visualization
function FallbackBrainVisualization({ progress, currentQuestion }: ComprehensiveBrainViewerProps) {
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const regions = [
        { name: 'Left Hemisphere', color: 'from-brand-500 to-brand-600' },
        { name: 'Right Hemisphere', color: 'from-brand-400 to-brand-500' },
        { name: 'Cerebellum', color: 'from-yellow-500 to-brand-500' },
        { name: 'Brain Stem', color: 'from-brand-600 to-red-500' },
        { name: 'Corpus Callosum', color: 'from-yellow-400 to-brand-400' },
    ];

    return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex items-center justify-center">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-brand-500 via-yellow-500 to-green-500"
                    style={{
                        transform: `rotate(${rotation}deg) scale(1.5)`,
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            {/* Brain illustration */}
            <div className="relative w-64 h-64">
                {/* Main brain shape */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Brain
                        className="w-48 h-48 text-brand-500 animate-pulse"
                        style={{
                            filter: `drop-shadow(0 0 ${20 + normalizedProgress * 30}px rgba(251, 146, 60, ${0.5 + normalizedProgress * 0.5}))`,
                            transform: `scale(${1 + normalizedProgress * 0.2})`,
                        }}
                    />
                </div>

                {/* Pulsing rings */}
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-brand-500/30 animate-ping"
                        style={{
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '3s',
                        }}
                    />
                ))}

                {/* Activity particles */}
                {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2 + (rotation * Math.PI / 180);
                    const radius = 100 + Math.sin(rotation * 0.05 + i) * 20;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const isActive = i === currentQuestion % 8;

                    return (
                        <div
                            key={i}
                            className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-yellow-400 scale-150' : 'bg-brand-500'
                                }`}
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                                opacity: 0.6 + normalizedProgress * 0.4,
                                boxShadow: isActive ? '0 0 20px rgba(250, 204, 21, 0.8)' : '0 0 10px rgba(251, 146, 60, 0.5)',
                            }}
                        />
                    );
                })}
            </div>

            {/* Progress overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-semibold">Neural Activity</span>
                    <span className="text-brand-400 text-sm font-bold">
                        {Math.round(normalizedProgress * 100)}%
                    </span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-brand-500 via-yellow-500 to-green-500"
                        style={{ width: `${normalizedProgress * 100}%` }}
                    />
                </div>
                <p className="text-gray-300 text-xs mt-2">
                    {normalizedProgress < 0.25 && "🧠 Initializing cognitive assessment..."}
                    {normalizedProgress >= 0.25 && normalizedProgress < 0.5 && "⚡ Processing attention patterns..."}
                    {normalizedProgress >= 0.5 && normalizedProgress < 0.75 && "🎯 Analyzing memory systems..."}
                    {normalizedProgress >= 0.75 && normalizedProgress < 1 && "✨ Evaluating executive function..."}
                    {normalizedProgress >= 1 && "✅ Assessment complete!"}
                </p>
            </div>

            {/* Region indicator */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10">
                <p className="text-white text-xs font-semibold mb-1">Active Region:</p>
                <p className="text-brand-400 text-sm">
                    {regions[currentQuestion % 5].name}
                </p>
            </div>

            {/* WebGL unavailable notice */}
            <div className="absolute top-4 right-4 bg-yellow-500/20 backdrop-blur-md rounded-lg p-3 border border-yellow-500/30">
                <p className="text-yellow-300 text-xs">
                    ⚠️ 3D view unavailable
                </p>
            </div>
        </div>
    );
}

export default function ComprehensiveBrainViewer({
    progress = 0,
    currentQuestion = 0
}: ComprehensiveBrainViewerProps) {
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);
    const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        // Check WebGL availability
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            setWebGLAvailable(!!gl);
        } catch (e) {
            console.warn('WebGL check failed:', e);
            setWebGLAvailable(false);
        }
    }, []);

    // Show fallback if WebGL is not available
    if (webGLAvailable === false) {
        return <FallbackBrainVisualization progress={progress} currentQuestion={currentQuestion} />;
    }

    // Show loading while checking
    if (webGLAvailable === null) {
        return (
            <div className="w-full h-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex items-center justify-center">
                <Brain className="w-20 h-20 text-brand-600 animate-pulse" />
            </div>
        );
    }

    // Render 3D version
    return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    failIfMajorPerformanceCaveat: false,
                }}
                camera={{ position: [3.5, 1.5, 3.5], fov: 50, near: 0.1, far: 1000 }}
                onCreated={() => setWebGLAvailable(true)}
            >
                <CameraSetup />
                <Lighting />

                <Suspense fallback={null}>
                    <ComprehensiveBrain
                        progress={normalizedProgress}
                        currentQuestion={currentQuestion}
                    />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={8}
                    maxPolarAngle={Math.PI / 1.3}
                    minPolarAngle={Math.PI / 6}
                    autoRotate={false}
                    enableDamping
                    dampingFactor={0.05}
                    rotateSpeed={0.5}
                    zoomSpeed={0.8}
                />

                {/* Ground plane for shadows */}
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -2.5, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[20, 20]} />
                    <shadowMaterial opacity={0.3} />
                </mesh>
            </Canvas>

            {/* Progress overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-semibold">Neural Activity</span>
                    <span className="text-brand-400 text-sm font-bold">
                        {Math.round(normalizedProgress * 100)}%
                    </span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-brand-500 via-yellow-500 to-green-500"
                        style={{ width: `${normalizedProgress * 100}%` }}
                    />
                </div>
                <p className="text-gray-300 text-xs mt-2">
                    {normalizedProgress < 0.25 && "🧠 Initializing cognitive assessment..."}
                    {normalizedProgress >= 0.25 && normalizedProgress < 0.5 && "⚡ Processing attention patterns..."}
                    {normalizedProgress >= 0.5 && normalizedProgress < 0.75 && "🎯 Analyzing memory systems..."}
                    {normalizedProgress >= 0.75 && normalizedProgress < 1 && "✨ Evaluating executive function..."}
                    {normalizedProgress >= 1 && "✅ Assessment complete!"}
                </p>
            </div>

            {/* Controls hint */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-3 text-white text-xs space-y-1 border border-white/10">
                <p className="font-semibold mb-1">Controls:</p>
                <p>🖱️ Left drag: Rotate</p>
                <p>🖱️ Right drag: Pan</p>
                <p>🔍 Scroll: Zoom</p>
            </div>

            {/* Region indicator */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10">
                <p className="text-white text-xs font-semibold mb-1">Active Region:</p>
                <p className="text-brand-400 text-sm">
                    {['Left Hemisphere', 'Right Hemisphere', 'Cerebellum', 'Brain Stem', 'Corpus Callosum'][currentQuestion % 5]}
                </p>
            </div>
        </div>
    );
}
