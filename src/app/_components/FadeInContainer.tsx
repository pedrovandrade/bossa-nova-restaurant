'use client';

import { useRef, useEffect, useState } from 'react';

type FadeInContainerProps = {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  displacement?: number;
};

const FadeInContainer = ({
  children,
  direction = 'left',
  duration = 1.5,
  displacement = 60,
}: FadeInContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const directionMap = {
  left: `translateX(-${displacement}px)`,
  right: `translateX(${displacement}px)`,
  top: `translateY(-${displacement}px)`,
  bottom: `translateY(${displacement}px)`,
};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0.05,
        transform: visible ? 'none' : directionMap[direction],
        transition: `opacity ${duration}s ease, transform ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInContainer;