document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    // Configura tu Form ID de Formspree aquí
    // Regístrate en https://formspree.io y crea un nuevo formulario para obtener tu ID
    const FORMSPREE_ID = 'xbdagorj';

    console.log('Contact script loaded. Form ID:', FORMSPREE_ID);

    if (contactForm) {
        console.log('Contact form found, attaching listener');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Estado de carga
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            submitButton.disabled = true;

            // Recoger datos
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Éxito
                    Swal.fire({
                        title: '¡Mensaje Enviado!',
                        html: `
                            <p style="margin-bottom: 10px;">Gracias por contactarme <span style="color: #6366f1; font-weight: 600;">${formData.get('nombre')}</span>.</p>
                            <p>He recibido tu correo y te responderé lo antes posible.</p>
                        `,
                        icon: 'success',
                        confirmButtonText: '¡Genial!',
                        buttonsStyling: true,
                        showClass: {
                            popup: 'animate__animated animate__fadeInUp'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutDown'
                        }
                    });
                    contactForm.reset();

                    // Cerrar modal después de 2 segundos si está abierto
                    setTimeout(() => {
                        const modal = document.querySelector('.modal.active');
                        if (modal) {
                            modal.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }, 2000);
                } else {
                    // Error del servidor
                    const data = await response.json();
                    throw new Error(data.error || 'Error al enviar el formulario');
                }
            } catch (error) {
                // Error de red o código
                Swal.fire({
                    title: '¡Ups!',
                    text: 'Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.',
                    icon: 'error',
                    background: '#1a1a2e',
                    color: '#fff',
                    confirmButtonColor: '#ef4444',
                    confirmButtonText: 'Entendido'
                });
                console.error('Error envío formulario:', error);
            } finally {
                // Restaurar botón
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});
