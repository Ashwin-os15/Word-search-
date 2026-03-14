import { useRef, useCallback, useEffect, useState } from 'react';
import styles from './WordGrid.module.css';

export default function WordGrid({ grid, levelData, colorMap, hintCell, wrongFlash, onStart, onMove, onEnd }) {
  const containerRef = useRef(null);
  const [cellSize, setCellSize] = useState(42);
  const isDragging = useRef(false);

  useEffect(() => {
    function resize() {
      if (!levelData) return;
      const padding = 48;
      const maxW = Math.min(window.innerWidth - padding, 420 - padding);
      const size = Math.floor((maxW - 24) / levelData.size);
      setCellSize(Math.max(28, Math.min(46, size)));
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [levelData]);

  const getCellFromPoint = useCallback((clientX, clientY) => {
    const elements = document.elementsFromPoint(clientX, clientY);
    for (const el of elements) {
      if (el.dataset.r !== undefined && el.dataset.c !== undefined) {
        return [parseInt(el.dataset.r), parseInt(el.dataset.c)];
      }
    }
    return null;
  }, []);

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) onStart(cell[0], cell[1]);
    containerRef.current?.setPointerCapture(e.pointerId);
  }, [getCellFromPoint, onStart]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) onMove(cell[0], cell[1]);
  }, [getCellFromPoint, onMove]);

  const handlePointerUp = useCallback((e) => {
    isDragging.current = false;
    onEnd();
  }, [onEnd]);

  if (!grid.length || !levelData) return null;

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${wrongFlash ? styles.wrongFlash : ''}`}
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${levelData.size}, ${cellSize}px)` }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const key = `${r},${c}`;
            const highlight = colorMap[key];
            const isHint = hintCell === key;
            return (
              <div
                key={key}
                data-r={r}
                data-c={c}
                className={`${styles.cell} ${highlight ? styles[highlight] : ''} ${isHint ? styles.hint : ''}`}
                style={{ width: cellSize, height: cellSize, fontSize: Math.max(12, cellSize * 0.42) }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
