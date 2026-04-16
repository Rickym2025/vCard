'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const SEPARATION = 100;
        const AMOUNTX = 60;
        const AMOUNTY = 60;

        // 1. Setup Scena
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x020205, 1000, 2500); // Colore nebbia uguale al tuo sfondo

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );
        camera.position.set(0, 400, 1200);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x020205, 1); // Sfondo nero assoluto

        containerRef.current.appendChild(renderer.domElement);

        // 2. Creazione Particelle
        const positions: number[] = [];
        const colors: number[] = [];

        const geometry = new THREE.BufferGeometry();

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                const y = 0; // Verrà animata dopo
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                positions.push(x, y, z);

                // Colorazione alternata (Ciano e Viola) per un effetto Cyber
                if (Math.random() > 0.5) {
                    colors.push(0.0, 0.95, 1.0); // Ciano (#00f2ff)
                } else {
                    colors.push(0.44, 0.0, 1.0); // Viola (#7000ff)
                }
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 4, // Puntini piccoli ed eleganti
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Variabili locali per evitare bug in React Strict Mode
        let count = 0;
        let animationId: number;

        // 3. Funzione di Animazione
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const positionAttribute = geometry.attributes.position;
            const posArray = positionAttribute.array as Float32Array;

            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const index = i * 3;

                    // Matematica dell'Onda (Seni sommati)
                    posArray[index + 1] =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50;

                    i++;
                }
            }

            positionAttribute.needsUpdate = true;

            // Leggera rotazione automatica per renderlo più tridimensionale
            points.rotation.y = Math.sin(count * 0.05) * 0.1;

            renderer.render(scene, camera);
            count += 0.05; // Velocità dell'onda
        };

        // 4. Gestione Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Avvio!
        animate();

        // 5. Cleanup Infallibile
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId); // Blocca ESATTAMENTE questa animazione

            geometry.dispose();
            material.dispose();
            renderer.dispose();

            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn('pointer-events-none fixed inset-0 z-[-1] overflow-hidden', className)}
            {...props}
        />
    );
}