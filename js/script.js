function calculateResult() {
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('quizResult');

    let score = 0;
    let totalQuestions = 3;

    for (let i = 1; i <= totalQuestions; i++) {
        const answer = form.querySelector(`input[name="q${i}"]:checked`);
        if (answer) score += parseInt(answer.value);
    }

    // Si aucune réponse
    if (score === 0) {
        resultDiv.textContent = "🧐 Répondez à toutes les questions pour voir votre résultat !";
        resultDiv.style.display = "block";
        resultDiv.className = "quiz-result faible";
        return;
    }

    // Résultat selon score
    if (score >= 8) {
        resultDiv.textContent = "🔥Ouiiiiiiiii,vous êtes un vrai passionné du développement web !";
        resultDiv.className = "quiz-result passionne";
    } else if (score >= 5) {
        resultDiv.textContent = "💡 Bof,vous aimez le développement web, mais gros doute hein !";
        resultDiv.className = "quiz-result moyen";
    } else {
        resultDiv.textContent = "😅 Pardon, vous vous êtes trompé de formation";
    }

    resultDiv.style.display = "block";
}