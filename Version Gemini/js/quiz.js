const questions = [
    {
        q: "Quelle est la durée de vie recommandée pour un Toggle de Livraison ?",
        options: [
            { text: "Indéfinie", correct: false },
            { text: "Temporaire (jusqu'à la fin du déploiement)", correct: true },
            { text: "Minimum 2 ans", correct: false }
        ]
    },
    {
        q: "Où doit-on répertorier tout nouveau Feature Flag chez Desjardins ?",
        options: [
            { text: "Dans un fichier Excel partagé", correct: false },
            { text: "Dans le Catalogue Central de Toggles", correct: true },
            { text: "Nulle part, LD s'en occupe", correct: false }
        ]
    },
    {
        q: "Quel processus garantit la conformité SOC2 lors d'un changement de flag ?",
        options: [
            { text: "L'approbation orale du gestionnaire", correct: false },
            { text: "La PR automatique et l'approbation par un tiers", correct: true },
            { text: "L'envoi d'un courriel à la sécurité", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const quizContent = document.getElementById('quizContent');
    const resultDiv = document.getElementById('quizResult');
    const nextBtn = document.getElementById('nextQuestionBtn');
    
    resultDiv.textContent = '';
    nextBtn.style.display = 'none';
    
    const question = questions[currentQuestionIndex];
    
    let html = `<div class="question">${question.q}</div><div class="options">`;
    question.options.forEach((opt, index) => {
        html += `<div class="option" onclick="checkAnswer(${index}, ${opt.correct})">${opt.text}</div>`;
    });
    html += `</div>`;
    
    quizContent.innerHTML = html;
}

window.checkAnswer = (index, isCorrect) => {
    const options = document.querySelectorAll('.option');
    const resultDiv = document.getElementById('quizResult');
    const nextBtn = document.getElementById('nextQuestionBtn');
    
    // Prevent multiple clicks
    if (resultDiv.textContent !== '') return;

    options[index].classList.add(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
        score++;
        resultDiv.textContent = "Bonne réponse !";
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = "Mauvaise réponse.";
        resultDiv.style.color = "red";
        // Show the correct one
        questions[currentQuestionIndex].options.forEach((opt, i) => {
            if (opt.correct) options[i].classList.add('correct');
        });
    }
    
    nextBtn.style.display = 'inline-block';
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Voir le score final";
    }
};

document.getElementById('nextQuestionBtn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    const quizContent = document.getElementById('quizContent');
    const resultDiv = document.getElementById('quizResult');
    const nextBtn = document.getElementById('nextQuestionBtn');
    
    quizContent.innerHTML = `<h3>Quiz terminé !</h3>`;
    resultDiv.textContent = `Votre score : ${score} / ${questions.length}`;
    resultDiv.style.color = "var(--desjardins-blue)";
    nextBtn.style.display = 'none';
    
    const restartBtn = document.createElement('button');
    restartBtn.textContent = "Recommencer le quiz";
    restartBtn.className = "btn";
    restartBtn.onclick = () => location.reload();
    quizContent.appendChild(restartBtn);
}

document.addEventListener('DOMContentLoaded', loadQuestion);
