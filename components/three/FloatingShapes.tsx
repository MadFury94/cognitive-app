'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Shape({ position, color, geometry }: { position: [number, number, number], color: string, geometry: 'box' | 'sphere' | 'octahedron' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {geometry === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
                {geometry === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
                {geometry === 'octahedron' && <octahedronGeometry args={[0.6]} />}
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.7}
                    roughness={0.3}
                    metalness={0.5}
                />
            </mesh>
        </Float>
    );
}

export default function FloatingShapes() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                {/* Multiple floating shapes */}
                <Shape position={[-2, 1, 0]} color="#ff6b35" geometry="box" />
                <Shape position={[2, -1, -1]} color="#ffa500" geometry="sphere" />
                <Shape position={[0, 2, -2]} color="#4ade80" geometry="octahedron" />
                <Shape position={[-1.5, -1.5, 1]} color="#60a5fa" geometry="box" />
                <Shape position={[1.5, 0.5, -1.5]} color="#f472b6" geometry="sphere" />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4a90e2" />
            </Canvas>
        </div>
    );
}
