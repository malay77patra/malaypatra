import { useState, useEffect, useRef } from "react"

export default function Tooltip() {
    const [content, setContent] = useState('');
    const [posData, setPosData] = useState({ top: 100, left: 0 });
    let tooltipTimeoutID;
    const tooltipEle = useRef(null);

    const calculatePos = (tooltipBound, targetBound, screenBound, margin = 12, pos = "auto") => {
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

            if (v == 'top') {
                pos.top = Math.max(pos.top, screenBound.y - tooltipBound.height);
            } else if (v == 'bottom') {
                pos.top = Math.min(pos.top, screenBound.height - tooltipBound.height);
            } else if (v == 'left') {
                pos.left = Math.max(pos.left, screenBound.x);
            } else if (v == 'right') {
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
        } else {
            const ifSetTop = setToTop();
            if (ifSetTop.top >= screenBound.y) {
                console.log("top");
                return ifSetTop
            };

            const ifSetBottom = setToBottom();
            if (ifSetBottom.top < screenBound.height - tooltipBound.height) {
                console.log("bottom")
                return ifSetBottom;
            }

            const ifSetLeft = setToLeft();
            if (ifSetLeft.left >= screenBound.x) {
                console.log("left")
                return ifSetLeft;
            }

            const ifSetRight = setToRight();
            if (ifSetRight.left < screenBound.width - tooltipBound.width) {
                console.log("right")
                return ifSetRight;
            }

            return adjustToScreen(setToTop());
        }

    }

    const showToolTip = (ele, content) => {
        const targetBound = ele.getBoundingClientRect();
        const tooltipBound = tooltipEle.current.getBoundingClientRect();
        const screenBound = { x: 0, y: 0, height: window.innerHeight, width: window.innerWidth };
        setPosData(calculatePos(tooltipBound, targetBound, screenBound));
        setContent(content);
        tooltipEle.current.style.opacity = 1;
    }

    const hideToolTip = () => {
        tooltipEle.current.style.opacity = 0;
    }

    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-tooltip-content]');

        tooltipElements.forEach((ele) => {
            const content = ele.getAttribute('data-tooltip-content').trim();
            if (!content) return;
            const delay = parseInt(ele.getAttribute('data-tooltip-delay'), 10) || 500;
            const position = ele.getAttribute('data-tooltip-position') || 'auto';

            ele.addEventListener('mouseenter', (e) => {
                tooltipTimeoutID = setTimeout(() => {
                    showToolTip(e.target, content);
                }, delay);
            });

            ele.addEventListener('mouseleave', (e) => {
                if (tooltipTimeoutID) {
                    console.log("caught: ", tooltipTimeoutID);
                    clearTimeout(tooltipTimeoutID);
                }
                hideToolTip();
            });
        });
    }, []);

    return (
        <>
            <span className="tooltip" style={{ opacity: 0, top: posData.top, left: posData.left }} ref={tooltipEle}>
                {content}
            </span>
        </>
    )
}