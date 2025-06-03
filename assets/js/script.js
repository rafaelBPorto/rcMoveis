// Aguarda o DOM carregar antes de executar qualquer script
document.addEventListener('DOMContentLoaded', function() {
  
  // ================================
  // INICIALIZAÇÃO DO AOS (Animate On Scroll)
  // ================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,        // Duração da animação em milissegundos
      easing: "ease-in-out", // Tipo de easing
      once: true,            // Animar apenas uma vez quando aparecer
      offset: 100,           // Offset em pixels para trigger da animação
      delay: 0,              // Delay global
      anchorPlacement: 'top-bottom', // Quando a animação deve começar
      disable: false,        // Condições para desabilitar AOS
      startEvent: 'DOMContentLoaded', // Nome do evento disparado no document
      initClassName: 'aos-init', // Classe aplicada após inicialização
      animatedClassName: 'aos-animate', // Classe aplicada na animação
    });
    console.log('AOS inicializado com sucesso!');
  } else {
    console.warn('AOS não foi carregado. Verifique se a biblioteca está incluída.');
  }

  // ================================
  // SCRIPT PARA ANO ATUAL NO RODAPÉ
  // ================================
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // ================================
  // INICIALIZAÇÃO DOS CARROSSÉIS
  // ================================
  setupCarousel("galleryCarousel");
  setupCarousel("testimonialsCarousel");

  // ================================
  // SMOOTH SCROLL PARA NAVEGAÇÃO
  // ================================
  setupSmoothScroll();

  // ================================
  // MENU MOBILE
  // ================================
  setupMobileMenu();

  // ================================
  // FORMULÁRIO DE CONTATO
  // ================================
  setupContactForm();
});

// ================================
// FUNÇÃO PARA CONFIGURAR CARROSSÉIS
// ================================
function setupCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) {
    console.warn(`Carrossel com ID "${carouselId}" não encontrado.`);
    return;
  }

  const track = carousel.querySelector(".carousel-track");
  const items = Array.from(track.children);
  const nextButton = carousel.querySelector(".carousel-button.next");
  const prevButton = carousel.querySelector(".carousel-button.prev");

  if (!track || items.length === 0 || !nextButton || !prevButton) {
    console.warn(`Elementos do carrossel "${carouselId}" não encontrados.`);
    return;
  }

  let itemWidth;
  let currentIndex = 0;
  let itemsPerPage = 1;

  // Função para calcular quantos itens mostrar por página
  function updateItemsPerPageAndWidth() {
    if (items.length === 0) return;
    
    itemWidth = items[0].getBoundingClientRect().width;

    // Configurações responsivas para diferentes carrosséis
    if (carouselId === "testimonialsCarousel") {
      if (window.innerWidth >= 1024) {
        itemsPerPage = 3; // Desktop: 3 depoimentos
      } else if (window.innerWidth >= 768) {
        itemsPerPage = 2; // Tablet: 2 depoimentos
      } else {
        itemsPerPage = 1; // Mobile: 1 depoimento
      }
    } else if (carouselId === "galleryCarousel") {
      itemsPerPage = 1; // Galeria sempre mostra 1 imagem
    }
  }

  // Função para atualizar posição do carrossel
  function updateCarouselPosition() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  // Função para mostrar slide específico
  function showSlide(index) {
    const maxIndex = Math.max(0, items.length - itemsPerPage);

    if (index > maxIndex) {
      currentIndex = 0; // Volta para o início
    } else if (index < 0) {
      currentIndex = maxIndex; // Vai para o final
    } else {
      currentIndex = index;
    }
    
    updateCarouselPosition();
    
    // Atualizar visibilidade dos botões
    updateButtonStates();
  }

  // Função para atualizar estados dos botões
  function updateButtonStates() {
    if (items.length <= itemsPerPage) {
      // Se tem poucos itens, esconde os botões
      nextButton.style.display = 'none';
      prevButton.style.display = 'none';
    } else {
      nextButton.style.display = 'flex';
      prevButton.style.display = 'flex';
    }
  }

  // Inicializar dimensões
  updateItemsPerPageAndWidth();

  // Event listeners para botões
  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  // Event listener para redimensionamento da janela
  window.addEventListener("resize", () => {
    updateItemsPerPageAndWidth();
    showSlide(currentIndex); // Reajusta posição atual
  });

  // Auto-play para carrossel de depoimentos (opcional)
  if (carouselId === "testimonialsCarousel") {
    let autoPlayInterval;
    
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000); // Muda a cada 5 segundos
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    
    // Pausar auto-play quando hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Iniciar auto-play
    startAutoPlay();
  }

  // Mostrar primeiro slide
  showSlide(0);
  
  console.log(`Carrossel "${carouselId}" inicializado com ${items.length} itens.`);
}

// ================================
// SMOOTH SCROLL PARA NAVEGAÇÃO
// ================================
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Fechar menu mobile se estiver aberto
        closeMobileMenu();
      }
    });
  });
}

// ================================
// MENU MOBILE
// ================================
function setupMobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }
}

// ================================
// FORMULÁRIO DE CONTATO
// ================================
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coletar dados do formulário
      const formData = new FormData(this);
      const nome = formData.get('nome');
      const telefone = formData.get('telefone');
      const email = formData.get('email');
      const servico = formData.get('servico');
      const mensagem = formData.get('mensagem');
      
      // Validação básica
      if (!nome || !telefone || !servico) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Criar mensagem para WhatsApp
      const whatsappMessage = `
🏠 *Solicitação de Orçamento - RC Montador de Móveis*

👤 *Nome:* ${nome}
📱 *Telefone:* ${telefone}
📧 *E-mail:* ${email || 'Não informado'}
🔧 *Serviço:* ${servico}
💬 *Mensagem:* ${mensagem || 'Não informado'}

_Mensagem enviada através do site_
      `.trim();
      
      // Número do WhatsApp (substitua pelo número real)
      const whatsappNumber = '5516999999999'; // Formato: código do país + DDD + número
      
      // Criar URL do WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Limpar formulário
      this.reset();
      
      // Mostrar mensagem de sucesso
      alert('Redirecionando para o WhatsApp...');
    });
  }
}

// ================================
// FUNÇÕES UTILITÁRIAS
// ================================

// Função para animar contadores (se houver)
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Função para lazy loading de imagens (se necessário)
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ================================
// REFRESH DO AOS EM MUDANÇAS DINÂMICAS
// ================================
function refreshAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// ================================
// LOG DE INICIALIZAÇÃO
// ================================
console.log('🚀 RC Montador de Móveis - Scripts carregados com sucesso!');
console.log('📱 Para suporte: contato@rcmontador.com.br');