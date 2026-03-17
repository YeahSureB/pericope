'use strict';

/* =============================================================
   PERICOPE — game.js
   Bible pericope locator game. Vanilla JS, no dependencies.
   ============================================================= */

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const BOOK_INFO = {
  GEN:  { name: 'Genesis',           testament: 'OT', section: 'Pentateuch'       },
  EXO:  { name: 'Exodus',            testament: 'OT', section: 'Pentateuch'       },
  LEV:  { name: 'Leviticus',         testament: 'OT', section: 'Pentateuch'       },
  NUM:  { name: 'Numbers',           testament: 'OT', section: 'Pentateuch'       },
  DEU:  { name: 'Deuteronomy',       testament: 'OT', section: 'Pentateuch'       },
  JOS:  { name: 'Joshua',            testament: 'OT', section: 'History'          },
  JDG:  { name: 'Judges',            testament: 'OT', section: 'History'          },
  RUT:  { name: 'Ruth',              testament: 'OT', section: 'History'          },
  '1SA':{ name: '1 Samuel',          testament: 'OT', section: 'History'          },
  '2SA':{ name: '2 Samuel',          testament: 'OT', section: 'History'          },
  '1KI':{ name: '1 Kings',           testament: 'OT', section: 'History'          },
  '2KI':{ name: '2 Kings',           testament: 'OT', section: 'History'          },
  '1CH':{ name: '1 Chronicles',      testament: 'OT', section: 'History'          },
  '2CH':{ name: '2 Chronicles',      testament: 'OT', section: 'History'          },
  EZR:  { name: 'Ezra',              testament: 'OT', section: 'History'          },
  NEH:  { name: 'Nehemiah',          testament: 'OT', section: 'History'          },
  EST:  { name: 'Esther',            testament: 'OT', section: 'History'          },
  JOB:  { name: 'Job',               testament: 'OT', section: 'Wisdom & Poetry'  },
  PSA:  { name: 'Psalms',            testament: 'OT', section: 'Wisdom & Poetry'  },
  PRO:  { name: 'Proverbs',          testament: 'OT', section: 'Wisdom & Poetry'  },
  ECC:  { name: 'Ecclesiastes',      testament: 'OT', section: 'Wisdom & Poetry'  },
  SNG:  { name: 'Song of Songs',     testament: 'OT', section: 'Wisdom & Poetry'  },
  ISA:  { name: 'Isaiah',            testament: 'OT', section: 'Major Prophets'   },
  JER:  { name: 'Jeremiah',          testament: 'OT', section: 'Major Prophets'   },
  LAM:  { name: 'Lamentations',      testament: 'OT', section: 'Major Prophets'   },
  EZK:  { name: 'Ezekiel',           testament: 'OT', section: 'Major Prophets'   },
  DAN:  { name: 'Daniel',            testament: 'OT', section: 'Major Prophets'   },
  HOS:  { name: 'Hosea',             testament: 'OT', section: 'Minor Prophets'   },
  JOL:  { name: 'Joel',              testament: 'OT', section: 'Minor Prophets'   },
  AMO:  { name: 'Amos',              testament: 'OT', section: 'Minor Prophets'   },
  OBA:  { name: 'Obadiah',           testament: 'OT', section: 'Minor Prophets'   },
  JON:  { name: 'Jonah',             testament: 'OT', section: 'Minor Prophets'   },
  MIC:  { name: 'Micah',             testament: 'OT', section: 'Minor Prophets'   },
  NAM:  { name: 'Nahum',             testament: 'OT', section: 'Minor Prophets'   },
  HAB:  { name: 'Habakkuk',          testament: 'OT', section: 'Minor Prophets'   },
  ZEP:  { name: 'Zephaniah',         testament: 'OT', section: 'Minor Prophets'   },
  HAG:  { name: 'Haggai',            testament: 'OT', section: 'Minor Prophets'   },
  ZEC:  { name: 'Zechariah',         testament: 'OT', section: 'Minor Prophets'   },
  MAL:  { name: 'Malachi',           testament: 'OT', section: 'Minor Prophets'   },
  MAT:  { name: 'Matthew',           testament: 'NT', section: 'Gospels & Acts'   },
  MRK:  { name: 'Mark',              testament: 'NT', section: 'Gospels & Acts'   },
  LUK:  { name: 'Luke',              testament: 'NT', section: 'Gospels & Acts'   },
  JHN:  { name: 'John',              testament: 'NT', section: 'Gospels & Acts'   },
  ACT:  { name: 'Acts',              testament: 'NT', section: 'Gospels & Acts'   },
  ROM:  { name: 'Romans',            testament: 'NT', section: 'Pauline Epistles' },
  '1CO':{ name: '1 Corinthians',     testament: 'NT', section: 'Pauline Epistles' },
  '2CO':{ name: '2 Corinthians',     testament: 'NT', section: 'Pauline Epistles' },
  GAL:  { name: 'Galatians',         testament: 'NT', section: 'Pauline Epistles' },
  EPH:  { name: 'Ephesians',         testament: 'NT', section: 'Pauline Epistles' },
  PHP:  { name: 'Philippians',       testament: 'NT', section: 'Pauline Epistles' },
  COL:  { name: 'Colossians',        testament: 'NT', section: 'Pauline Epistles' },
  '1TH':{ name: '1 Thessalonians',   testament: 'NT', section: 'Pauline Epistles' },
  '2TH':{ name: '2 Thessalonians',   testament: 'NT', section: 'Pauline Epistles' },
  '1TI':{ name: '1 Timothy',         testament: 'NT', section: 'Pauline Epistles' },
  '2TI':{ name: '2 Timothy',         testament: 'NT', section: 'Pauline Epistles' },
  TIT:  { name: 'Titus',             testament: 'NT', section: 'Pauline Epistles' },
  PHM:  { name: 'Philemon',          testament: 'NT', section: 'Pauline Epistles' },
  HEB:  { name: 'Hebrews',           testament: 'NT', section: 'General Epistles' },
  JAS:  { name: 'James',             testament: 'NT', section: 'General Epistles' },
  '1PE':{ name: '1 Peter',           testament: 'NT', section: 'General Epistles' },
  '2PE':{ name: '2 Peter',           testament: 'NT', section: 'General Epistles' },
  '1JN':{ name: '1 John',            testament: 'NT', section: 'General Epistles' },
  '2JN':{ name: '2 John',            testament: 'NT', section: 'General Epistles' },
  '3JN':{ name: '3 John',            testament: 'NT', section: 'General Epistles' },
  JUD:  { name: 'Jude',              testament: 'NT', section: 'General Epistles' },
  REV:  { name: 'Revelation',        testament: 'NT', section: 'Revelation'       },
};

