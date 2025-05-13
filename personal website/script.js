// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    setTimeout(() => {
      loadingProgress.style.width = '100%';
      
      // Hide preloader after loading animation completes
      setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Initialize all animations and interactions once loading is complete
        setTimeout(() => {
          initCursorEffect();
          initScrollAnimations();
          initProjectFilters();
          initContactForm();
          animateProjectCards();
          initBackgroundCanvas();
          
          // Add reveal animations to sections
          revealSections();
        }, 500);
      }, 2500);
    }, 500);
  });
  
  // Reveal sections with animation as they come into view
  function revealSections() {
    const sections = document.querySelectorAll('section');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe each section
    sections.forEach(section => {
      section.classList.add('section-hidden');
      observer.observe(section);
    });
  }
  
  // Custom cursor effect
  function initCursorEffect() {
    const cursor = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .project-card, .skill');
    
    // Move cursor with mouse
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    // Animate cursor when hovering interactive elements
    links.forEach(link => {
      link.addEventListener('mouseenter', function() {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'rgba(255, 101, 132, 0.3)';
      });
      
      link.addEventListener('mouseleave', function() {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.3)';
      });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', function(e) {
      if (e.relatedTarget === null) {
        cursor.style.opacity = '0';
      }
    });
    
    document.addEventListener('mouseover', function() {
      cursor.style.opacity = '1';
    });
  }
  
  // Header and scroll animations
  function initScrollAnimations() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    // Change header style on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Update scroll progress bar
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / scrollHeight) * 100;
      scrollProgressBar.style.width = scrollPercentage + '%';
      
      // Update active nav link based on scroll position with visual indicator
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
          // Add animation to current section
          section.classList.add('section-active');
        } else {
          section.classList.remove('section-active');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
          // Add visual feedback for active link
          const linkRect = link.getBoundingClientRect();
          const navRect = document.querySelector('nav').getBoundingClientRect();
          
          // Create or update the active indicator bubble
          let activeBubble = document.querySelector('.active-nav-bubble');
          if (!activeBubble) {
            activeBubble = document.createElement('div');
            activeBubble.className = 'active-nav-bubble';
            document.body.appendChild(activeBubble);
          }
          
          activeBubble.style.left = linkRect.left + (linkRect.width / 2) + 'px';
          activeBubble.style.top = linkRect.top + navRect.height + 'px';
          activeBubble.style.opacity = '1';
        }
      });
    });
  }
  
  // Project filtering functionality
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            
            // Re-trigger animation
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Animate project cards on scroll
  function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Reset initial state
    projectCards.forEach((card, index) => {
      card.style.animationDelay = (index * 0.1) + 's';
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe each card
    projectCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Contact form handling
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !message) {
          alert('Please fill all fields');
          return;
        }
        
        // Simulate form submission
        contactForm.innerHTML = `
          <div class="form-success">
            <h3>Thank you for your message, ${name}!</h3>
            <p>I'll get back to you soon at ${email}.</p>
          </div>
        `;
        
        // In a real implementation, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
      });
    }
  }
  
  // Enhanced interactive project cards with 3D effect
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.03)';
      this.classList.add('card-focus');
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.classList.remove('card-focus');
    });
    
    // Add 3D tilt effect on mousemove
    card.addEventListener('mousemove', function(e) {
      const cardRect = this.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      const angleY = -(e.clientX - cardCenterX) / 15;
      const angleX = (e.clientY - cardCenterY) / 15;
      
      this.style.transform = `translateY(-15px) scale(1.03) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      
      // Add highlight effect
      const thumbnail = this.querySelector('.project-thumbnail');
      if (thumbnail) {
        const shine = `radial-gradient(circle at ${e.clientX - cardRect.left}px ${e.clientY - cardRect.top}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
        thumbnail.style.backgroundImage = shine;
      }
    });
  });
  
  // Add parallax effect to hero section
  document.addEventListener('mousemove', function(e) {
    const hero = document.getElementById('hero');
    
    if (hero) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    }
  });
  
  // Interactive background canvas
  function initBackgroundCanvas() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Array to store particle objects
    const particles = [];
    const particleCount = 50;
    
    // Colors based on the site's theme
    const colors = ['#6c63ff', '#ff6584', '#333333'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Create connections between particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 1 - (distance / 150);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(108, 99, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
        ctx.fill();
      });
      
      // Draw connections
      drawConnections();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    // Start animation
    animate();
  }