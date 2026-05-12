'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Brain } from 'lucide-react';

interface BrainModelProps {
    progress: number;
    currentQuestion: number;
}

// Brain region data
const BRAIN_REGIONS = [
    {
        name: 'Occipital & Temporal Lobes',
        function: 'Reading & Language',
        description: 'Visual word recognition and language comprehension',
        color: '#3b82f6', // Blue
        icon: '📖'
    },
    {
        name: 'Prefrontal Cortex',
        function: 'Attention & Focus',
        description: 'Sustained attention and concentration control',
        color: '#f97316', // Orange
        icon: '🎯'
    },
    {
        name: 'Hippocampus & Temporal Lobe',
        function: 'Working Memory',
        description: 'Short-term memory storage and recall',
        color: '#a855f7', // Purple
        icon: '🧠'
    },
    {
        name: 'Parietal Lobe',
        function: 'Processing Speed',
        description: 'Mathematical reasoning and numerical processing',
        color: '#22c55e', // Green
        icon: '⚡'
    },
    {
        name: 'Frontal Lobe',
        function: 'Executive Function',
        description: 'Planning, sequencing, and multi-step coordination',
        color: '#ef4444', // Red
        icon: '🎓'
    },
];

// Realistic Brain Model Component
function RealisticBrainModel({ progress, currentQuestion }: BrainModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [brainMeshes, setBrainMeshes] = useState<THREE.Mesh[]>([]);

    const { scene } = useGLTF('/models/brain.glb/scene.gltf', true);

    useEffect(() => {
        if (scene) {
            const meshes: THREE.Mesh[] = [];
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    meshes.push(child);
                }
            });
            setBrainMeshes(meshes);

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim; // Larger scale for HD view

            scene.scale.setScalar(scale);
            scene.position.sub(center.multiplyScalar(scale));
        }
    }, [scene]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const elapsed = state.clock.getElapsedTime();

        // Smooth constant rotation
        groupRef.current.rotation.y = elapsed * 0.08;
        groupRef.current.rotation.x = 0.05;

        // Natural brain color - no changes
        brainMeshes.forEach((mesh) => {
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
                mesh.material.color.setHSL(0.05, 0.35, 0.52);
                mesh.material.emissive.setHSL(0, 0, 0);
                mesh.material.emissiveIntensity = 0;
                mesh.material.roughness = 0.6;
                mesh.material.metalness = 0.15;
            }
        });
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}

function Lighting() {
    return (
        <>
            <ambientLight intensity={0.7} />
            <hemisphereLight args={['#ffffff', '#8888aa', 0.5]} />
            <directionalLight
                position={[5, 8, 5]}
                intensity={2}
                castShadow
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
            />
            <directionalLight position={[-5, 3, -5]} intensity={1} color="#b8d4ff" />
            <pointLight position={[0, 5, 0]} intensity={0.6} color="#ffffff" distance={20} />
        </>
    );
}

interface ClearBrainViewerProps {
    progress: number;
    currentQuestion: number;
}

export default function ClearBrainViewer({
    progress = 0,
    currentQuestion = 0
}: ClearBrainViewerProps) {
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);
    const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const currentRegion = BRAIN_REGIONS[currentQuestion % 5];

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            setWebGLAvailable(!!gl);
        } catch (e) {
            setWebGLAvailable(false);
        }
    }, []);

    // Mobile or no WebGL - simple fallback, no 3D
    if (isMobile || webGLAvailable === false || webGLAvailable === null) {
        return (
            <div className="w-full h-full relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center px-4">
                    <Brain className="w-20 h-20 text-brand-500 mx-auto mb-3" />
                    <p className="text-white font-semibold text-sm">{currentRegion.function}</p>
                    <p className="text-gray-400 text-xs mt-1">{currentRegion.name}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Large HD Brain Canvas */}
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.3,
                }}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <Lighting />

                <Suspense fallback={null}>
                    <RealisticBrainModel
                        progress={normalizedProgress}
                        currentQuestion={currentQuestion}
                    />
                    <Environment preset="sunset" />
                </Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={8}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 4}
                    enableDamping
                    dampingFactor={0.08}
                    rotateSpeed={0.6}
                    zoomSpeed={0.6}
                />

                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
                    <planeGeometry args={[30, 30]} />
                    <shadowMaterial opacity={0.2} />
                </mesh>
            </Canvas>

            {/* Top Label - Current Function */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                <div
                    className="bg-black/70 backdrop-blur-md rounded-2xl px-6 py-3 border-2 shadow-2xl"
                    style={{ borderColor: currentRegion.color }}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{currentRegion.icon}</span>
                        <div>
                            <p className="text-white text-lg font-bold">{currentRegion.function}</p>
                            <p className="text-gray-300 text-xs">{currentRegion.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Description */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 max-w-md">
                <div className="bg-black/70 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                    <p className="text-gray-200 text-sm text-center leading-relaxed">
                        {currentRegion.description}
                    </p>
                </div>
            </div>

            {/* Left Side - Progress */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-gray-400 text-xs font-semibold mb-2">Progress</p>
                    <div className="w-3 h-48 bg-gray-700/50 rounded-full overflow-hidden">
                        <div
                            className="w-full rounded-full transition-all duration-500"
                            style={{
                                height: `${normalizedProgress * 100}%`,
                                background: `linear-gradient(to top, ${currentRegion.color}, #fbbf24)`,
                            }}
                        />
                    </div>
                    <p className="text-white text-lg font-bold mt-2 text-center">
                        {Math.round(normalizedProgress * 100)}%
                    </p>
                </div>
            </div>

            {/* Right Side - Controls */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/20 space-y-3">
                    <p className="text-gray-400 text-xs font-semibold mb-2">Controls</p>
                    <div className="space-y-2 text-xs text-gray-300">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">🖱️</div>
                            <span>Drag to rotate</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">🔍</div>
                            <span>Scroll to zoom</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">👆</div>
                            <span>Right-click pan</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Right - Status */}
            <div className="absolute bottom-6 right-6 z-10">
                <div className="bg-black/70 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                    <p className="text-gray-400 text-xs">
                        {normalizedProgress < 0.25 && "🧠 Initializing assessment..."}
                        {normalizedProgress >= 0.25 && normalizedProgress < 0.5 && "⚡ Processing patterns..."}
                        {normalizedProgress >= 0.5 && normalizedProgress < 0.75 && "🎯 Analyzing systems..."}
                        {normalizedProgress >= 0.75 && normalizedProgress < 1 && "✨ Evaluating function..."}
                        {normalizedProgress >= 1 && "✅ Complete!"}
                    </p>
                </div>
            </div>

            {/* Question Indicator - Top Right */}
            <div className="absolute top-6 right-6 z-10">
                <div
                    className="bg-black/70 backdrop-blur-md rounded-full w-16 h-16 flex items-center justify-center border-4 shadow-xl"
                    style={{ borderColor: currentRegion.color }}
                >
                    <div className="text-center">
                        <p className="text-white text-2xl font-bold">{currentQuestion + 1}</p>
                        <p className="text-gray-400 text-xs">of 5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Preload the model
useGLTF.preload('/models/brain.glb/scene.gltf');
