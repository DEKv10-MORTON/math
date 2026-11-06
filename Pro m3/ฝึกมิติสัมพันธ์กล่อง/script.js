const boxQuizDatabase = [
    {
        q: "จากภาพคลี่ของลูกเต๋าที่มีสัญลักษณ์บนแต่ละหน้า จงหาว่าหน้าตรงข้าม (Opposite Face) ของสัญลักษณ์ <b>'★'</b> คือสัญลักษณ์ใด?",
        net: [
            ['', '★', '', ''],
            ['▲', '●', '■', '◆'],
            ['', '♥', '', '']
        ],
        activeCells: [[0,1], [1,0], [1,1], [1,2], [1,3], [2,1]], // ตำแหน่งรูปกากบาท/ไม้กางเขน
        ans: "♥",
        options: ["♥", "▲", "■", "◆"],
        exp: "<b>เทคนิคการมองภาพคลี่ไม้กางเขน:</b> ในแถวหรือคอลัมน์เดียวกัน ช่องที่เว้นระยะ 1 ช่อง (กระโดดข้าม 1 ช่อง) จะเป็นหน้าตรงข้ามกันเสมอ ในที่นี้ ★ อยู่แถวบนสุดเว้น 1 ช่องจะตรงข้ามกับ ♥ พอดีเมื่อพับเป็นกล่อง"
    },
    {
        q: "กำหนดให้ภาพคลี่ของกล่องมีตัวอักษร A, B, C, D, E, F อยู่แต่ละด้าน หน้าที่อยู่ตรงข้ามกับตัวอักษร <b>'A'</b> คือข้อใด?",
        net: [
            ['A', '', '', ''],
            ['B', 'C', 'D', 'E'],
            ['', 'F', '', '']
        ],
        activeCells: [[0,0], [1,0], [1,1], [1,2], [1,3], [2,1]],
        ans: "D",
        options: ["D", "C", "E", "F"],
        exp: "<b>เทคนิคการพับแถวยาว:</b> หากเรียงต่อกัน 4 หน้า (B, C, D, E) หน้าที่เว้นระยะห่างกัน 1 ช่องจะอยู่ตรงข้ามกัน (B ตรงข้าม D, C ตรงข้าม E) ส่วน A ที่อยู่ริมสุดจะพับไปตรงข้ามกับ D พอดี"
    },
    {
        q: "หากนำภาพคลี่นี้มาประกอบเป็นลูกเต๋า หน้าที่อยู่ตรงข้ามกับเลข <b>'2'</b> คือเลขใด?",
        net: [
            ['', '', '1', ''],
            ['2', '3', '4', '5'],
            ['', '', '6', '']
        ],
        activeCells: [[0,2], [1,0], [1,1], [1,2], [1,3], [2,2]],
        ans: "4",
        options: ["4", "3", "5", "6"],
        exp: "<b>วิธีสังเกต:</b> ในแถวแนวนอน (2, 3, 4, 5) เลข 2 อยู่ริมซ้ายสุด เมื่อพับโอบรอบกล่องสี่เหลี่ยม เลข 2 จะไปประกบอยู่ตรงข้ามกับเลข 4 พอดี"
    }
];

let currentQuestion = null;
let currentSolutionHTML = "";

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateNewProblem() {
    document.getElementById('feedback').innerText = '';
    document.getElementById('solutionBox').style.display = 'none';
    document.getElementById('btnSolution').style.display = 'none';

    // สุ่มโจทย์
    let qIndex = Math.floor(Math.random() * boxQuizDatabase.length);
    currentQuestion = boxQuizDatabase[qIndex];
    currentSolutionHTML = currentQuestion.exp;

    document.getElementById('questionText').innerHTML = currentQuestion.q;

    // Render ตารางภาพคลี่ (Net Visual)
    let netContainer = document.getElementById('netVisual');
    netContainer.innerHTML = '';
    
    currentQuestion.net.forEach((row, rIdx) => {
        row.forEach((cellVal, cIdx) => {
            let cell = document.createElement('div');
            cell.className = 'net-cell';
            if (cellVal !== '') cell.classList.add('active');
            cell.innerHTML = cellVal;
            netContainer.appendChild(cell);
        });
    });

    // Render ตัวเลือก
    let optContainer = document.getElementById('optionsContainer');
    optContainer.innerHTML = '';

    let shuffledOpts = shuffleArray([...currentQuestion.options]);
    shuffledOpts.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt;
        btn.onclick = () => checkAns(btn, opt, currentQuestion.ans);
        optContainer.appendChild(btn);
    });
}

function checkAns(button, selected, correct) {
    let feedback = document.getElementById('feedback');
    let allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (selected === correct) {
        button.classList.add('correct');
        feedback.style.color = 'var(--success)';
        feedback.innerText = '🎉 ถูกต้องเก่งมาก! มิติสัมพันธ์ยอดเยี่ยม!';
    } else {
        button.classList.add('incorrect');
        feedback.style.color = 'var(--danger)';
        feedback.innerText = '❌ ยังไม่ถูกต้อง ดูวิธีคิดจากเฉลยด้านล่างได้เลยครับ';
        allBtns.forEach(b => {
            if (b.innerHTML === correct) b.classList.add('correct');
        });
    }

    document.getElementById('btnSolution').style.display = 'inline-block';
}

function toggleSolution() {
    let box = document.getElementById('solutionBox');
    let solText = document.getElementById('solutionText');
    
    if (box.style.display === 'block') {
        box.style.display = 'none';
    } else {
        solText.innerHTML = currentSolutionHTML;
        box.style.display = 'block';
    }
}

// เริ่มต้นรันข้อแรกเมื่อโหลดเว็บ
generateNewProblem();