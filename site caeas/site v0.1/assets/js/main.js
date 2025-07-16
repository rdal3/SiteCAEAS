// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Implementa a rolagem suave para links de âncora
    // Isso faz com que, ao clicar em links como "Sugestões/SAC" no menu,
    // a página role suavemente até a seção, em vez de pular.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do link (pular)

            // Rola a viewport suavemente até o elemento alvo do link
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Define o comportamento de rolagem como suave
                });
            }
        });
    });

    // Lógica para o carrossel de membros
    const carouselContainer = document.getElementById('member-carousel-container');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    // Verifica se todos os elementos do carrossel existem antes de adicionar a lógica
    if (carouselContainer && prevBtn && nextBtn) {
        const scrollAmount = 250; // Quantidade de pixels para rolar por clique

        // Função para atualizar o estado dos botões (habilitado/desabilitado)
        const updateButtonState = () => {
            // Desabilita o botão 'anterior' se estiver no início da rolagem
            prevBtn.disabled = Math.round(carouselContainer.scrollLeft) === 0;
            // Desabilita o botão 'próximo' se estiver no final da rolagem
            nextBtn.disabled = Math.round(carouselContainer.scrollLeft + carouselContainer.clientWidth) >= carouselContainer.scrollWidth;
        };

        // Event listener para o botão 'próximo'
        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Event listener para o botão 'anterior'
        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Atualiza o estado dos botões ao rolar o carrossel (manual ou via botões)
        carouselContainer.addEventListener('scroll', updateButtonState);
        // Atualiza o estado dos botões quando a janela é redimensionada
        window.addEventListener('resize', updateButtonState);

        // Define o estado inicial dos botões no carregamento da página
        updateButtonState();
    }

    // --- NOVO: Lógica para animação de fade-in ao rolar ---
    const sections = document.querySelectorAll('.fade-in-section');

    // Verifica se o navegador suporta a API IntersectionObserver
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se a seção está visível na tela (intersecting)
                if (entry.isIntersecting) {
                    // Adiciona a classe que ativa a animação CSS
                    entry.target.classList.add('is-visible');
                    // Para de observar a seção para não animar novamente
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.15 // A animação começa quando 15% da seção está visível
        });

        // Itera sobre todas as seções e começa a observá-las
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    console.log("main.js carregado com todas as funcionalidades modernas!");
});
