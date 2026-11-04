const mathEntranceDatabase = [
    {
        category: "พีชคณิตและพหุนาม",
        sentence: "กำหนดให้ x + 1/x = 3 แล้วค่าของ x³ + 1/x³ ตรงกับข้อใด?",
        ans: "18",
        options: ["18", "27", "24", "21"],
        exp: "วิธีทำ: จาก (x + 1/x)³ = x³ + 3(x)(1/x)(x + 1/x) + 1/x³ -> 3³ = x³ + 3(3) + 1/x³ -> 27 = x³ + 9 + 1/x³ ดังนั้น x³ + 1/x³ = 18"
    },
    {
        category: "ระบบสมการขั้นสูง",
        sentence: "ถ้า x และ y เป็นจำนวนจริงที่สอดคล้องกับระบบสมการ x² + y² = 25 และ xy = 12 แล้วค่าของ |x - y| มีค่าเท่าใด?",
        ans: "1",
        options: ["1", "5", "7", "12"],
        exp: "วิธีทำ: จาก (x - y)² = x² + y² - 2xy = 25 - 2(12) = 25 - 24 = 1 ดังนั้น |x - y| = √1 = 1"
    },
    {
        category: "ฟังก์ชันและพาราโบลา",
        sentence: "กราฟของพาราโบลา y = -x² + 6x - 8 ตัดแกน X ที่จุด A และ B ระยะห่างระหว่างจุด A และ B ยาวเท่ากับกี่หน่วย?",
        ans: "2 หน่วย",
        options: ["2 หน่วย", "4 หน่วย", "6 หน่วย", "8 หน่วย"],
        exp: "วิธีทำ: หาจุดตัดแกน X โดยให้ y = 0 -> -x² + 6x - 8 = 0 -> x² - 6x + 8 = 0 -> (x - 2)(x - 4) = 0 จะได้ x = 2 และ 4 ระยะห่างคือ |4 - 2| = 2 หน่วย"
    },
    {
        category: "เรขาคณิตและวงกลม",
        sentence: "วงกลมวงหนึ่งมีคอร์ด 2 เส้นยาวเท่ากันคือ 10 เซนติเมตร และอยู่ห่างจากจุดศูนย์กลางเท่ากัน ถ้าวงกลมนี้มีรัศมี 13 เซนติเมตร คอร์ดทั้งสองเส้นจะอยู่ห่างจากจุดศูนย์กลางกี่เซนติเมตร?",
        ans: "12 เซนติเมตร",
        options: ["12 เซนติเมตร", "5 เซนติเมตร", "8 เซนติเมตร", "10 เซนติเมตร"],
        exp: "วิธีทำ: ลากรัศมีตั้งฉากกับคอร์ด จะแบ่งครึ่งคอร์ดเป็นเส้นละ 5 ซม. ใช้ปีทาโกรัสหาระยะห่าง d = √(13² - 5²) = √(169 - 25) = √144 = 12 ซม."
    },
    {
        category: "ตรีโกณมิติประยุกต์",
        sentence: "ชายคนหนึ่งยืนมองยอดเสาธงด้วยมุมเงย 30 องศา เดินเข้าไปใกล้เสาธงอีก 20 เมตร ปรากฏว่ามองเห็นยอดเสาธงด้วยมุมเงย 60 องศา เสาธงนี้สูงประมาณกี่เมตร (กำหนด √3 ≈ 1.732)",
        ans: "17.32 เมตร",
        options: ["17.32 เมตร", "10.00 เมตร", "34.64 เมตร", "20.00 เมตร"],
        exp: "วิธีทำ: ใช้สูตรความสูง h = d / (cot(30°) - cot(60°)) = 20 / (√3 - 1/√3) = 20 / (2/√3) = 10√3 ≈ 17.32 เมตร"
    },
    {
        category: "ความน่าจะเป็นระดับแข่งขัน",
        sentence: "สุ่มหยิบลูกบอล 2 ลูกพร้อมกันจากกล่องที่มีลูกบอลสีแดง 3 ลูก และลูกสีฟ้า 2 ลูก ความน่าจะเป็นที่จะได้ลูกบอลต่างสีกันมีค่าเท่าใด?",
        ans: "3/5",
        options: ["3/5", "2/5", "3/10", "7/10"],
        exp: "วิธีทำ: จำนวนวิธีทั้งหมดเลือก 2 จาก 5 คือ C(5,2) = 10 วิธี, วิธีได้ต่างสี (แดง 1 ฟ้า 1) คือ C(3,1) × C(2,1) = 3 × 2 = 6 วิธี ความน่าจะเป็น = 6/10 = 3/5"
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
        questionQueue = shuffleArray([...mathEntranceDatabase]);
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
        fb.innerHTML = `🎉 <b>ยอดเยี่ยมมาก ผ่านฉลุย!</b><br>${currentExplanation}`;
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