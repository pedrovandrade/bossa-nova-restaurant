'use client';

import { ReactNode, useState, useRef, useEffect, type FC } from 'react';
import ScrollButton from './ScrollButton';

type CarrouselProps = {
  items: ReactNode[],
  containerClass?: string,
};

const Carrousel: FC<CarrouselProps> = ({ items, containerClass }) => {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // refs to keep window listeners so we can remove them later
  const windowMouseMoveRef = useRef<((e: MouseEvent) => void) | undefined>(undefined);
  const windowMouseUpRef = useRef<((e: MouseEvent) => void) | undefined>(undefined);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setDragOffset(0);
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setDragOffset(0);
  };

  const removeWindowListeners = () => {
    if (windowMouseMoveRef.current) {
      window.removeEventListener('mousemove', windowMouseMoveRef.current);
      windowMouseMoveRef.current = undefined;
    }
    if (windowMouseUpRef.current) {
      window.removeEventListener('mouseup', windowMouseUpRef.current);
      windowMouseUpRef.current = undefined;
    }
  };

  // Handle drag start
  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    setDragging(true);
    setDragOffset(0);

    // attach window listeners so we keep receiving move/up even outside the component
    windowMouseMoveRef.current = (ev: MouseEvent) => {
      // only proceed if dragging is active
      if (dragStartX.current === null) return;
      handleDragMove(ev.clientX);
    };

    windowMouseUpRef.current = (ev: MouseEvent) => {
      removeWindowListeners();
      handleDragEnd(ev.clientX);
    };

    window.addEventListener('mousemove', windowMouseMoveRef.current);
    window.addEventListener('mouseup', windowMouseUpRef.current);
  };

  // Handle drag move
  const handleDragMove = (clientX: number) => {
    if (!dragging || dragStartX.current === null) return;
    setDragOffset(clientX - dragStartX.current);
  };

  // Handle drag end
  const handleDragEnd = (clientX: number) => {
    if (!dragging || dragStartX.current === null) {
      removeWindowListeners();
      dragStartX.current = null;
      setDragOffset(0);
      setDragging(false);
      return;
    }

    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setDragging(false);
    setDragOffset(0);
    dragStartX.current = null;
    removeWindowListeners();
  };

  // Mouse events (only start drag on left button)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left button
    // prevent text selection while dragging
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    // only treat left-button up as drag end
    if (e.button !== 0) return;
    handleDragEnd(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) handleDragMove(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => handleDragEnd(e.changedTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragging) handleDragMove(e.touches[0].clientX);
  };

  // If component unmounts while listeners still attached, remove them
  useEffect(() => {
    return () => {
      removeWindowListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative'>
      {/* Forward and backward buttons */}
      <ScrollButton direction='previous' onClick={handlePrev} />
      <ScrollButton direction='next' onClick={handleNext} />

      <div
        className={`overflow-hidden shadow-2xl ${containerClass ?? ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={(e) => {
          // treat leaving the carousel as a mouseup (end drag)
          if (dragging) handleDragEnd((e as React.MouseEvent).clientX);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
        <div
          className='flex h-full transition-transform duration-500 ease-in-out'
          style={{
            transform: `translateX(calc(-${current * (100 / items.length)}% + ${dragOffset}px))`,
            width: `${items.length * 100}%`,
            transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {[...items]}
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${index === current ? 'bg-bossanova-orange' : 'bg-bossanova-cyan/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrousel;