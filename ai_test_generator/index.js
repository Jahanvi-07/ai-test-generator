// Read PDF text
async function extractPDFText(file) {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(i => i.str).join(" ") + " ";
    }
    return fullText;
}

// Simple NLP-based question generation
function generateQuestions(text, qCount, type) {
    const sentences = text.split(".").filter(s => s.trim().length > 40);
    let questions = [];

    for (let i = 0; i < qCount && i < sentences.length; i++) {
        let s = sentences[i].trim();
        
        if (type === "mcq" || (type === "mix" && i % 2 === 0)) {
            let words = s.split(" ");
            let answer = words[words.length - 1];
            let opts = [answer, "OptionA", "OptionB", "OptionC"];

            questions.push({
                type: "mcq",
                question: s,
                options: opts.sort(() => Math.random() - 0.5),
                answer: answer
            });
        } 
        else {
            let words = s.split(" ");
            let idx = Math.floor(words.length / 2);
            let answer = words[idx];
            words[idx] = "_____";

            questions.push({
                type: "cloze",
                question: words.join(" "),
                answer: answer
            });
        }
    }
    return questions;
}

async function generateQuiz() {
    let text = document.getElementById("inputText").value;
    let pdfFile = document.getElementById("pdfFile").files[0];

    if (pdfFile) {
        text = await extractPDFText(pdfFile);
    }

    if (text.trim().length < 20) {
        alert("Please provide text or upload PDF.");
        return;
    }

    const qCount = parseInt(document.getElementById("qCount").value);
    const qType = document.getElementById("qType").value;

    const questions = generateQuestions(text, qCount, qType);

    localStorage.setItem("quizData", JSON.stringify(questions));
    window.location.href = "quiz.html";
}
