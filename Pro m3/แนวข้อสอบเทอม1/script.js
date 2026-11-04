const mathM3Term1Database = [
    {
        category: "อสมการเชิงเส้นตัวแปรเดียว",
        sentence: "คำตอบของอสมการ 3x - 5 < 10 คือจำนวนในข้อใด?",
        ans: "x < 5",
        options: ["x < 5", "x > 5", "x ≤ 3", "x ≥ 5"],
        exp: "วิธีทำ: 3x < 10 + 5 -> 3x < 15 -> x < 5"
    },
    {
        category: "การแยกตัวประกอบพหุนาม (ผลต่างกำลังสาม)",
        sentence: "จงแยกตัวประกอบของพหุนาม x³ - 8",
        ans: "(x - 2)(x² + 2x + 4)",
        options: ["(x - 2)(x² + 2x + 4)", "(x + 2)(x² - 2x + 4)", "(x - 2)(x² - 2x + 4)", "(x - 4)(x + 2)"],
        exp: "สูตรผลต่างกำลังสาม: A³ - B³ = (A - B)(A² + AB + B²)"
    },
    {
        category: "สมการกำลังสองตัวแปรเดียว",
        sentence: "รากของสมการ x² - 5x + 6 = 0 มีค่าตรงกับข้อใด?",
        ans: "x = 2 และ x = 3",
        options: ["x = 2 และ x = 3", "x = -2 และ x = -3", "x = 1 และ x = 6", "x = -1 และ x = -6"],
        exp: "วิธีทำ: แยกตัวประกอบได้ (x - 2)(x - 3) = 0 ดังนั้น x = 2, 3"
    },
    {
        category: "ความคล้าย (รูปสามเหลี่ยมคล้าย)",
        sentence: "กำหนดให้สามเหลี่ยมสองรูปคล้ายกัน มีอัตราส่วนความยาวด้านเป็น 2 : 3 ถ้าด้านเล็กยาว 10 ซม. ด้านที่สมนัยกันของรูปใหญ่จะยาวเท่าใด?",
        ans: "15 เซนติเมตร",
        options: ["15 เซนติเมตร", "12 เซนติเมตร", "20 เซนติเมตร", "18 เซนติเมตร"],
        exp: "วิธีทำ: จากอัตราส่วน 2/3 = 10/x -> 2x = 30 -> x = 15 ซม."
    },
    {
        category: "กราฟฟังก์ชันกำลังสอง (พาราโบลา)",
        sentence: "พาราโบลา y = 2(x - 1)² + 3 มีจุดยอด (Vertex) อยู่ที่พิกัดใด?",
        ans: "(1, 3)",
        options: ["(1, 3)", "(-1, 3)", "(1, -3)", "(-1, -3)"],
        exp: "จากรูปมาตรฐาน y = a(x - h)² + k จุดยอดคือ (h, k) ในที่นี้ h = 1, k = 3"
    },
    {
        category: "สถิติ (แผนภาพกล่อง)",
        sentence: "จากแผนภาพกล่อง ควอไทล์ที่ 2 (Q₂) หรือมัธยฐานของข้อมูลแสดงด้วยส่วนใดของกล่อง?",
        ans: "เส้นทึบที่อยู่ภายในกล่อง",
        options: ["เส้นทึบที่อยู่ภายในกล่อง", "ขอบเขตล่างของกล่อง (Q₁)", "ขอบเขตบนของกล่อง (Q₃)", "ปลายหนวดทั้งสองข้าง"],
        exp: "ควอไทล์ที่ 2 (Q₂) คือมัธยฐาน ซึ่งจะแสดงด้วยเส้นแบ่งแนวตั้งภายในกล่อง"
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
        questionQueue = shuffleArray([...mathM3Term1Database]);
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