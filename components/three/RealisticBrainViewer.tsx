'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Brain } from 'lucide-react';

interface BrainModelProps {
    progress: number;
    currentQuestion: number;
}

// Brain region mapping based on cognitive functions
const BRAIN_REGIONS = [
    {
        name: 'Occipital & Temporal Lobes',
        function: 'Reading & Language Processing',
        description: 'Visual word recognition and language comprehension',
        color: { h: 0.55, s: 0.8, l: 0.5 } // Blue-green
    },
    {
        name: 'Prefrontal Cortex',
        function: 'Attention & Focus',
        description: 'Sustained attention and concentration control',
        color: { h: 0.15, s: 0.9, l: 0.5 } // Orange
    },
    {
        name: 'Hippocampus & Temporal Lobe',
        function: 'Working Memory',
        description: 'Short-term memory storage and recall',
        color: { h: 0.75, s: 0.8, l: 0.5 } // Purple
    },
    {
        name: 'Parietal Lobe',
        function: 'Processing Speed',
        description: 'Mathematical reasoning and numerical processing',
        color: { h: 0.35, s: 0.8, l: 0.5 } // Green
    },
    {
        name: 'Frontal Lobe',
        function: 'Executive Function',
        description: 'Planning, sequencing, and multi-step task coordination',
        color: { h: 0.05, s: 0.9, l: 0.5 } // Red-orange
    },
];

