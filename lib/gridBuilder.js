const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALL_DIRS = [[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
const EASY_DIRS = [[0,1],[1,0],[1,1],[1,-1]];

export function buildGrid(words, size, difficulty) {
  const g = Array.from({ length: size }, () => Array(size).fill(''));
  const placed = [];
  const dirs = difficulty < 2 ? EASY_DIRS : ALL_DIRS;
  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const word of sorted) {
    let didPlace = false;
    for (let attempt = 0; attempt < 500; attempt++) {
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      const [dr, dc] = dir;
      const maxR = dr === 0 ? size : (dr > 0 ? size - word.length : word.length - 1);
      const minR = dr < 0 ? word.length - 1 : 0;
      const maxC = dc === 0 ? size : (dc > 0 ? size - word.length : word.length - 1);
      const minC = dc < 0 ? word.length - 1 : 0;
      if (maxR <= minR || maxC <= minC) continue;
      const r = minR + Math.floor(Math.random() * (maxR - minR));
      const c = minC + Math.floor(Math.random() * (maxC - minC));
      let fit = true;
      const cells = [];
      for (let i = 0; i < word.length; i++) {
        const nr = r + i * dr, nc = c + i * dc;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) { fit = false; break; }
        if (g[nr][nc] !== '' && g[nr][nc] !== word[i]) { fit = false; break; }
        cells.push([nr, nc]);
      }
      if (fit) {
        for (let i = 0; i < word.length; i++) g[cells[i][0]][cells[i][1]] = word[i];
        placed.push({ word, cells });
        didPlace = true;
        break;
      }
    }
    if (!didPlace) {
      // Try again with bigger grid slice if word doesn't fit
      placed.push({ word, cells: [] });
    }
  }

  // Fill empty cells
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!g[r][c]) g[r][c] = ALPHA[Math.floor(Math.random() * 26)];

  return { grid: g, placed: placed.filter(p => p.cells.length > 0) };
}

export function getCellsInLine(r1, c1, r2, c2) {
  const dr = r2 - r1, dc = c2 - c1;
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [[r1, c1]];
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc)) return [[r1, c1]];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([r1 + i * sr, c1 + i * sc]);
  return cells;
}