const OT_SECTIONS = ['Pentateuch', 'History', 'Wisdom & Poetry', 'Major Prophets', 'Minor Prophets'];
const NT_SECTIONS = ['Gospels & Acts', 'Pauline Epistles', 'General Epistles', 'Revelation'];

// Points for each level: [testament, section, book, chapterGroup, chapter]
const LEVEL_POINTS_FULL  = [1, 2, 4, 2, 4]; // book with chapter groups
const LEVEL_POINTS_SHORT = [1, 2, 4, 4];     // book without chapter groups

const CHAPTER_GROUP_THRESHOLD = 15;  // > this → use chapter groups
const CHAPTER_GROUP_SIZE      = 10;

const LEVEL_NAMES = {
  testament:    'Testament',
  section:      'Section',
  book:         'Book',
  chapterGroup: 'Chapter Range',
  chapter:      'Chapter',
};

const LEVEL_PROMPTS = {
  testament:    'Which testament?',
  section:      'Which section of Scripture?',
  book:         'Which book?',
  chapterGroup: 'Which chapter range?',
  chapter:      'Which chapter does this begin in?',
};

// ─────────────────────────────────────────────────────────────
// APP STATE
// ─────────────────────────────────────────────────────────────

let bibleData = null;   // loaded from localStorage or fetch
let saveData  = null;   // persistent player data
let q         = {};     // current question state
let totalPericopes = 0; // computed once after data loads

