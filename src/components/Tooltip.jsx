import { useState, useEffect } from "react";

export default function TooltipManager() {
    const [tooltips, setTooltips] = useState({});

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

        return adjustToScreen(setToTop());
    }

    const createTooltip = (element) => {
        const content = element.getAttribute('data-tooltip-content').trim();
        if (!content) return;

        // Create a unique ID for this tooltip instance
        const tooltipId = `tooltip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create and append temporary tooltip element to get its dimensions
        const tempTooltip = document.createElement('span');
        tempTooltip.className = 'tooltip';
        tempTooltip.style.visibility = 'hidden';
        tempTooltip.textContent = content;
        document.body.appendChild(tempTooltip);

        const targetBound = element.getBoundingClientRect();
        const tooltipBound = tempTooltip.getBoundingClientRect();
        const screenBound = {
            x: 0,
            y: 0,
            height: window.innerHeight,
            width: window.innerWidth
        };

        const position = calculatePos(tooltipBound, targetBound, screenBound);

        // Remove temporary tooltip
        document.body.removeChild(tempTooltip);

        // Add new tooltip to state
        setTooltips(prev => ({
            ...prev,
            [tooltipId]: {
                content,
                position,
                id: tooltipId
            }
        }));

        return tooltipId;
    }

    const removeTooltip = (tooltipId) => {
        setTooltips(prev => {
            const newTooltips = { ...prev };
            delete newTooltips[tooltipId];
            return newTooltips;
        });
    }

    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-tooltip-content]');
        const activeTooltips = new Map();

        const handleMouseEnter = (e) => {
            const element = e.target;
            const content = element.getAttribute('data-tooltip-content').trim();
            if (!content) return;

            const delay = parseInt(element.getAttribute('data-tooltip-delay'), 10) || 1000;
            const timeoutId = setTimeout(() => {
                const tooltipId = createTooltip(element);
                if (tooltipId) {
                    activeTooltips.set(element, tooltipId);
                }
            }, delay);

            // Store timeout ID for cleanup
            element.dataset.tooltipTimeout = timeoutId;
        };

        const handleMouseLeave = (e) => {
            const element = e.target;

            // Clear timeout if tooltip hasn't appeared yet
            const timeoutId = element.dataset.tooltipTimeout;
            if (timeoutId) {
                clearTimeout(Number(timeoutId));
                delete element.dataset.tooltipTimeout;
            }

            // Remove tooltip if it exists
            const tooltipId = activeTooltips.get(element);
            if (tooltipId) {
                removeTooltip(tooltipId);
                activeTooltips.delete(element);
            }
        };

        tooltipElements.forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            tooltipElements.forEach((element) => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);

                // Clear any remaining timeouts
                const timeoutId = element.dataset.tooltipTimeout;
                if (timeoutId) {
                    clearTimeout(Number(timeoutId));
                }
            });
        };
    }, []);

    return (
        <>
            {Object.values(tooltips).map(tooltip => (
                <span
                    key={tooltip.id}
                    className="tooltip"
                    style={{
                        top: tooltip.position.top,
                        left: tooltip.position.left,
                        opacity: 1,
                        visibility: 'visible',
                    }}
                >
                    {tooltip.content}
                </span>
            ))}
        </>
    );
}