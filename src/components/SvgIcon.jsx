import React from "react";

const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
};

export default function SvgIcon({ icon: Icon, size = "medium", to = '', ...props }) {
    const iconSize = sizeMap[size] || sizeMap.medium;

    if (to) {
        return (
            <a href={to} className="pseudo-a">
                <Icon
                    width={iconSize}
                    height={iconSize}
                    {...props}
                />
            </a>
        )
    }

    return (
        <Icon
            width={iconSize}
            height={iconSize}
            {...props}
        />
    );
}
