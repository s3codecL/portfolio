// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openContactModal');
    const closeBtn = document.getElementById('closeContactModal');
    const backdrop = modal?.querySelector('.modal__backdrop');

    // Open modal
    openBtn?.addEventListener('click', () => {
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    const closeModal = () => {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle form submission
    const form = modal?.querySelector('.contact__form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ahora solo mostramos un mensaje de éxito
        alert('¡Mensaje enviado! Te responderé pronto.');
        closeModal();
        form.reset();
    });
});
