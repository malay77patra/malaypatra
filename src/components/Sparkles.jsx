import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useRandomInterval } from '../hooks/useRandomInterval';
import { random, range } from '../utils/utils';

const sparkleColors = [
    "#FFDD00", // Gold
    "#FF69B4", // Hot Pink
    "#00FFFF", // Cyan
    "#FFD700", // Yellow Gold
    "#FF1493", // Deep Pink
    "#8A2BE2", // Blue Violet
    "#ADFF2F", // Green Yellow
    "#FF4500", // Orange Red
    "#00FA9A", // Medium Spring Green
    "#800080"  // Purple
];


const generateSparkle = (color) => {
    return {
        id: uuidv4(),
        createdAt: Date.now(),
        color,
        size: random(10, 20),
        style: {
            top: random(0, 100) + '%',
            left: random(0, 100) + '%',
            zIndex: 2,
        },
    };
};

const Sparkles = ({ color = null, scale = 1, children, ...delegated }) => {

    color = color || sparkleColors[random(0, sparkleColors.length - 1)];

    const [sparkles, setSparkles] = React.useState(() => {
        return range(3).map(() => generateSparkle(color));
    });

    const prefersReducedMotion = usePrefersReducedMotion();

    useRandomInterval(
        () => {
            const sparkle = generateSparkle(color);
            const now = Date.now();

            const nextSparkles = sparkles.filter(sp => {
                const delta = now - sp.createdAt;
                return delta < 750;
            });

            nextSparkles.push(sparkle);

            setSparkles(nextSparkles);
        },
        prefersReducedMotion ? null : 50,
        prefersReducedMotion ? null : 450
    );

    return (
        <span className="sp-wrapper" {...delegated}>
            {sparkles.map(sparkle => (
                <Sparkle
                    key={sparkle.id}
                    color={sparkle.color}
                    size={sparkle.size * scale}
                    style={sparkle.style}
                />
            ))}
            <strong className="sp-child-wrapper">{children}</strong>
        </span>
    );
};

const Sparkle = ({ size, color, style }) => {
    const path =
        'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

    return (
        <span className="sp-sparkle-wrapper" style={style}>
            <svg
                className="sparkle-svg"
                style={{
                    width: size,
                    height: size,
                }}
                viewBox="0 0 68 68"
                fill="none"
            >
                <path d={path} fill={color} />
            </svg>
        </span>
    );
};

export default Sparkles;
