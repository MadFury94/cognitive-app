'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
    const ref = useRef<THREE.Points>(null);

    // Generate particles in a brain-like shape
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(2000 * 3);

        for (let i = 0; i < 2000; i++) {
            // Create a sphere-like distribution with some randomness
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 1.5 + Math.random() * 0.5;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }

        return positions;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    return (
        <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff6b35"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

function ConnectionLines() {
    const ref = useRef<THREE.LineSegments>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const color1 = new THREE.Color('#ff6b35');
        const color2 = new THREE.Color('#ffa500');

        // Create random connections
        for (let i = 0; i < 50; i++) {
            const theta1 = Math.random() * Math.PI * 2;
            const phi1 = Math.acos(2 * Math.random() - 1);
            const radius1 = 1.5 + Math.random() * 0.5;

            const theta2 = Math.random() * Math.PI * 2;
            const phi2 = Math.acos(2 * Math.random() - 1);
            const radius2 = 1.5 + Math.random() * 0.5;

            positions.push(
                radius1 * Math.sin(phi1) * Math.cos(theta1),
                radius1 * Math.sin(phi1) * Math.sin(theta1),
                radius1 * Math.cos(phi1),
                radius2 * Math.sin(phi2) * Math.cos(theta2),
                radius2 * Math.sin(phi2) * Math.sin(theta2),
                radius2 * Math.cos(phi2)
            );

            colors.push(color1.r, color1.g, color1.b);
            colors.push(color2.r, color2.g, color2.b);
        }

        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

        return geo;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <lineSegments ref={ref} geometry={geometry}>
            <lineBasicMaterial vertexColors transparent opacity={0.3} />
        </lineSegments>
    );
}

export default function BrainParticles() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <ParticleField />
                <ConnectionLines />
            </Canvas>
        </div>
    );
}
