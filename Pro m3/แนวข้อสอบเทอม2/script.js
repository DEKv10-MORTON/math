const mathM3Term2Database = [
    {
        category: "ระบบสมการเชิงเส้นสองตัวแปร",
        sentence: "กำหนดให้ระบบสมการ x + y = 7 และ x - y = 3 ค่าของ x และ y ตรงกับข้อใด?",
        ans: "x = 5, y = 2",
        options: ["x = 5, y = 2", "x = 4, y = 3", "x = 6, y = 1", "x = 5, y = -2"],
        exp: "วิธีทำ: นำสองสมการมาบวกกันจะได้ 2x = 10 -> x = 5 แล้วแทนค่าจะได้ y = 2"
    },
    {
        category: "วงกลม (มุมในส่วนโค้งของวงกลม)",
        sentence: "ถ้ามุมที่จุดศูนย์กลางของวงกลมรองรับด้วยส่วนโค้งยาวเท่ากับมุมที่รองรับที่ส่วนโค้งของวงกลม มุมที่จุดศูนย์กลางจะมีขนาดเป็นกี่เท่าของมุมในส่วนโค้งของวงกลม?",
        ans: "2 เท่า",
        options: ["2 เท่า", "1 เท่า", "1.5 เท่า", "3 เท่า"],
        exp: "ทฤษฎีบท: มุมที่จุดศูนย์กลางของวงกลมจะมีขนาดเป็นสองเท่าของขนาดของมุมในส่วนโค้งของวงกลมที่รองรับด้วยส่วนโค้งเดียวกัน"
    },
    {
        category: "พีระมิด กรวย และทรงกลม",
        sentence: "กรวยกลมมีรัศมีฐาน 3 เซนติเมตร และสูงตรง 4 เซนติเมตร จะมีปริมาตรเท่าใด (กำหนดให้ π ≈ 3.14)",
        ans: "37.68 ลูกบาศก์เซนติเมตร",
        options: ["37.68 ลูกบาศก์เซนติเมตร", "113.04 ลูกบาศก์เซนติเมตร", "75.36 ลูกบาศก์เซนติเมตร", "28.26 ลูกบาศก์เซนติเมตร"],
        exp: "สูตรปริมาตรกรวย = (1/3)πr²h = (1/3) × 3.14 × 3² × 4 = 37.68 ลบ.ซม."
    },
    {
        category: "ความน่าจะเป็น",
        sentence: "ทอดลูกเต๋าเที่ยงตรง 1 ลูก 1 ครั้ง ความน่าจะเป็นที่จะได้แต้มที่เป็นจำนวนคู่มีค่าเท่าใด?",
        ans: "1/2",
        options: ["1/2", "1/3", "1/6", "2/3"],
        exp: "แต้มคู่บนลูกเต๋าคือ 2, 4, 6 มี 3 เหตุการณ์จากทั้งหมด 6 เหตุการณ์ (3/6 = 1/2)"
    },
    {
        category: "อัตราส่วนตรีโกณมิติ",
        sentence: "ในสามเหลี่ยมมุมฉาก ถ้า sin A = 3/5 แล้ว cos A มีค่าเท่าใด?",
        ans: "4/5",
        options: ["4/5", "3/4", "5/3", "3/5"],
        exp: "จากความสัมพันธ์ sin²A + cos²A = 1 จะได้ cos A = √(1 - (3/5)²) = √(16/25) = 4/5"
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
        questionQueue = shuffleArray([...mathM3Term2Database]);
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