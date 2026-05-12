'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface BrainProps {
    progress: number;
}

function Brain({ progress }: BrainProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    // Color changes based on progress
    const color = progress > 0.7 ? '#10b981' : progress > 0.4 ? '#f59e0b' : '#ff6b35';

    return (
        <Sphere
            ref={meshRef}
            args={[1, 64, 64]}
            scale={hovered ? 1.1 : 1}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.3 + progress * 0.2}
                speed={2}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
}

interface InteractiveBrainProps {
    progress?: number;
    isActive?: boolean;
}

export default function InteractiveBrain({ progress = 0, isActive = false }: InteractiveBrainProps) {
    // Normalize progress to 0-1 range
    const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b35" />
                <Brain progress={normalizedProgress} />
            </Canvas>
        </div>
    );
}
