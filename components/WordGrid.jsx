import { useRef, useCallback, useEffect, useState } from 'react';
import styles from './WordGrid.module.css';

const GAP = 2;

export default function WordGrid({ grid, levelData, colorMap, hintCell, wrongFlash, selectingCells, onStart, onMove, onEnd }) {
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

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    onEnd();
  }, [onEnd]);

  // Compute SVG overlay line from selectingCells
  const selectionLine = (() => {
    if (!selectingCells || selectingCells.length < 2) return null;
    const step = cellSize + GAP;
    const pad = 12;
    const first = selectingCells[0];
    const last = selectingCells[selectingCells.length - 1];
    const half = cellSize / 2;
    const x1 = pad + first[1] * step + half;
    const y1 = pad + first[0] * step + half;
    const x2 = pad + last[1] * step + half;
    const y2 = pad + last[0] * step + half;
    return { x1, y1, x2, y2 };
  })();

  if (!grid.length || !levelData) return null;

  const step = cellSize + GAP;
  const gridPx = levelData.size * step - GAP + 24;

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${wrongFlash ? styles.wrongFlash : ''}`}
      style={{ touchAction: 'none', position: 'relative' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Letter grid */}
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${levelData.size}, ${cellSize}px)` }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const key = `${r},${c}`;
            const highlight = colorMap[key];
            const isHint = hintCell === key;
            const isSelecting = selectingCells?.some(([sr, sc]) => sr === r && sc === c);
            return (
              <div
                key={key}
                data-r={r}
                data-c={c}
                className={`${styles.cell} ${highlight ? styles[highlight] : ''} ${isHint ? styles.hint : ''} ${isSelecting && !highlight ? styles.selecting : ''}`}
                style={{ width: cellSize, height: cellSize, fontSize: Math.max(12, cellSize * 0.42) }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      {/* SVG overlay — draws the selection line on top */}
      {selectionLine && (
        <svg
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: gridPx, height: gridPx,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Outer glow */}
          <line
            x1={selectionLine.x1} y1={selectionLine.y1}
            x2={selectionLine.x2} y2={selectionLine.y2}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={cellSize * 0.9}
            strokeLinecap="round"
          />
          {/* Main pill */}
          <line
            x1={selectionLine.x1} y1={selectionLine.y1}
            x2={selectionLine.x2} y2={selectionLine.y2}
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={cellSize * 0.75}
            strokeLinecap="round"
          />
          {/* Bright center line */}
          <line
            x1={selectionLine.x1} y1={selectionLine.y1}
            x2={selectionLine.x2} y2={selectionLine.y2}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth={cellSize * 0.15}
            strokeLinecap="round"
          />
          {/* Start circle */}
          <circle cx={selectionLine.x1} cy={selectionLine.y1} r={cellSize * 0.32} fill="rgba(255,255,255,0.6)" />
          {/* End circle */}
          <circle cx={selectionLine.x2} cy={selectionLine.y2} r={cellSize * 0.32} fill="rgba(255,255,255,0.6)" />
        </svg>
      )}
    </div>
  );
}
