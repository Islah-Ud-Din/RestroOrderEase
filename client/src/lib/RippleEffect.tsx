import React, { useRef, ReactElement, MouseEvent } from 'react';

interface RippleEffectProps {
    children: ReactElement;
    className?: string;
    rippleColor?: string;
}

const RippleEffect: React.FC<RippleEffectProps> = ({ children, className = '', rippleColor, ...rest }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = containerRef.current;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.className = 'ripple-effect';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        if (rippleColor) ripple.style.background = rippleColor;
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        // If the child has its own onClick, call it
        const childWithProps = children as ReactElement<{ onClick?: (e: MouseEvent<HTMLDivElement>) => void }>;
        if (childWithProps.props && typeof childWithProps.props.onClick === 'function') {
            childWithProps.props.onClick(e);
        }
    };

    const isLink = typeof children.type === 'string' && (children.type === 'a' || children.type === 'button');

    return (
        <div
            ref={containerRef}
            className={`ripple-container ${className}`}
            style={{ display: 'inline-block', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            onClick={handleClick}
            tabIndex={isLink ? undefined : 0}
            role={isLink ? undefined : 'button'}
            {...rest}
        >
            {children}
        </div>
    );
};

export default RippleEffect;
