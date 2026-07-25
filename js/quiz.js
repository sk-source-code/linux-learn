document.addEventListener('DOMContentLoaded', () => {
    // The quiz relies on `searchIndex` global from content.js
    if (typeof searchIndex === 'undefined') return;

    const setupView = document.getElementById('quiz-setup');
    const activeView = document.getElementById('quiz-active');
    const resultsView = document.getElementById('quiz-results');
    
    const startBtn = document.getElementById('start-quiz-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const restartBtn = document.getElementById('restart-quiz-btn');
    
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const progressEl = document.getElementById('quiz-progress');
    const scoreEl = document.getElementById('quiz-score');
    const finalScoreEl = document.getElementById('final-score');
    const messageEl = document.getElementById('quiz-message');

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const TOTAL_QUESTIONS = 5;

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Generate a pool of 5 random questions
    function generateQuestions() {
        const questions = [];
        const cmds = searchIndex.filter(c => c.description && c.name);
        
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            // Pick a random correct command
            const correctCmd = getRandomItem(cmds);
            
            // Generate options (1 correct, 3 wrong)
            const options = [correctCmd.name];
            while (options.length < 4) {
                const wrongCmd = getRandomItem(cmds);
                if (!options.includes(wrongCmd.name)) {
                    options.push(wrongCmd.name);
                }
            }
            
            // Shuffle options
            options.sort(() => Math.random() - 0.5);
            
            questions.push({
                text: `Which command is used to: "${correctCmd.description}"?`,
                options: options,
                answer: correctCmd.name
            });
        }
        return questions;
    }

    function renderQuestion() {
        const q = currentQuestions[currentQuestionIndex];
        
        progressEl.textContent = `Question ${currentQuestionIndex + 1} / ${TOTAL_QUESTIONS}`;
        scoreEl.textContent = `Score: ${score}`;
        questionEl.textContent = q.text;
        feedbackEl.style.display = 'none';
        nextBtn.style.display = 'none';
        
        // Clear previous options
        optionsEl.innerHTML = '';
        
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleOptionClick(btn, opt, q.answer));
            optionsEl.appendChild(btn);
        });
    }

    function handleOptionClick(clickedBtn, selectedOpt, correctOpt) {
        // Disable all buttons
        const allBtns = optionsEl.querySelectorAll('.quiz-option-btn');
        allBtns.forEach(b => b.disabled = true);
        
        feedbackEl.style.display = 'block';
        
        if (selectedOpt === correctOpt) {
            clickedBtn.classList.add('correct');
            feedbackEl.textContent = 'Correct! ✅';
            feedbackEl.style.color = '#27c93f';
            score++;
            scoreEl.textContent = `Score: ${score}`;
        } else {
            clickedBtn.classList.add('incorrect');
            feedbackEl.textContent = `Incorrect! ❌ The correct answer was: ${correctOpt}`;
            feedbackEl.style.color = '#ff5f56';
            
            // Highlight the correct one
            allBtns.forEach(b => {
                if (b.textContent === correctOpt) b.classList.add('correct');
            });
        }
        
        // Show Next button
        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
            nextBtn.textContent = 'Next Question';
        } else {
            nextBtn.textContent = 'See Results';
        }
        nextBtn.style.display = 'inline-block';
    }

    function showResults() {
        activeView.style.display = 'none';
        resultsView.style.display = 'block';
        
        finalScoreEl.textContent = `${score} / ${TOTAL_QUESTIONS}`;
        if (score === TOTAL_QUESTIONS) {
            messageEl.textContent = 'Perfect! You are a Linux Guru! 🐧';
        } else if (score >= 3) {
            messageEl.textContent = 'Good job! Keep practicing.';
        } else {
            messageEl.textContent = 'Time to review the manual! (man linux)';
        }
    }

    // Event Listeners
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            currentQuestions = generateQuestions();
            currentQuestionIndex = 0;
            score = 0;
            
            setupView.style.display = 'none';
            resultsView.style.display = 'none';
            activeView.style.display = 'block';
            
            renderQuestion();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < TOTAL_QUESTIONS) {
                renderQuestion();
            } else {
                showResults();
            }
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            startBtn.click();
        });
    }
});
