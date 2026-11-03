// ===================================================
// SCIMASTER - O-NET MATHEMATICS EXAM ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let mathQueue = [];

const mathMasterDatabase = [
  {
    category: "📐 O-NET พีทาโกรัส",
    sentence: "บันโไดอันหนึ่งยาว 10 เมตร พาดอยู่กับผนังตึก โดยโคนบันไดอยู่ห่างจากผนังตึก 6 เมตร ปลายบนของบันไดจะอยู่สูงจากพื้นดินกี่เมตร?",
    ans: "8 เมตร",
    options: [
      "8 เมตร",
      "4 เมตร",
      "12 เมตร",
      "14 เมตร"
    ],
    hint: "ใช้ทฤษฎีบทพีทาโกรัส: c² = a² + b² (โดย c คือความยาวบันได = 10)",
    exp: "ตอบ <b>8 เมตร</b> คำนวณจาก a = √(10² - 6²) = √(100 - 36) = √64 = 8 เมตร"
  },
  {
    category: "🔢 O-NET เลขยกกำลัง",
    sentence: "ค่าของ (2^5 × 2^3) / 2^4 ตรงกับข้อใด?",
    ans: "16",
    options: [
      "16",
      "8",
      "32",
      "64"
    ],
    hint: "ใช้สมบัติเลขยกกำลัง: คูณกันเอาเลขชี้กำลังมาบวกกัน หารกันเอามาลบกัน",
    exp: "ตอบ <b>16</b> คำนวณจาก 2^(5+3-4) = 2^4 = 16"
  },
  {
    category: "📊 O-NET สถิติ (ค่ากลาง)",
    sentence: "ข้อมูลชุดหนึ่งมี 5 จำนวน ได้แก่ 10, 12, 15, 18 และ x ถ้าระยะค่าเฉลี่ยเลขคณิตของข้อมูลชุดนี้เท่ากับ 15 แล้ว x มีค่าเท่าใด?",
    ans: "20",
    options: [
      "20",
      "14",
      "22",
      "25"
    ],
    hint: "ค่าเฉลี่ยเลขคณิต = ผลรวมของข้อมูลทั้งหมด / จำนวนข้อมูลทั้งหมด",
    exp: "ตอบ <b>20</b> คำนวณจาก (10 + 12 + 15 + 18 + x) / 5 = 15 -> (55 + x) = 75 -> x = 20"
  },
  {
    category: "🧪 O-NET การวัดและเรขาคณิต",
    sentence: "ทรงกระบอกใบหนึ่งมีรัศมีปากถัง 7 เซนติเมตร และสูง 10 เซนติเมตร จะมีปริมาตรประมาณเท่าใด (กำหนดให้ π ≈ 22/7)?",
    ans: "1,540 ลูกบาศก์เซนติเมตร",
    options: [
      "1,540 ลูกบาศก์เซนติเมตร",
      "770 ลูกบาศก์เซนติเมตร",
      "3,080 ลูกบาศก์เซนติเมตร",
      "1,078 ลูกบาศก์เซนติเมตร"
    ],
    hint: "สูตรปริมาตรทรงกระบอก = พื้นที่ฐาน × สูง = πr²h",
    exp: "ตอบ <b>1,540 ลูกบาศก์เซนติเมตร</b> คำนวณจาก (22/7) × 7² × 10 = (22/7) × 49 × 10 = 1,540"
  },
  {
    category: "🎲 O-NET ความน่าจะเป็น",
    sentence: "ทอดลูกเต๋าเที่ยงตรง 1 ลูก 1 ครั้ง ความน่าจะเป็นที่จะได้แต้มที่เป็นจำนวนเฉพาะมีค่าเท่าใด?",
    ans: "1/2",
    options: [
      "1/2",
      "1/3",
      "1/6",
      "2/3"
    ],
    hint: "แต้มที่เป็นจำนวนเฉพาะบนลูกเต๋า (1 ถึง 6) ได้แก่ 2, 3 และ 5",
    exp: "ตอบ <b>1/2</b> เนื่องจากจำนวนเฉพาะมี 3 ตัว (2, 3, 5) จากทั้งหมด 6 หน้า (3/6 = 1/2)"
  },
  {
    category: "📉 O-NET สมการเชิงเส้น",
    sentence: "ถ้า 3x - 5 = 16 แล้วค่าของ 2x + 4 ตรงกับข้อใด?",
    ans: "18",
    options: [
      "18",
      "14",
      "21",
      "24"
    ],
    hint: "แก้สมบัติหาค่า x จากสมการแรกก่อน แล้วนำไปแทนค่าใน 2x + 4",
    exp: "ตอบ <b>18</b> แก้สมการได้ 3x = 21 -> x = 7 นำไปแทนค่าจะได้ 2(7) + 4 = 14 + 4 = 18"
  }
];

let currentMathAns = "";
let currentMathExp = "";

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
  }
  if (btnEl) {
    btnEl.classList.add('active');
  }

  if (tabId === 'tab-drill') {
    generateMathQuestion();
  }
}

function updateScoreBoard(isCorrect) {
  totalAttempts++;
  if (isCorrect) {
    globalScore += 10;
    globalStreak++;
  } else {
    globalStreak = 0;
  }

  const scoreEl = document.getElementById('score-val');
  const streakEl = document.getElementById('streak-val');
  const progressEl = document.getElementById('progress-val');

  if (scoreEl) scoreEl.innerText = globalScore;
  if (streakEl) streakEl.innerText = globalStreak;

  const progressPercent = Math.min(100, Math.round((totalAttempts / 10) * 100));
  if (progressEl) progressEl.innerText = `${progressPercent}%`;
}

function buildMathQueue() {
  return shuffleArray([...mathMasterDatabase]);
}

function generateMathQuestion() {
  if (mathQueue.length === 0) {
    mathQueue = buildMathQueue();
  }

  const qData = mathQueue.pop();
  if (!qData) return;

  currentMathAns = qData.ans;
  currentMathExp = qData.exp;

  const badgeEl = document.getElementById('math-category-badge');
  const qTextEl = document.getElementById('math-q-text');
  const qHintEl = document.getElementById('math-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('math-feedback');
  const nextBtnEl = document.getElementById('math-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('math-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffleArray(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkMathAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkMathAnswer(selected, btn) {
  const isCorrect = selected === currentMathAns;
  document.querySelectorAll('#math-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentMathAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('math-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('math-fb-title');
  const descEl = document.getElementById('math-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentMathExp;

  const nextBtn = document.getElementById('math-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  mathQueue = buildMathQueue();
};