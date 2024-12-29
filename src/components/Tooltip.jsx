import { useState, useEffect, useRef } from "react"

export default function Tooltip() {
    const [content, setContent] = useState('');
    const [posData, setPosData] = useState({ top: 0, left: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const tooltipTimeoutID = useRef(null);
    const tooltipEle = useRef(null);

    const calculatePos = (tooltipBound, targetBound, screenBound, margin = 16, pos = "auto") => {
        const setToTop = () => {
            const left = targetBound.x + (targetBound.width / 2) - (tooltipBound.width / 2);
            const top = targetBound.y - tooltipBound.height - margin;
            return { left: left, top: top, v: 'top' };
        }

        const setToBottom = () => {
            const left = targetBound.x + (targetBound.width / 2) - (tooltipBound.width / 2);
            const top = targetBound.y + targetBound.height + margin;
            return { left: left, top: top, v: 'bottom' };
        }

        const setToLeft = () => {
            const left = targetBound.x - tooltipBound.width - margin;
            const top = targetBound.y + (targetBound.height / 2) - (tooltipBound.height / 2);
            return { left: left, top: top, v: 'left' };
        }

        const setToRight = () => {
            const left = targetBound.x + targetBound.width + margin;
            const top = targetBound.y + (targetBound.height / 2) - (tooltipBound.height / 2);
            return { left: left, top: top, v: 'right' };
        }

        const adjustToScreen = (pos) => {
            const v = pos.v;
            if (v === 'top') {
                pos.top = Math.max(pos.top, screenBound.y);
            } else if (v === 'bottom') {
                pos.top = Math.min(pos.top, screenBound.height - tooltipBound.height);
            } else if (v === 'left') {
                pos.left = Math.max(pos.left, screenBound.x);
            } else if (v === 'right') {
                pos.left = Math.min(pos.left, screenBound.width - tooltipBound.width);
            }
            return pos;
        }

        const positionFunctions = {
            top: setToTop,
            bottom: setToBottom,
            left: setToLeft,
            right: setToRight
        };

        if (positionFunctions[pos]) {
            return adjustToScreen(positionFunctions[pos]());
        }

        // Try all positions and use the first one that fits
        const positions = [setToTop, setToBottom, setToLeft, setToRight];
        for (const positionFn of positions) {
            const result = positionFn();
            const adjusted = adjustToScreen(result);
            if (
                adjusted.top >= screenBound.y &&
                adjusted.top + tooltipBound.height <= screenBound.height &&
                adjusted.left >= screenBound.x &&
                adjusted.left + tooltipBound.width <= screenBound.width
            ) {
                return adjusted;
            }
        }

        // If no position fits perfectly, fall back to adjusted top position
        return adjustToScreen(setToTop());
    }

    const showToolTip = (ele, content) => {
        setContent(content);
        tooltipEle.current.style.visibility = 'hidden';
        tooltipEle.current.style.opacity = '0';

        requestAnimationFrame(() => {
            const targetBound = ele.getBoundingClientRect();
            const tooltipBound = tooltipEle.current.getBoundingClientRect();
            const screenBound = {
                x: 0,
                y: 0,
                height: window.innerHeight,
                width: window.innerWidth
            };

            const newPosition = calculatePos(tooltipBound, targetBound, screenBound);
            setPosData(newPosition);

            requestAnimationFrame(() => {
                tooltipEle.current.style.visibility = 'visible';
                tooltipEle.current.style.opacity = '1';
                setIsVisible(true);
            });
        });
    }

    const hideToolTip = () => {
        tooltipEle.current.style.opacity = '0';
        setIsVisible(false);
    }

    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-tooltip-content]');

        const handleMouseEnter = (e) => {
            const ele = e.target;
            const content = ele.getAttribute('data-tooltip-content').trim();
            if (!content) return;

            const delay = parseInt(ele.getAttribute('data-tooltip-delay'), 10) || 1000;
            tooltipTimeoutID.current = setTimeout(() => {
                showToolTip(ele, content);
            }, delay);
        };

        const handleMouseLeave = () => {
            if (tooltipTimeoutID.current) {
                clearTimeout(tooltipTimeoutID.current);
            }
            hideToolTip();
        };

        tooltipElements.forEach((ele) => {
            ele.addEventListener('mouseenter', handleMouseEnter);
            ele.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup
        return () => {
            tooltipElements.forEach((ele) => {
                ele.removeEventListener('mouseenter', handleMouseEnter);
                ele.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <span
            className="tooltip"
            style={{
                opacity: isVisible ? 1 : 0,
                visibility: isVisible ? 'visible' : 'hidden',
                position: 'fixed',
                top: posData.top,
                left: posData.left,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
                zIndex: 1000
            }}
            ref={tooltipEle}
        >
            {content}
        </span>
    );
}