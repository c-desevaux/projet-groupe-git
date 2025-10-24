function checkSkills() {
    const form = document.getElementById('skillsQuiz');
    const resultDiv = document.getElementById('skillsResult');

    let score = 0;
    const total = 5;

    for (let i = 1; i <= total; i++) {
        const answer = form.querySelector(`input[name="q${i}"]:checked`);
        if (answer) score += parseInt(answer.value);
    }

    if (score === 0) {
        resultDiv.textContent = "🧐 Répondez à toutes les questions avant de voir votre résultat !";
        resultDiv.className = "quiz-result debutant";
        resultDiv.style.display = "block";
        return;
    }

    if (score >= 13) {
        resultDiv.textContent = "🔥 Ouiiiiiiiiiii, vous avez les compétences ! Bravo 👏";
        resultDiv.className = "quiz-result expert";
    } else if (score >= 8) {
        resultDiv.textContent = "💡 Continuez à pratiquer !";
        resultDiv.className = "quiz-result intermediaire";
    } else {
        resultDiv.textContent = "😅 Heum, suivez mieux vos cours !";
        resultDiv.className = "quiz-result debutant";
    }

    resultDiv.style.display = "block";
}