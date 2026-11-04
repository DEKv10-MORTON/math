const mathM2Term2Database = [
    {
        category: "สถิติ (ตอนที่ 2)",
        sentence: "ในการสำรวจความชอบของนักเรียน 360 คน แสดงด้วยแผนภูมิรูปวงกลม พบว่ามุมที่จุดศูนย์กลางของส่วนที่ชอบกีฬาฟุตบอลเท่ากับ 90° จะมีนักเรียนที่ชอบกีฬาฟุตบอลจำนวนกี่คน?",
        ans: "90 คน",
        options: ["90 คน", "120 คน", "60 คน", "180 คน"],
        exp: "วิธีทำ: จากมุมรอบจุดศูนย์กลาง 360° คิดเป็นนักเรียน 360 คน (1° = 1 คน) ดังนั้น 90° จึงเท่ากับ 90 คน[cite: 10]"
    },
    {
        category: "ความเท่ากันทุกประการ",
        sentence: "เงื่อนไขความเท่ากันทุกประการของรูปสามเหลี่ยมในข้อใด ที่กล่าวถึงด้าน 2 ด้าน และมุมในระหว่างด้านคู่ที่ยาวเท่ากันมีขนาดเท่ากัน?",
        ans: "ด้าน - มุม - ด้าน (d-m-d)",
        options: ["ด้าน - มุม - ด้าน (d-m-d)", "มุม - ด้าน - มุม (m-d-m)", "ด้าน - ด้าน - ด้าน (d-d-d)", "ฉาก - ด้าน - ด้าน (ฉ-ד-ד)"],
        exp: "นิยาม: ความเท่ากันทุกประการแบบ ด้าน-มุม-ด้าน (SAS) หมายถึง มีด้านยาวเท่ากัน 2 คู่ และมุมในระหว่างด้านคู่ที่ยาวเท่ากันมีขนาดเท่ากัน[cite: 10]"
    },
    {
        category: "เส้นขนาน",
        sentence: "ถ้าเส้นตรงสองเส้นขนานกันและมีเส้นตัด แล้วขนาดของ 'มุมแย้ง' ที่เกิดขึ้นจะมีสมบัติอย่างไร?",
        ans: "มีขนาดเท่ากันเสมอ",
        options: ["มีขนาดเท่ากันเสมอ", "รวมกันได้ 90 องศา", "รวมกันได้ 180 องศา", "ไม่เท่ากัน"],
        exp: "สมบัติของเส้นขนาน: ถ้าเส้นตรงเส้นหนึ่งตัดเส้นตรงคู่หนึ่ง เส้นตรงคู่นั้นขนานกันก็ต่อเมื่อมุมแย้งมีขนาดเท่ากัน[cite: 10]"
    },
    {
        category: "การให้เหตุผลทางเรขาคณิต",
        sentence: "ข้อความคาดการณ์ (Conjecture) ในทางเรขาคณิต จะได้รับการยอมรับว่าเป็น 'ทฤษฎีบท' ได้ก็ต่อเมื่อผ่านกระบวนการใด?",
        ans: "การพิสูจน์อย่างเป็นขั้นตอนโดยใช้สมบัติทางเรขาคณิต",
        options: ["การพิสูจน์อย่างเป็นขั้นตอนโดยใช้สมบัติทางเรขาคณิต", "การวาดรูปให้ดูสวยงามและสมจริง", "การวัดด้วยไม้บรรทัดหลายๆ ครั้ง", "การลงความเห็นจากคนส่วนใหญ่"],
        exp: "หลักการ: ข้อความคาดการณ์ต้องได้รับการพิสูจน์ (Proof) ว่าเป็นจริงทั่วไปโดยอาศัยคำนิยาม สัจพจน์ หรือทฤษฎีบทอื่นที่อ้างอิงได้[cite: 10]"
    },
    {
        category: "การแยกตัวประกอบของพหุนามดีกรีสอง",
        sentence: "พหุนาม x² - 9 แยกตัวประกอบได้ตรงกับข้อใด?",
        ans: "(x - 3)(x + 3)",
        options: ["(x - 3)(x + 3)", "(x - 3)(x - 3)", "(x + 3)(x + 3)", "(x - 9)(x + 1)"],
        exp: "สูตรผลต่างกำลังสาม/สอง: A² - B² = (A - B)(A + B) จะได้ x² - 3² = (x - 3)(x + 3)[cite: 10]"
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
        questionQueue = shuffleArray([...mathM2Term2Database]);
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