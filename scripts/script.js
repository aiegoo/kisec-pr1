document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const dynamicH2 = document.getElementById('dynamic-h2');
    const dynamicSubmenu = document.getElementById('dynamic-submenu');
    const heroSection = document.getElementById('hero-section');
    const menuButton = document.getElementById('menu-button');
    const collapsibleMenu = document.getElementById('collapsible-menu');
    const spaNav = document.querySelector('.spa-nav');

    // Generate navigation items for the sidebar
    sections.forEach(section => {
        const id = section.id;
        let title = section.querySelector('h2').textContent.replace(/[📋💻⏱️🦠🕵️🔬🛡️🎓🚀📚✅]/g, '').trim();

        const navItem = document.createElement('a');
        navItem.href = `#${id}`;
        navItem.classList.add('spa-nav-item');
        navItem.textContent = title;
        spaNav.appendChild(navItem);

        navItem.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', `#${id}`);
        });
    });

    // Toggle collapsible menu
    menuButton.addEventListener('click', () => {
        collapsibleMenu.style.display = collapsibleMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close collapsible menu when a link is clicked
    collapsibleMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            collapsibleMenu.style.display = 'none';
        });
    });

    // Intersection Observer for fade-in effect and active navigation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h2 = entry.target.querySelector('h2');
                if (h2) {
                    dynamicH2.textContent = h2.textContent;
                }

                const submenu = entry.target.querySelector('.sticky-submenu');
                if (submenu) {
                    dynamicSubmenu.innerHTML = submenu.innerHTML;
                }

                document.querySelectorAll('.spa-nav-item').forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${entry.target.id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Hero section sticky effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            heroSection.classList.add('scrolled');
        } else {
            heroSection.classList.remove('scrolled');
        }
    });

    // Handle initial hash in URL for direct linking
    if (window.location.hash) {
        const targetSection = document.getElementById(window.location.hash.substring(1));
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

