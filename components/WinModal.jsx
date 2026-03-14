import styles from './WinModal.module.css';

const WIN_EMOJIS = { friends: ['💖','🥳','👯','🎊','🤩'], hard: ['🧠','🏆','📖','🎓','🔥'], normal: ['🎉','⭐','🌟','✨','🎊'] };
const WIN_SUBS = { friends: "Your squad has been found! 💕", hard: "Vocabulary master! 🔥", normal: "All words found!" };

export default function WinModal({ show, levelData, currentLevel, winBonus, onNext }) {
  if (!show || !levelData) return null;
  const type = levelData.type || 'normal';
  const pool = WIN_EMOJIS[type];
  const emoji = pool[currentLevel % pool.length];

  return (
    <div className={styles.overlay}>
      <div className={`${styles.card} ${type === 'friends' ? styles.friendsCard : type === 'hard' ? styles.hardCard : ''}`}>
        <div className={styles.emoji}>{emoji}</div>
        <h2 className={styles.title}>Level {currentLevel + 1} Complete!</h2>
        <p className={styles.sub}>{WIN_SUBS[type]}</p>
        <div className={`${styles.xp} ${type === 'friends' ? styles.friendsXp : ''}`}>
          +{winBonus} coins earned!
        </div>
        <button className={styles.nextBtn} onClick={onNext}>
          Next Level →
        </button>
      </div>
    </div>
  );
}
