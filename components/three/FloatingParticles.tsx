'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
    const ref = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(1000 * 3);

        for (let i = 0; i < 1000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        return positions;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff8c42"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

export default function FloatingParticles() {
    return (
        <div className="absolute inset-0 -z-10 opacity-30">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
