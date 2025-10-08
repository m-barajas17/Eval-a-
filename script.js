document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE LA PRUEBA INTERACTIVA ---
    const demoForm = document.getElementById('demo-form');
    const feedbackMessage = document.getElementById('feedback-message');
    const resetButton = document.getElementById('reset-button');

    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedOption = demoForm.querySelector('input[name="opt"]:checked');

            if (!selectedOption) {
                feedbackMessage.textContent = '⚠️ Por favor, selecciona una opción.';
                feedbackMessage.className = 'feedback wrong';
                feedbackMessage.style.display = 'block';
                return;
            }

            const isCorrect = selectedOption.value === 'B';

            if (isCorrect) {
                feedbackMessage.innerHTML = '<strong>✅ ¡Correcto!</strong> La respuesta es correcta porque destaca el equilibrio entre tecnología y docencia, que es la intención central del texto.';
                feedbackMessage.className = 'feedback correct';
            } else {
                feedbackMessage.innerHTML = '<strong>❌ Incorrecto.</strong> La respuesta correcta es B, porque Evalúa+ busca integrar la tecnología sin reemplazar al docente, promoviendo un aprendizaje más justo y reflexivo.';
                feedbackMessage.className = 'feedback wrong';
            }
            feedbackMessage.style.display = 'block';
        });
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            demoForm.reset();
            feedbackMessage.style.display = 'none';
        });
    }

    // --- ANIMACIÓN DE SCROLL (FADE-IN) ---
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeIn 1s ${entry.target.dataset.delay || '0s'} forwards ease-out`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach((section, index) => {
        // Añade un pequeño retraso a cada sección para un efecto escalonado
        section.style.animationDelay = `${index * 0.1}s`;
        observer.observe(section);
    });

});