// ─────────────────────────────────────────────────────────────
// PERSISTENCE — save / load
// ─────────────────────────────────────────────────────────────

const SAVE_KEY = 'pericope_v1_save';
const DATA_KEY = 'pericope_v1_data';

function todayStr()  { return new Date().toISOString().slice(0, 10); }
function monthStr()  { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function weekStr() {
  const d   = new Date();
  const mon = new Date(d); mon.setDate(d.getDate() - ((d.getDay()+6)%7));
  return mon.toISOString().slice(0, 10);
}

function defaultSave() {
  return {
    mode:  'pilgrimage',
    theme: 'dark',
    scores: {
      daily:   { current: 0, date:  todayStr(), allTimeHigh: 0 },
      weekly:  { current: 0, week:  weekStr(),  allTimeHigh: 0 },
      monthly: { current: 0, month: monthStr(), allTimeHigh: 0 },
      streak:  { current: 0, allTimeHigh: 0 },
    },
    seen: [],
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    saveData = raw ? JSON.parse(raw) : defaultSave();
    // Migrate missing fields
    saveData.scores       = saveData.scores       || defaultSave().scores;
    saveData.seen         = saveData.seen         || [];
    saveData.theme        = saveData.theme        || 'dark';
    saveData.mode         = saveData.mode         || 'pilgrimage';
    checkRollovers();
  } catch(e) {
    saveData = defaultSave();
  }
}

function persistSave() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData)); } catch(e) {}
}

function checkRollovers() {
  const s = saveData.scores;
  const today = todayStr(), week = weekStr(), month = monthStr();
  if (s.daily.date  !== today) { s.daily.current  = 0; s.daily.date  = today; }
  if (s.weekly.week !== week)  { s.weekly.current  = 0; s.weekly.week  = week; }
  if (s.monthly.month !== month){ s.monthly.current = 0; s.monthly.month = month; }
}

function addScore(pts) {
  if (pts <= 0) return;
  const s = saveData.scores;
  s.daily.current   += pts; if (s.daily.current   > s.daily.allTimeHigh)   s.daily.allTimeHigh   = s.daily.current;
  s.weekly.current  += pts; if (s.weekly.current  > s.weekly.allTimeHigh)  s.weekly.allTimeHigh  = s.weekly.current;
  s.monthly.current += pts; if (s.monthly.current > s.monthly.allTimeHigh) s.monthly.allTimeHigh = s.monthly.current;
  persistSave();
}

function updateStreak(gotPoints) {
  const st = saveData.scores.streak;
  if (gotPoints) {
    st.current++;
    if (st.current > st.allTimeHigh) st.allTimeHigh = st.current;
  } else {
    st.current = 0;
  }
  persistSave();
}

function markSeen(book, chapter, idx) {
  const key = `${book}-${chapter}-${idx}`;
  if (!saveData.seen.includes(key)) {
    saveData.seen.push(key);
    persistSave();
  }
}

// ─────────────────────────────────────────────────────────────
// DATA LOADING
// ─────────────────────────────────────────────────────────────

