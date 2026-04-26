'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
    const ref = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(800 * 3);

        for (let i = 0; i < 800; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }

        return positions;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
            ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
        }
    });

    return (
        <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff8c42"
                size={0.04}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.5}
            />
        </Points>
    );
}

export default function ParticleBackground() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
