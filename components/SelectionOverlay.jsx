import styles from './SelectionOverlay.module.css';

export default function SelectionOverlay({ selectingCells, grid, cellSize, gridSize }) {
  if (!selectingCells || selectingCells.length < 2) return null;

  return (
    <div className={styles.overlay}>
      {selectingCells.map(([r, c]) => (
        <div
          key={`sel-${r}-${c}`}
          className={styles.selCell}
          style={{
            top: r * (cellSize + 2) + 12,
            left: c * (cellSize + 2) + 12,
            width: cellSize,
            height: cellSize,
          }}
        />
      ))}
    </div>
  );
}
