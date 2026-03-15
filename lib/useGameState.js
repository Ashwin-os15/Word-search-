import { useState, useEffect, useCallback, useRef } from 'react';
import { buildGrid, getCellsInLine } from '../lib/gridBuilder';
import { getLevelData, getDifficulty } from '../lib/gameData';

const TOTAL_LEVELS = 769;

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [coins, setCoins] = useState(0);
  const [grid, setGrid] = useState([]);
  const [placedWords, setPlacedWords] = useState([]);
  const [foundWords, setFoundWords] = useState(new Set());
  const [levelData, setLevelData] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [colorIdx, setColorIdx] = useState(0);
  const [selectingCells, setSelectingCells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selStart, setSelStart] = useState(null);
  const [showWin, setShowWin] = useState(false);
  const [winBonus, setWinBonus] = useState(0);
  const [hintCell, setHintCell] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLevel = parseInt(localStorage.getItem('wsg_level') || '0');
    const savedCoins = parseInt(localStorage.getItem('wsg_coins') || '0');
    setCurrentLevel(savedLevel);
    setCoins(savedCoins);
    setInitialized(true);
  }, []);

  // Init level whenever currentLevel changes (after initialization)
  useEffect(() => {
    if (!initialized) return;
    initLevel(currentLevel);
  }, [currentLevel, initialized]);

  const initLevel = useCallback((lvl) => {
    const data = getLevelData(lvl);
    const diff = getDifficulty(lvl);
    const words = data.words.map(w => w.toUpperCase());
    let size = Math.max(data.size || 8, Math.max(...words.map(w => w.length)) + 2);
    size = Math.min(size, 16);
    const { grid: g, placed } = buildGrid(words, size, diff);
    setLevelData({ ...data, words, size });
    setGrid(g);
    setPlacedWords(placed);
    setFoundWords(new Set());
    setColorMap({});
    setColorIdx(0);
    setSelectingCells([]);
    setIsSelecting(false);
    setSelStart(null);
    setShowWin(false);
    setHintCell(null);
  }, []);

  const startSelect = useCallback((r, c) => {
    setIsSelecting(true);
    setSelStart([r, c]);
    setSelectingCells([[r, c]]);
  }, []);

  const moveSelect = useCallback((r, c) => {
    if (!isSelecting || !selStart) return;
    const cells = getCellsInLine(selStart[0], selStart[1], r, c);
    setSelectingCells(cells);
  }, [isSelecting, selStart]);

  const endSelect = useCallback(() => {
    if (!isSelecting || selectingCells.length < 2) {
      setIsSelecting(false);
      setSelectingCells([]);
      setSelStart(null);
      return;
    }
    const word = selectingCells.map(([r, c]) => grid[r]?.[c] || '').join('');
    const wordRev = word.split('').reverse().join('');
    const match = placedWords.find(pw =>
      !foundWords.has(pw.word) && (pw.word === word || pw.word === wordRev)
    );
    if (match) {
      const COLORS = ['h0','h1','h2','h3','h4','h5','h6','h7'];
      const color = COLORS[colorIdx % COLORS.length];
      const newColorMap = { ...colorMap };
      selectingCells.forEach(([r, c]) => { newColorMap[`${r},${c}`] = color; });
      setColorMap(newColorMap);
      setColorIdx(ci => ci + 1);
      const newFound = new Set(foundWords);
      newFound.add(match.word);
      setFoundWords(newFound);
      if (newFound.size === placedWords.length) {
        const data = getLevelData(currentLevel);
        const bonus = Math.max(50, (currentLevel + 1) * 10)
          + (data.type === 'friends' ? 100 : 0)
          + (data.type === 'hard' ? 75 : 0);
        setWinBonus(bonus);
        const newCoins = coins + bonus;
        setCoins(newCoins);
        localStorage.setItem('wsg_coins', String(newCoins));
        setTimeout(() => setShowWin(true), 500);
      }
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 300);
    }
    setIsSelecting(false);
    setSelectingCells([]);
    setSelStart(null);
  }, [isSelecting, selectingCells, grid, placedWords, foundWords, colorMap, colorIdx, coins, currentLevel]);

  const goNextLevel = useCallback(() => {
    // 🎉 If this was the last level, show the epic final screen
    if (currentLevel >= TOTAL_LEVELS - 1) {
      setShowWin(false);
      setShowFinalScreen(true);
      return;
    }
    const next = currentLevel + 1;
    localStorage.setItem('wsg_level', String(next));
    setCurrentLevel(next);
  }, [currentLevel]);

  const resetGame = useCallback(() => {
    localStorage.setItem('wsg_level', '0');
    localStorage.setItem('wsg_coins', '0');
    setShowFinalScreen(false);
    setCoins(0);
    setCurrentLevel(0);
  }, []);

  const goPrevLevel = useCallback(() => {
    const prev = Math.max(currentLevel - 1, 0);
    localStorage.setItem('wsg_level', String(prev));
    setCurrentLevel(prev);
  }, [currentLevel]);

  const useHint = useCallback(() => {
    const unfound = placedWords.filter(pw => !foundWords.has(pw.word));
    if (!unfound.length) return;
    const pick = unfound[Math.floor(Math.random() * unfound.length)];
    if (!pick.cells.length) return;
    const [r, c] = pick.cells[0];
    setHintCell(`${r},${c}`);
    setTimeout(() => setHintCell(null), 1600);
    const newCoins = Math.max(0, coins - 10);
    setCoins(newCoins);
    localStorage.setItem('wsg_coins', String(newCoins));
  }, [placedWords, foundWords, coins]);

  const isSelecting_cell = useCallback((r, c) => {
    return selectingCells.some(([sr, sc]) => sr === r && sc === c);
  }, [selectingCells]);

  return {
    currentLevel, coins, grid, placedWords, foundWords, levelData,
    colorMap, selectingCells, showWin, winBonus, hintCell, wrongFlash,
    showFinalScreen,
    startSelect, moveSelect, endSelect, goNextLevel, goPrevLevel, useHint,
    isSelecting_cell, isSelecting, resetGame,
  };
}