// Realistic Brain Model Component
function RealisticBrainModel({ progress, currentQuestion }: BrainModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [brainMeshes, setBrainMeshes] = useState<THREE.Mesh[]>([]);

    // Load brain model from public folder
    // The model is at public/models/brain.glb/scene.gltf
    const { scene } = useGLTF('/models/brain.glb/scene.gltf', true);

    useEffect(() => {
        if (scene) {
            // Find all meshes in the loaded model
            const meshes: THREE.Mesh[] = [];
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    // Enable shadows
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Store original material
                    if (child.material instanceof THREE.Material) {
                        child.userData.originalMaterial = child.material.clone();
                    }

                    meshes.push(child);
                }
            });
            setBrainMeshes(meshes);

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim; // Scale to fit in 2 unit space

            scene.scale.setScalar(scale);
            scene.position.sub(center.multiplyScalar(scale));
        }
    }, [scene]);

    // Animation loop
    useFrame((state) => {
        if (!groupRef.current) return;

        const elapsed = state.clock.getElapsedTime();

        // Smooth, gentle rotation (no pulsing)
        groupRef.current.rotation.y = elapsed * 0.1; // Constant slow rotation
        groupRef.current.rotation.x = 0.1; // Slight tilt for better viewing

        // Keep scale constant (no pulsing)
        groupRef.current.scale.setScalar(1);

        // Keep brain natural color - no color changes
        brainMeshes.forEach((mesh) => {
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
                // Natural brain color - consistent
                const naturalHue = 0.05;
                const naturalSaturation = 0.35;
                const naturalLightness = 0.52;

                mesh.material.color.setHSL(naturalHue, naturalSaturation, naturalLightness);
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

// Fallback while loading or if model fails
function FallbackBrain({ progress, currentQuestion }: BrainModelProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const elapsed = state.clock.getElapsedTime();
        groupRef.current.rotation.y = elapsed * 0.3;
    });

    return (
        <group ref={groupRef}>
            {/* Simple brain shape as fallback */}
            <mesh position={[-0.3, 0, 0]} castShadow>
                <sphereGeometry args={[0.8, 32, 32, 0, Math.PI]} />
                <meshStandardMaterial
                    color={new THREE.Color().setHSL(0.05 + progress * 0.1, 0.7, 0.5)}
                    roughness={0.7}
                    metalness={0.2}
                />
            </mesh>
            <mesh position={[0.3, 0, 0]} castShadow>
                <sphereGeometry args={[0.8, 32, 32, Math.PI, Math.PI]} />
                <meshStandardMaterial
                    color={new THREE.Color().setHSL(0.05 + progress * 0.1, 0.7, 0.5)}
                    roughness={0.7}
                    metalness={0.2}
                />
            </mesh>
            <mesh position={[0, -0.6, -0.7]} castShadow>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial
                    color={new THREE.Color().setHSL(0.08 + progress * 0.1, 0.65, 0.45)}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>
        </group>
    );
}

function Lighting() {
    return (
        <>
            <ambientLight intensity={0.6} />
            <hemisphereLight args={['#ffffff', '#8888aa', 0.4]} />
            <directionalLight
                position={[5, 8, 5]}
                intensity={1.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#b8d4ff" />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" distance={15} />
        </>
    );
}

interface RealisticBrainViewerProps {
    progress: number;
    currentQuestion: number;
}

// 2D Fallback for no WebGL
function FallbackVisualization({ progress, currentQuestion }: RealisticBrainViewerProps) {
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500"
                    style={{
                        transform: `rotate(${rotation}deg) scale(1.5)`,
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Brain
                        className="w-48 h-48 text-orange-500 animate-pulse"
                        style={{
                            filter: `drop-shadow(0 0 ${20 + normalizedProgress * 30}px rgba(251, 146, 60, ${0.5 + normalizedProgress * 0.5}))`,
                            transform: `scale(${1 + normalizedProgress * 0.2})`,
                        }}
                    />
                </div>

                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping"
                        style={{
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '3s',
                        }}
                    />
                ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-semibold">Neural Activity</span>
                    <span className="text-orange-400 text-sm font-bold">{Math.round(normalizedProgress * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500"
                        style={{ width: `${normalizedProgress * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default function RealisticBrainViewer({
    progress = 0,
    currentQuestion = 0
}: RealisticBrainViewerProps) {
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);
    const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);
    const [modelError, setModelError] = useState(false);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            setWebGLAvailable(!!gl);
        } catch (e) {
            setWebGLAvailable(false);
        }
    }, []);

    if (webGLAvailable === false) {
        return <FallbackVisualization progress={progress} currentQuestion={currentQuestion} />;
    }

    if (webGLAvailable === null) {
        return (
            <div className="w-full h-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex items-center justify-center">
                <Brain className="w-20 h-20 text-orange-600 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                }}
                camera={{ position: [0, 0, 4], fov: 50 }}
            >
                <Lighting />

                <Suspense fallback={<FallbackBrain progress={normalizedProgress} currentQuestion={currentQuestion} />}>
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
                    minDistance={2.5}
                    maxDistance={6}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 4}
                    enableDamping
                    dampingFactor={0.08}
                    rotateSpeed={0.6}
                    zoomSpeed={0.6}
                    autoRotate={false}
                />

                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <shadowMaterial opacity={0.3} />
                </mesh>
            </Canvas>

            {/* Progress overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-semibold">Neural Activity</span>
                    <span className="text-orange-400 text-sm font-bold">
                        {Math.round(normalizedProgress * 100)}%
                    </span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500"
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

            {/* Controls */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-3 text-white text-xs space-y-1 border border-white/10">
                <p className="font-semibold mb-1">Controls:</p>
                <p>🖱️ Drag: Rotate</p>
                <p>🔍 Scroll: Zoom</p>
            </div>

            {/* Region indicator with detailed info */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/10 max-w-xs">
                <p className="text-gray-400 text-xs font-semibold mb-1">TESTING:</p>
                <p className="text-orange-400 text-base font-bold mb-2">
                    {BRAIN_REGIONS[currentQuestion % 5].function}
                </p>
                <p className="text-white text-xs font-semibold mb-1">Brain Region:</p>
                <p className="text-blue-300 text-sm mb-2">
                    {BRAIN_REGIONS[currentQuestion % 5].name}
                </p>
                <p className="text-gray-300 text-xs leading-relaxed">
                    {BRAIN_REGIONS[currentQuestion % 5].description}
                </p>
            </div>
        </div>
    );
}

// Preload the model
useGLTF.preload('/models/brain.glb/scene.gltf');