async function loadData() {
  // Try localStorage cache first
  try {
    const cached = localStorage.getItem(DATA_KEY);
    if (cached) {
      bibleData = JSON.parse(cached);
      return true;
    }
  } catch(e) {}

  // Fetch from network
  try {
    const resp = await fetch('bible_data.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    bibleData = json;
    // Cache it
    try { localStorage.setItem(DATA_KEY, JSON.stringify(json)); } catch(e) {}
    return true;
  } catch(e) {
    setTitle('Could not load Bible data. Please check your connection and refresh.', true);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────
// PERICOPE SELECTION
// ─────────────────────────────────────────────────────────────

function buildFlatList() {
  const list = [];
  for (const [book, chapters] of Object.entries(bibleData)) {
    if (!BOOK_INFO[book]) continue;
    for (const [chap, pericopes] of Object.entries(chapters)) {
      for (let i = 0; i < pericopes.length; i++) {
        list.push({
          book,
          chapter: parseInt(chap, 10),
          idx:     i,
          title:   pericopes[i][1],
        });
      }
    }
  }
  return list;
}

function pickPericope() {
  const all = buildFlatList();
  totalPericopes = all.length;

  if (saveData.mode === 'pilgrimage') {
    const seenSet = new Set(saveData.seen);
    const unseen  = all.filter(p => !seenSet.has(`${p.book}-${p.chapter}-${p.idx}`));
    const pool    = unseen.length > 0 ? unseen : all; // wrap around on completion
    return pool[Math.floor(Math.random() * pool.length)];
  }
  return all[Math.floor(Math.random() * all.length)];
}

// ─────────────────────────────────────────────────────────────
// LEVEL COMPUTATION
// ─────────────────────────────────────────────────────────────

function getChapterCount(book) {
  const keys = Object.keys(bibleData[book] || {}).map(Number);
  return keys.length > 0 ? Math.max(...keys) : 1;
}

function buildLevelConfig(book, chapter) {
  const maxChap = getChapterCount(book);
  const useGroup = maxChap > CHAPTER_GROUP_THRESHOLD;

  let groupRange = null;
  if (useGroup) {
    const groupStart = Math.floor((chapter - 1) / CHAPTER_GROUP_SIZE) * CHAPTER_GROUP_SIZE + 1;
    const groupEnd   = Math.min(groupStart + CHAPTER_GROUP_SIZE - 1, maxChap);
    groupRange = [groupStart, groupEnd];
  }

  return {
    levels:     useGroup
                  ? ['testament','section','book','chapterGroup','chapter']
                  : ['testament','section','book','chapter'],
    points:     useGroup ? LEVEL_POINTS_FULL : LEVEL_POINTS_SHORT,
    groupRange,
    chapterCount: maxChap,
  };
}

// ─────────────────────────────────────────────────────────────
// GAME STATE — start / answer / finish
// ─────────────────────────────────────────────────────────────

function startNewQuestion() {
  const p   = pickPericope();
  const cfg = buildLevelConfig(p.book, p.chapter);

  q = {
    book:         p.book,
    chapter:      p.chapter,
    idx:          p.idx,
    title:        p.title,

    levels:       cfg.levels,
    points:       cfg.points,
    groupRange:   cfg.groupRange,
    chapterCount: cfg.chapterCount,

    // Index of the level we're currently answering
    currentLevelIdx: 0,

    // First level where the player got a wrong guess (-1 = none yet)
    firstMissedLevelIdx: -1,

    // Per-level record: { firstTry, earned }  (pushed on correct answer)
    levelRecord: [],

    // Buttons greyed out in current level (set of value strings)
    greyedButtons: new Set(),

    // Whether the question has been fully answered
    done: false,

    // Running point total for this question
    totalEarned: 0,
  };

  renderAll();
}

function currentLevelName() {
  return q.levels[q.currentLevelIdx];
}

function handleAnswer(value) {
  if (q.done) return;

  const level   = currentLevelName();
  const correct = checkCorrect(level, value);

  if (correct) {
    const firstTry  = q.greyedButtons.size === 0;
    const canEarn   = q.firstMissedLevelIdx === -1;
    const earned    = (canEarn && firstTry) ? q.points[q.currentLevelIdx] : 0;

    // Update firstMissedLevelIdx if this was a wrong-then-right scenario
    // (already set when wrong guesses happened, so nothing to do here)

    q.levelRecord.push({ level, firstTry, earned });
    q.totalEarned += earned;
    q.greyedButtons = new Set();
    q.currentLevelIdx++;

    if (q.currentLevelIdx >= q.levels.length) {
      finishQuestion();
    } else {
      // Only update the parts that change between levels.
      // Deliberately skip renderPericope() — the title is unchanged
      // and touching it would retrigger its entrance animation.
      renderTopBar();
      renderLevelDots();
      renderPrompt();
      renderButtons();
      animateCard('correct');
    }
  } else {
    // Wrong answer
    if (q.firstMissedLevelIdx === -1) {
      q.firstMissedLevelIdx = q.currentLevelIdx;
    }
    q.greyedButtons.add(value);
    renderButtons(); // re-render to grey out
    animateCard('wrong');
  }
}

function checkCorrect(level, value) {
  const info = BOOK_INFO[q.book];
  switch (level) {
    case 'testament':    return value === info.testament;
    case 'section':      return value === info.section;
    case 'book':         return value === q.book;
    case 'chapterGroup': {
      const start = parseInt(value, 10);
      return q.chapter >= start && q.chapter < start + CHAPTER_GROUP_SIZE;
    }
    case 'chapter':      return parseInt(value, 10) === q.chapter;
    default:             return false;
  }
}

function finishQuestion() {
  q.done = true;

  // Mark seen in pilgrimage mode
  if (saveData.mode === 'pilgrimage') markSeen(q.book, q.chapter, q.idx);

  // Add to scores
  addScore(q.totalEarned);

  // Streak: resets if firstMissedLevelIdx === 0 (testament missed first)
  // "resets on a completely wrong first guess at Testament level"
  // = scored zero points (missed at the very first level)
  updateStreak(q.totalEarned > 0);

  renderAll();
  showScoreOverlay();
}

// ─────────────────────────────────────────────────────────────
// BUTTON CONTENT PER LEVEL
// ─────────────────────────────────────────────────────────────

function getButtonsForLevel(level) {
  const info = BOOK_INFO[q.book];

  switch (level) {
    case 'testament':
      return [
        { value: 'OT', label: 'Old Testament' },
        { value: 'NT', label: 'New Testament' },
      ];

    case 'section': {
      const sects = info.testament === 'OT' ? OT_SECTIONS : NT_SECTIONS;
      return sects.map(s => ({ value: s, label: s }));
    }

    case 'book': {
      // Show books of the correct section
      return Object.entries(BOOK_INFO)
        .filter(([, b]) => b.section === info.section)
        .map(([abbr, b]) => ({ value: abbr, label: b.name }));
    }

    case 'chapterGroup': {
      const groups = [];
      for (let start = 1; start <= q.chapterCount; start += CHAPTER_GROUP_SIZE) {
        const end = Math.min(start + CHAPTER_GROUP_SIZE - 1, q.chapterCount);
        groups.push({ value: String(start), label: `Ch. ${start}–${end}` });
      }
      return groups;
    }

    case 'chapter': {
      const range  = q.groupRange;
      const lo     = range ? range[0] : 1;
      const hi     = range ? range[1] : q.chapterCount;
      const result = [];
      for (let c = lo; c <= hi; c++) {
        result.push({ value: String(c), label: String(c) });
      }
      return result;
    }
  }
  return [];
}

// ─────────────────────────────────────────────────────────────
// RENDERING
// ─────────────────────────────────────────────────────────────

function renderAll() {
  renderTopBar();
  renderPericope();
  renderLevelDots();
  renderPrompt();
  renderButtons();
}

function renderTopBar() {
  document.getElementById('streak-count').textContent = saveData.scores.streak.current;
  document.getElementById('daily-score').textContent  = saveData.scores.daily.current;
  const badge = document.getElementById('mode-badge');
  badge.textContent = saveData.mode === 'pilgrimage' ? 'PIL' : 'RND';
  badge.title = saveData.mode === 'pilgrimage' ? 'Pilgrimage Mode' : 'Random Mode';
}

function renderPericope() {
  const card = document.getElementById('pericope-card');
  // Remove then re-add the intro class so the animation fires exactly once
  // per new question, regardless of any prior state.
  card.classList.remove('anim-intro');
  void card.offsetWidth; // force reflow so the re-add is treated as a new animation
  card.classList.add('anim-intro');
  setTitle(q.title || '…', false);
}

function setTitle(text, loading) {
  const el = document.getElementById('pericope-title');
  el.textContent = text;
  el.classList.toggle('loading', loading);
}

function renderLevelDots() {
  const container = document.getElementById('level-dots');
  container.innerHTML = '';

  (q.levels || []).forEach((level, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';

    if (i < q.currentLevelIdx) {
      // Answered — gold if before first miss, grey if at/after
      const scored = q.firstMissedLevelIdx === -1 || i < q.firstMissedLevelIdx;
      dot.classList.add(scored ? 'dot-gold' : 'dot-grey');
    } else if (i === q.currentLevelIdx && !q.done) {
      dot.classList.add('dot-active');
    } else {
      dot.classList.add('dot-empty');
    }

    container.appendChild(dot);
  });
}

function renderPrompt() {
  const el = document.getElementById('level-prompt');
  el.textContent = q.done ? '' : (LEVEL_PROMPTS[currentLevelName()] || '');
}

function renderButtons() {
  const panel = document.getElementById('button-panel');
  panel.innerHTML = '';

  if (q.done) return;

  const level   = currentLevelName();
  const buttons = getButtonsForLevel(level);
  const isChapGroup  = level === 'chapterGroup';
  const isChapter    = level === 'chapter';

  const grid = document.createElement('div');
  grid.className = 'button-grid';

  if (buttons.length <= 2) {
    grid.classList.add('single-col');
  } else if (isChapter && buttons.length > 6) {
    grid.classList.add('chapter-grid');
  }

  buttons.forEach(btn => {
    const el = document.createElement('button');
    el.className = 'answer-btn';
    el.textContent = btn.label;
    el.dataset.value = btn.value;

    if (q.greyedButtons.has(btn.value)) {
      el.classList.add('greyed');
      el.disabled = true;
    } else {
      el.addEventListener('click', () => handleAnswer(btn.value));
    }

    grid.appendChild(el);
  });

  panel.appendChild(grid);
  // Scroll button panel to top on level change
  panel.scrollTop = 0;
}

// ─────────────────────────────────────────────────────────────
// SCORE OVERLAY
// ─────────────────────────────────────────────────────────────

function showScoreOverlay() {
  const overlay   = document.getElementById('score-overlay');
  const linesEl   = document.getElementById('score-lines');
  const totalEl   = document.getElementById('score-total');
  const locEl     = document.getElementById('score-location');

  // Location
  const bookName = BOOK_INFO[q.book] ? BOOK_INFO[q.book].name : q.book;
  locEl.textContent = `${bookName} ${q.chapter}`;

  // Level breakdown
  linesEl.innerHTML = '';
  q.levelRecord.forEach((rec, i) => {
    const row = document.createElement('div');
    row.className = 'score-row';

    const pts     = rec.earned;
    const maxPts  = q.points[i];
    const earned  = pts > 0;

    row.innerHTML = `
      <span class="score-row-level">${LEVEL_NAMES[rec.level]}</span>
      <span class="score-row-points ${earned ? 'earned' : 'missed'}">
        ${earned ? '+' + pts : '—'}
      </span>`;
    linesEl.appendChild(row);
  });

  // Total
  totalEl.textContent = `+${q.totalEarned} pts`;

  overlay.classList.remove('hidden');
}

function hideScoreOverlay() {
  document.getElementById('score-overlay').classList.add('hidden');
  startNewQuestion();
}

// ─────────────────────────────────────────────────────────────
// ANIMATIONS
// ─────────────────────────────────────────────────────────────

function animateCard(type) {
  const card = document.getElementById('pericope-card');
  card.classList.remove('anim-correct', 'anim-wrong');
  // Force reflow
  void card.offsetWidth;
  card.classList.add(type === 'correct' ? 'anim-correct' : 'anim-wrong');
  setTimeout(() => card.classList.remove('anim-correct', 'anim-wrong'), 600);
}

// ─────────────────────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────────────────────

function openSettings() {
  renderSettings();
  document.getElementById('settings-panel').classList.remove('hidden');
}

function closeSettings() {
  document.getElementById('settings-panel').classList.add('hidden');
}

function renderSettings() {
  const isDark = saveData.theme === 'dark';
  document.getElementById('theme-toggle').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';

  document.getElementById('btn-pilgrimage').classList.toggle('active', saveData.mode === 'pilgrimage');
  document.getElementById('btn-random').classList.toggle('active', saveData.mode === 'random');

  document.getElementById('mode-desc').textContent = saveData.mode === 'pilgrimage'
    ? 'Tracks every pericope you\'ve seen. Works toward completing the entire Bible.'
    : 'Picks any pericope at random. No progress tracking.';

  // Stats grid
  const grid = document.getElementById('stats-grid');
  const s    = saveData.scores;
  grid.innerHTML = `
    ${statCell('Today',   s.daily.current,   s.daily.allTimeHigh)}
    ${statCell('Week',    s.weekly.current,  s.weekly.allTimeHigh)}
    ${statCell('Month',   s.monthly.current, s.monthly.allTimeHigh)}
    ${statCell('Streak 🔥', s.streak.current, s.streak.allTimeHigh)}
  `;

  // Pilgrimage progress
  const progSec = document.getElementById('progress-section');
  if (saveData.mode === 'pilgrimage' && totalPericopes > 0) {
    progSec.style.display = '';
    const seen = saveData.seen.length;
    const pct  = Math.round((seen / totalPericopes) * 100);
    document.getElementById('progress-bar-fill').style.width = pct + '%';
    document.getElementById('progress-text').textContent =
      `${seen.toLocaleString()} of ${totalPericopes.toLocaleString()} pericopes seen (${pct}%)`;
  } else {
    progSec.style.display = 'none';
  }
}

function statCell(label, current, ath) {
  return `
    <div class="stat-cell">
      <div class="stat-cell-label">${label}</div>
      <div class="stat-cell-value">${current.toLocaleString()}</div>
      <div class="stat-cell-ath">Best: ${ath.toLocaleString()}</div>
    </div>`;
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  saveData.theme = isDark ? 'dark' : 'light';
  persistSave();
  renderSettings();
}

function switchMode(mode) {
  saveData.mode = mode;
  persistSave();
  closeSettings();
  startNewQuestion();
}

function applyTheme() {
  if (saveData.theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────

function setupListeners() {
  document.getElementById('settings-btn').addEventListener('click', openSettings);
  document.getElementById('settings-close').addEventListener('click', closeSettings);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('btn-pilgrimage').addEventListener('click', () => switchMode('pilgrimage'));
  document.getElementById('btn-random').addEventListener('click', () => switchMode('random'));
  document.getElementById('next-btn').addEventListener('click', hideScoreOverlay);

  // Tap outside to close overlays
  document.getElementById('settings-panel').addEventListener('click', e => {
    if (e.target.id === 'settings-panel') closeSettings();
  });
  document.getElementById('score-overlay').addEventListener('click', e => {
    if (e.target.id === 'score-overlay') hideScoreOverlay();
  });
}

async function init() {
  loadSave();
  applyTheme();
  setupListeners();

  // Show loading state
  setTitle('Loading…', true);

  const ok = await loadData();
  if (!ok) return;

  // Pre-compute total pericopes count
  totalPericopes = buildFlatList().length;

  startNewQuestion();
}

document.addEventListener('DOMContentLoaded', init);
