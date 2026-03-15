import { useRef, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Game.module.css';
import { useGameState } from '../lib/useGameState';
import { getDifficulty, isFriendsLevel, isHardLevel } from '../lib/gameData';
import WinModal from './WinModal';

const WordGrid = dynamic(() => import('./WordGrid'), { ssr: false });

export default function Game() {
  const {
    currentLevel, coins, grid, placedWords, foundWords, levelData,
    colorMap, selectingCells, showWin, winBonus, hintCell, wrongFlash,
    showFinalScreen, resetGame,
    startSelect, moveSelect, endSelect, goNextLevel, goPrevLevel, useHint,
  } = useGameState();

  const diff = getDifficulty(currentLevel);
  const isFriends = levelData?.type === 'friends';
  const isHard = levelData?.type === 'hard';

  function bannerClass() {
    if (isFriends) return styles.friendsBanner;
    if (isHard) return styles.hardBanner;
    return styles.normalBanner;
  }

  return (
    <div className={styles.app}>
      {/* Stars bg */}
      <div className={styles.stars} />

      {/* Top bar */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={goPrevLevel}>‹</button>
        <div className={styles.levelBadge}>
          Level {currentLevel + 1}
          {isFriends && <span className={styles.friendsTag}>FRIENDS</span>}
          {isHard && <span className={styles.hardTag}>HARD</span>}
        </div>
        <div className={styles.coins}>
          <span className={styles.coinIcon} />
          {coins.toLocaleString()}
        </div>
      </div>

      {/* Category banner */}
      <div className={`${styles.catBanner} ${bannerClass()}`}>
        <div className={styles.catEmoji}>{levelData?.emoji}</div>
        <h2 className={styles.catName}>{levelData?.cat}</h2>
        <div className={styles.diffPips}>
          {[1,2,3,4,5].map(i => (
            <div
              key={i}
              className={`${styles.pip} ${i <= diff ? (isHard ? styles.pipDanger : styles.pipActive) : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Words to find */}
      <div className={styles.wordsPanel}>
        <div className={styles.wordsGrid}>
          {levelData?.words.map(word => (
            <div
              key={word}
              className={`${styles.wordChip} ${foundWords.has(word) ? styles.found : ''} ${isFriends ? styles.friendsChip : ''} ${isHard ? styles.hardChip : ''}`}
            >
              {word}
              {foundWords.has(word) && <span className={styles.checkmark}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.gridWrap}>
        <div className={styles.gridOverlayWrapper} style={{ position: 'relative' }}>
          <WordGrid
            grid={grid}
            levelData={levelData}
            colorMap={colorMap}
            selectingCells={selectingCells}
            hintCell={hintCell}
            wrongFlash={wrongFlash}
            onStart={startSelect}
            onMove={moveSelect}
            onEnd={endSelect}
          />
          {/* Selection highlight overlay */}
          {selectingCells.length > 0 && (
            <div className={styles.selOverlay}>
              {selectingCells.map(([r, c]) => {
                const cs = levelData ? Math.min(46, Math.max(28, Math.floor((Math.min(window?.innerWidth || 390, 420) - 72) / levelData.size))) : 42;
                return (
                  <div
                    key={`s${r}${c}`}
                    className={styles.selCell}
                    style={{
                      top: r * (cs + 2) + 12,
                      left: c * (cs + 2) + 12,
                      width: cs,
                      height: cs,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottombar}>
        <div className={styles.progressInfo}>
          Found <strong>{foundWords.size}</strong> / <strong>{placedWords.length}</strong>
        </div>
        <button className={styles.hintBtn} onClick={useHint}>
          Hint 💡 <span className={styles.hintCost}>−10</span>
        </button>
      </div>

      {/* Watermark */}
      <div className={styles.watermark}>Made by Ashwin</div>

      {/* Win modal */}
      <WinModal
        show={showWin}
        levelData={levelData}
        currentLevel={currentLevel}
        winBonus={winBonus}
        onNext={goNextLevel}
      />

      {/* 🎉 FINAL SCREEN - shows after level 6969 */}
      {showFinalScreen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#000',
        }}>
          <img
            src="/winner.jpg"
            alt="Congratulations!"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={resetGame}
            style={{
              position: 'absolute', bottom: 48,
              background: 'linear-gradient(135deg,#3ecf8e,#059669)',
              border: 'none', borderRadius: 50, padding: '16px 40px',
              fontSize: 18, fontWeight: 800, color: '#fff',
              cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
              boxShadow: '0 4px 24px rgba(62,207,142,0.5)',
            }}
          >
            Play Again from Level 1 🔄
          </button>
        </div>
      )}
    </div>
  );
}
