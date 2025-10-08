document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZAR ANIMACIONES AL SCROLL ---
    AOS.init({
        duration: 800, // Duración de la animación
        once: true,    // La animación ocurre solo una vez
        offset: 50,    // Se activa 50px antes de que el elemento sea visible
    });

    // --- LÓGICA PARA LAS VENTANAS MODALES ---
    const teacherModal = document.getElementById('teacher-modal');
    const studentModal = document.getElementById('student-modal');
    const openTeacherModalBtn = document.getElementById('open-teacher-modal');
    const openStudentModalBtn = document.getElementById('open-student-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    const openModal = (modal) => modal && modal.classList.add('active');
    const closeModal = (modal) => modal && modal.classList.remove('active');

    openTeacherModalBtn.addEventListener('click', () => openModal(teacherModal));
    openStudentModalBtn.addEventListener('click', () => openModal(studentModal));

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(teacherModal);
            closeModal(studentModal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === teacherModal) closeModal(teacherModal);
        if (event.target === studentModal) closeModal(studentModal);
    });

    // --- LÓGICA DE LA PRUEBA INTERACTIVA CON TABS ---
    const subjectTabs = document.querySelectorAll('.subject-tab');
    const questionCards = document.querySelectorAll('.question-card');

    subjectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            subjectTabs.forEach(t => t.classList.remove('active'));
            questionCards.forEach(card => card.classList.remove('active'));
            
            tab.classList.add('active');
            const subject = tab.dataset.subject;
            const activeQuestionCard = document.getElementById(`${subject}-q`);
            if (activeQuestionCard) {
                activeQuestionCard.classList.add('active');
            }
        });
    });

    // --- LÓGICA DE VALIDACIÓN DE PREGUNTAS ---
    const questionForms = document.querySelectorAll('.question-form');
    questionForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedbackEl = form.querySelector('.feedback');
            const selectedOption = form.querySelector('input[type="radio"]:checked');

            if (!selectedOption) {
                feedbackEl.textContent = '⚠️ Por favor, selecciona una opción.';
                feedbackEl.className = 'feedback wrong';
                feedbackEl.style.display = 'block';
                return;
            }

            const isCorrect = selectedOption.value === form.dataset.correct;
            let feedbackText = '';

            // Retroalimentación personalizada y más compleja
            if (form.querySelector('input[name="q1"]')) { // Español
                feedbackText = isCorrect ? 
                    '¡Correcto! La metáfora establece que, al igual que un faro, el amor es una guía firme y perpetua que no se ve afectada por las "tempestades" o problemas de la vida.' :
                    'Incorrecto. La respuesta correcta es la C. El faro no simboliza soledad ni artificialidad, sino constancia y guía frente a los desafíos.';
            } else if (form.querySelector('input[name="q2"]')) { // Ciencias Naturales
                feedbackText = isCorrect ?
                    '¡Excelente! El RER está cubierto de ribosomas, que son los sitios de síntesis de proteínas destinadas a la secreción, haciéndolo crucial para la exportación.' :
                    'Incorrecto. La respuesta es la B. Mientras las mitocondrias producen energía y el REL lípidos, el RER es el especialista en procesar proteínas para exportar.';
            } else if (form.querySelector('input[name="q3"]')) { // Ciencias Sociales
                feedbackText = isCorrect ?
                    '¡Muy bien! La división del mundo en dos bloques, uno capitalista (OTAN) y otro comunista (Pacto de Varsovia), fue una de las consecuencias más directas y definitorias de la Guerra Fría.' :
                    'Incorrecto. La respuesta es la D. La unificación alemana ocurrió al final, no al principio; y la descolonización fue un proceso complejo y a menudo violento, no pacífico.';
            }

            feedbackEl.className = isCorrect ? 'feedback correct' : 'feedback wrong';
            feedbackEl.textContent = feedbackText;
            feedbackEl.style.display = 'block';
        });
    });
});