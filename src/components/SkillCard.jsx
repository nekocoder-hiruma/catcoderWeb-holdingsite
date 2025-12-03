import React, { useRef, useState } from 'react';
import usePublicAsset from '../hooks/usePublicAsset';

const SkillCard = ({ name, icon: Icon }) => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const logoSrc = usePublicAsset('/assets/skills/', name, ['svg', 'png', 'jpg', 'jpeg', 'webp']);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center p-6 rounded-xl overflow-hidden bg-navy-800 hover:bg-navy-950 transition-colors duration-300 group border border-navy-700 h-32"
        >
            {/* Lightsaber Clash Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
                }}
            />

            {/* The Clash Center (Bright Spark) */}
            <div
                className="pointer-events-none absolute opacity-0 transition-opacity duration-300 z-10"
                style={{
                    opacity,
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,133,27,0.5) 20%, rgba(240,18,190,0.5) 40%, transparent 70%)',
                    filter: 'blur(5px)',
                    mixBlendMode: 'screen'
                }}
            />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center gap-3">
                {logoSrc ? (
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <img
                            src={logoSrc}
                            alt={name}
                            className="w-full h-full object-contain"
                            width="64"
                            height="64"
                        />
                    </div>
                ) : Icon ? (
                    <Icon size={40} className="text-white group-hover:scale-110 transition-transform duration-300" />
                ) : (
                    <div className="px-4 py-2 border-2 border-white rounded-lg text-white font-bold text-lg tracking-wide group-hover:scale-105 transition-transform duration-300 bg-navy-900/50 backdrop-blur-sm cursor-default">
                        {name}
                    </div>
                )}
                {/* Show name below logo if logo exists, or if Icon exists. If text-only mode, name is already inside the box */}
                {(logoSrc || Icon) && <span className="text-gray-300 font-semibold cursor-default">{name}</span>}
            </div>
        </div>
    );
};

export default SkillCard;
