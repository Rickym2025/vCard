'use client';
import { motion } from 'framer-motion';

export function HandWrittenTitle({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="text-center py-10">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
            </style>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white italic"
                style={{ fontFamily: "'Dancing Script', cursive" }}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <p className="text-cyan-500 tracking-[0.3em] uppercase text-[10px] font-bold mt-4 opacity-70">
                    {subtitle}
                </p>
            )}
        </div>
    );
}