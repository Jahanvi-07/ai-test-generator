const quiz = JSON.parse(localStorage.getItem("quizData"));
const userAns = JSON.parse(localStorage.getItem("userAnswers"));

let score = 0;
let detailsHTML = "";

quiz.forEach((q, i) => {
    let isCorrect = (userAns[i].toLowerCase() === q.answer.toLowerCase());
    if (isCorrect) score++;

    detailsHTML += `
        <p>
            <b>Q${i + 1}:</b> ${q.question}<br>
            <span class="${isCorrect ? 'correct' : 'wrong'}">
                Your answer: ${userAns[i]} 
            </span><br>
            Correct answer: <b>${q.answer}</b>
        </p>
        <hr>
    `;
});

document.getElementById("scoreBox").innerHTML =
    `<h2>Score: ${score} / ${quiz.length}</h2>`;

document.getElementById("details").innerHTML = detailsHTML;
