const mathM2Term1Database = [
    {
        category: "ทฤษฎีบทพีทาโกรัส และบทกลับ",
        sentence: "รูปสามเหลี่ยมมุมฉากรูปหนึ่ง มีความยาวด้านประกอบมุมฉากเท่ากับ 6 และ 8 หน่วย ความยาวของด้านตรงข้ามมุมฉากจะมีค่าเท่าใด?",
        ans: "10 หน่วย",
        options: ["10 หน่วย", "12 หน่วย", "14 หน่วย", "7 หน่วย"],
        exp: "วิธีทำ: จาก c² = a² + b² -> c² = 6² + 8² = 36 + 64 = 100 ดังนั้น c = 10 หน่วย[cite: 11]"
    },
    {
        category: "จำนวนจริง",
        sentence: "จำนวนในข้อใดต่อไปนี้จัดเป็น 'จำนวนอตรรกยะ'?",
        ans: "√7",
        options: ["√7", "22/7", "3.1416", "√9"],
        exp: "วิธีทำ: √7 ไม่สามารถเขียนในรูปเศษส่วนของจำนวนเต็มได้ จึงเป็นจำนวนอตรรกยะ (ส่วน √9 = 3 เป็นจำนวนตรรกยะ)[cite: 11]"
    },
    {
        category: "ปริซึมและทรงกระบอก",
        sentence: "ทรงกระบอกใบหนึ่งมีรัศมีปากถัง 7 เซนติเมตร สูง 10 เซนติเมตร จะมีปริมาตรเท่าใด (กำหนดให้ π ≈ 22/7)",
        ans: "1,540 ลูกบาศก์เซนติเมตร",
        options: ["1,540 ลูกบาศก์เซนติเมตร", "770 ลูกบาศก์เซนติเมตร", "3,080 ลูกบาศก์เซนติเมตร", "1,078 ลูกบาศก์เซนติเมตร"],
        exp: "วิธีทำ: ปริมาตรทรงกระบอก = พื้นที่ฐาน × สูง = (22/7) × 7² × 10 = 1,540 ลบ.ซม.[cite: 11]"
    },
    {
        category: "การแปลงทางเรขาคณิต",
        sentence: "การแปลงทางเรขาคณิตในข้อใดที่ทำให้รูปเรขาคณิตพลิกกลับด้านเสมือนมองกระจกเงา?",
        ans: "การสะท้อน (Reflection)",
        options: ["การสะท้อน (Reflection)", "การเลื่อนขนาน (Translation)", "การหมุน (Rotation)", "ถูกทุกข้อ"],
        exp: "วิธีทำ: การสะท้อนเป็นการแปลงที่เกิดจากการพลิกรูปข้ามเส้นสะท้อน ทำให้ได้ภาพที่กลับซ้ายเป็นขวาเหมือนกระจกเงา[cite: 11]"
    },
    {
        category: "สมบัติของเลขยกกำลัง",
        ans: "2¹⁰",
        sentence: "ค่าของ (2³) × (2²) ตรงกับเลขยกกำลังในข้อใด?",
        options: ["2⁵", "2⁶", "2¹⁰", "4⁵"],
        exp: "วิธีทำ: สมบัติการคูณเลขยกกำลังที่มีฐานเท่ากันให้นำเลขชี้กำลังมาบวกกัน: 2³⁺² = 2⁵[cite: 11]"
    },
    {
        category: "พหุนาม",
        sentence: "ผลบวกของพหุนาม (3x² + 5x - 2) กับ (2x² - x + 4) ตรงกับข้อใด?",
        ans: "5x² + 4x + 2",
        options: ["5x² + 4x + 2", "5x² + 6x + 2", "x² + 4x + 6", "5x² + 4x - 6"],
        exp: "วิธีทำ: นำพจน์ที่คล้ายกันมารวมกัน (3+2)x² + (5 - 1)x + (-2 + 4) = 5x² + 4x + 2[cite: 11]"
    }
];

let questionQueue = [];
let currentCorrectAnswer = "";
let currentExplanation = "";

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateRandomQuestion() {
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('feedback').style.background = 'transparent';
    document.getElementById('feedback').style.border = 'none';

    if (questionQueue.length === 0) {
        questionQueue = shuffleArray([...mathM2Term1Database]);
    }

    let q = questionQueue.pop();
    currentCorrectAnswer = q.ans;
    currentExplanation = q.exp;

    document.getElementById('questionText').innerHTML = `<b>[${q.category}]</b><br>${q.sentence}`;

    let choices = shuffleArray([...q.options]);

    let btnContainer = document.getElementById('btnGroup');
    btnContainer.innerHTML = '';
    choices.forEach(choice => {
        let btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(btn, choice);
        btnContainer.appendChild(btn);
    });
}

function checkAnswer(btn, selected) {
    let allBtns = document.querySelectorAll('.quiz-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    let fb = document.getElementById('feedback');
    fb.style.padding = '10px 14px';
    fb.style.border = '1px solid';

    if (selected === currentCorrectAnswer) {
        btn.classList.add('correct');
        fb.style.background = 'rgba(34, 197, 94, 0.15)';
        fb.style.borderColor = 'var(--success)';
        fb.style.color = 'var(--success)';
        fb.innerHTML = `🎉 <b>ถูกต้องยอดเยี่ยม!</b><br>${currentExplanation}`;
    } else {
        btn.classList.add('incorrect');
        fb.style.background = 'rgba(239, 68, 68, 0.15)';
        fb.style.borderColor = 'var(--danger)';
        fb.style.color = 'var(--danger)';
        fb.innerHTML = `❌ <b>ยังไม่ถูกต้อง!</b> เฉลยคือ: ${currentCorrectAnswer}<br>${currentExplanation}`;
        allBtns.forEach(b => {
            if (b.textContent === currentCorrectAnswer) b.classList.add('correct');
        });
    }
}

// เริ่มต้นสุ่มโจทย์ข้อแรก
generateRandomQuestion();