const quizData = JSON.parse(localStorage.getItem("quizData"));
const quizForm = document.getElementById("quizForm");

quizData.forEach((q, index) => {
    let div = document.createElement("div");
    div.className = "question";

    if (q.type === "mcq") {
        div.innerHTML = `
            <p><b>Q${index + 1}:</b> ${q.question}</p>
            ${q.options.map(opt => `
                <label>
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label><br>
            `).join("")}
        `;
    } else {
        div.innerHTML = `
            <p><b>Q${index + 1}:</b> ${q.question}</p>
            <input type="text" name="q${index}" placeholder="Your answer">
        `;
    }

    quizForm.appendChild(div);
});

function submitQuiz() {
    let userAnswers = [];

    quizData.forEach((q, i) => {
        let ans = document.querySelector(`input[name="q${i}"]:checked`) ||
                  document.querySelector(`input[name="q${i}"]`);
        userAnswers.push(ans ? ans.value.trim() : "");
    });

    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    window.location.href = "result.html";
}
