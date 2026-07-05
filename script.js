/* =====================================================
   Ahmed Sultan — Portfolio Script
   - Theme toggle (light/dark)
   - Mobile nav
   - Active link highlight
   - Reveal on scroll
   - Skills progress bars
   - Contact form (mailto)
   - Projects render + admin image/link editor
   ===================================================== */

(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------- THEME ---------------- */
  const themeToggle = $('#themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  const updateThemeUI = () => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    const isLight = root.getAttribute('data-theme') === 'light';
    if (icon) {
      icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  };
  updateThemeUI();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateThemeUI();
    });
  }

  /* ---------------- MOBILE NAV ---------------- */
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.topbar')) navLinks.classList.remove('open');
    });
  }

  /* ---------------- ACTIVE LINK ---------------- */
  const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.nav-link').forEach((link) => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href && page.endsWith(href)) link.classList.add('active');
  });

  /* ---------------- REVEAL ON SCROLL ---------------- */
  const revealNodes = $$('.reveal');
  if ('IntersectionObserver' in window && revealNodes.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealNodes.forEach((node) => io.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  /* ---------------- 3D TILT ---------------- */
  $$('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -4;
      const ry = ((x / rect.width) - 0.5) * 4;
      card.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---------------- SKILL BARS ---------------- */
  if ($$('.skill-card').length) {
    const skillIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          skillIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    $$('.skill-card').forEach((c) => skillIO.observe(c));
  }

  /* ---------------- CONTACT FORM ---------------- */
  const contactForm = $('#contactForm');
  const messageBox = $('#formMessage');
  if (contactForm && messageBox) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      if (!name || !message) {
        messageBox.textContent = 'Please add your name and a short message before sending.';
        messageBox.className = 'form-message error';
        return;
      }
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email || 'Not provided'}\n\n${message}`);
      window.location.href = `mailto:hello@ahmedsultan.dev?subject=${subject}&body=${body}`;
      messageBox.textContent = 'Your email app should open with the message ready. Thanks!';
      messageBox.className = 'form-message success';
      contactForm.reset();
    });
  }

  /* ---------------- PROJECTS (data + render + admin editor) ---------------- */
  if ($('#projectGrid')) {
    const DEFAULT_PROJECTS = [
      {
        id: 1,
        title: 'Home Purify',
        description: 'Smart AI-powered indoor air purification recommendation system with real-time monitoring.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Chart.js'],
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=380&fit=crop',
        github_url: 'https://github.com/yourusername/homepurify',
        live_demo: 'https://homepurify.vercel.app',
        status: 'live',
        featured: true,
        features: ['Real-time air quality monitoring', 'AI-powered recommendations', 'Historical data visualization', 'Multi-device support', 'Smart notifications']
      },
      {
        id: 2,
        title: 'Art Gallarix',
        description: 'Digital art gallery with immersive 3D viewer, artist profiles, and virtual exhibition rooms.',
        technologies: ['React', 'Three.js', 'CSS', 'JavaScript', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=380&fit=crop',
        github_url: 'https://github.com/yourusername/artgallarix',
        live_demo: 'https://artgallarix.vercel.app',
        status: 'live',
        featured: true,
        features: ['3D art viewer with orbit controls', 'Virtual exhibition rooms', 'Artist profile pages', 'Responsive gallery layout']
      },
      {
        id: 3,
        title: 'Cafe Landing',
        description: 'Modern, fully responsive cafe website with interactive menu and reservation system.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'ScrollTrigger'],
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=380&fit=crop',
        github_url: 'https://github.com/yourusername/cafe-landing',
        live_demo: 'https://cafe.vercel.app',
        status: 'live',
        featured: false,
        features: ['Interactive menu with categories', 'Online reservation system', 'Smooth scroll animations', 'Responsive design']
      },
      {
        id: 4,
        title: 'Weather Dashboard',
        description: 'Real-time weather dashboard with interactive maps, forecasts, and severe weather alerts.',
        technologies: ['React', 'TypeScript', 'Chart.js', 'Leaflet'],
        image: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=600&h=380&fit=crop',
        github_url: 'https://github.com/yourusername/weather-dashboard',
        live_demo: 'https://weather-dashboard.vercel.app',
        status: 'live',
        featured: false,
        features: ['Real-time weather updates', 'Interactive map view', 'Hourly and 7-day forecasts', 'Severe weather alerts']
      },
      {
        id: 5,
        title: 'PetFlux · AI Chatbot',
        description: 'Pet care companion with an AI chatbot that answers questions about pet health, nutrition, and training — powered by a friendly conversational UI.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'OpenAI API', 'WebSockets'],
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=380&fit=crop',
        github_url: 'https://github.com/yourusername/petflux',
        live_demo: 'https://petflux.vercel.app',
        status: 'live',
        featured: true,
        features: ['AI chat assistant for pet care', 'Pet profile dashboard', 'Vet locator & reminders', 'Daily care tips', 'Mobile-first design']
      },
      {
        id: 6,
        title: 'Urban Threads',
        description: 'Modern streetwear storefront with a clean catalog, product detail pages, and a smooth shopping flow.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Stripe'],
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=380&fit=crop',
        github_url: 'https://github.com/yourusername/urban-threads',
        live_demo: 'https://urban-threads.vercel.app',
        status: 'live',
        featured: true,
        features: ['Product catalog with filters', 'Product detail pages', 'Cart & checkout flow', 'Responsive streetwear UI']
      },
      {
        id: 7,
        title: 'Aurora Notes',
        description: 'A beautiful, minimal note-taking app with markdown support, tags, and local autosave.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'IndexedDB', 'Marked.js'],
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=380&fit=crop',
        github_url: 'https://github.com/yourusername/aurora-notes',
        live_demo: 'https://aurora-notes.vercel.app',
        status: 'live',
        featured: false,
        features: ['Markdown editor with preview', 'Tags & search', 'Local autosave (IndexedDB)', 'Keyboard shortcuts']
      }
    ];

    const STORAGE_KEY = 'portfolio-project-overrides';
    const loadOverrides = () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { return {}; }
    };
    const saveOverrides = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const applyOverrides = (list) => list.map((p) => {
      const o = loadOverrides()[p.id];
      return o ? { ...p, image: o.image ?? p.image, live_demo: o.live_demo ?? p.live_demo } : p;
    });

    let projects = applyOverrides(DEFAULT_PROJECTS);

    const grid = $('#projectGrid');
    const searchInput = $('#searchInput');
    const statusBtns = $$('#statusFilters .filter-btn');
    const modal = $('#projectModal');
    const modalClose = $('#modalClose');
    const modalBanner = $('#modalBanner');
    const modalTitle = $('#modalTitle');
    const modalStatus = $('#modalStatus');
    const modalDesc = $('#modalDesc');
    const modalTech = $('#modalTech');
    const modalFeatures = $('#modalFeatures');
    const modalLinks = $('#modalLinks');

    let currentStatus = 'all';
    let searchQuery = '';

    const escapeHtml = (text) => {
      if (text == null) return '';
      return String(text).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    };

    const statusBadge = (status, featured) => {
      if (featured) return '<span class="status-badge featured">★ Featured</span>';
      const map = { live: 'live', draft: 'draft', archived: 'archived' };
      return `<span class="status-badge ${map[status] || 'draft'}">${status || 'Draft'}</span>`;
    };

    const filterProjects = () => {
      let list = [...projects];
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter((p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.technologies || []).some((t) => t.toLowerCase().includes(q))
        );
      }
      if (currentStatus === 'featured') list = list.filter((p) => p.featured);
      else if (currentStatus !== 'all') list = list.filter((p) => p.status === currentStatus);
      return list;
    };

    const render = () => {
      const filtered = filterProjects();
      statusBtns.forEach((btn) => {
        const s = btn.dataset.status;
        const c = btn.querySelector('.count');
        if (!c) return;
        if (s === 'all') c.textContent = `(${projects.length})`;
        else if (s === 'featured') c.textContent = `(${projects.filter((p) => p.featured).length})`;
        else c.textContent = `(${projects.filter((p) => p.status === s).length})`;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state">
            <i class="fa-solid fa-magnifying-glass"></i>
            <h3>No projects found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>`;
        return;
      }

      grid.innerHTML = filtered.map((p) => `
        <article class="project-card reveal" data-id="${p.id}">
          <div class="image-wrap">
            ${p.image
              ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'no-image',innerHTML:'<i class=\\'fa-solid fa-image\\'></i> No image'}))" />`
              : `<div class="no-image"><i class="fa-solid fa-image"></i> No image</div>`}
            ${statusBadge(p.status, p.featured)}
          </div>
          <div class="card-body">
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.description)}</p>
            <div class="project-tags">
              ${(p.technologies || []).map((t) => `<span>${escapeHtml(t)}</span>`).join('')}
            </div>
            <div class="card-actions">
              ${p.github_url ? `<a href="${escapeHtml(p.github_url)}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>` : '<button class="disabled" disabled>No code</button>'}
              ${p.live_demo ? `<a href="${escapeHtml(p.live_demo)}" target="_blank" rel="noopener" class="btn-demo"><i class="fa-solid fa-up-right-from-square"></i> Live demo</a>` : '<button class="disabled" disabled>No demo</button>'}
              <button onclick="window.openProjectModal(${p.id})"><i class="fa-solid fa-arrow-right"></i> View</button>
            </div>
          </div>
        </article>
      `).join('');

      // Re-observe new reveal nodes
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
        }, { threshold: 0.1 });
        grid.querySelectorAll('.reveal').forEach((n) => io.observe(n));
      }
    };

    window.openProjectModal = (id) => {
      const p = projects.find((x) => x.id === id);
      if (!p) return;
      modalBanner.innerHTML = p.image
        ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" onerror="this.parentElement.innerHTML='<div class=\\'no-image\\'><i class=\\'fa-solid fa-image\\'></i> No image</div>'" />`
        : '<div class="no-image"><i class="fa-solid fa-image"></i> No image</div>';
      modalTitle.textContent = p.title;
      modalStatus.textContent = p.featured ? '★ Featured' : (p.status || 'Draft');
      modalStatus.className = 'modal-status ' + (p.featured ? 'featured' : p.status || 'draft');
      modalDesc.textContent = p.description || '';
      modalTech.innerHTML = (p.technologies || []).map((t) => `<span>${escapeHtml(t)}</span>`).join('');
      modalFeatures.innerHTML = (p.features || []).map((f) => `<li>${escapeHtml(f)}</li>`).join('');
      modalLinks.innerHTML = `
        ${p.github_url ? `<a href="${escapeHtml(p.github_url)}" target="_blank" rel="noopener" class="btn-github"><i class="fa-brands fa-github"></i> Source</a>` : ''}
        ${p.live_demo ? `<a href="${escapeHtml(p.live_demo)}" target="_blank" rel="noopener" class="btn-demo"><i class="fa-solid fa-up-right-from-square"></i> Live demo</a>` : ''}
      `;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
    statusBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        statusBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentStatus = btn.dataset.status;
        render();
      });
    });

    /* ----- Admin / Image editor ----- */
    const adminToggle = $('#adminToggle');
    const adminPanel = $('#adminPanel');
    const closeAdmin = $('#closeAdmin');
    const adminList = $('#adminList');
    const saveAdmin = $('#saveAdmin');
    const resetAdmin = $('#resetAdmin');

    const renderAdmin = () => {
      const overrides = loadOverrides();
      adminList.innerHTML = projects.map((p) => {
        const o = overrides[p.id] || {};
        const img = o.image ?? p.image ?? '';
        const link = o.live_demo ?? p.live_demo ?? '';
        return `
          <div class="admin-item" data-id="${p.id}">
            <h4>${escapeHtml(p.title)}</h4>
            <img class="admin-preview" src="${escapeHtml(img)}" alt="preview" onerror="this.style.display='none'" />
            <label>Image URL
              <input type="url" data-field="image" value="${escapeHtml(img)}" placeholder="https://..." />
            </label>
            <label>Live demo link (Vercel)
              <input type="url" data-field="live_demo" value="${escapeHtml(link)}" placeholder="https://your-project.vercel.app" />
            </label>
          </div>`;
      }).join('');
    };

    if (adminToggle) {
      adminToggle.addEventListener('click', () => {
        adminPanel.classList.add('open');
        adminPanel.setAttribute('aria-hidden', 'false');
        renderAdmin();
      });
    }
    if (closeAdmin) {
      closeAdmin.addEventListener('click', () => {
        adminPanel.classList.remove('open');
        adminPanel.setAttribute('aria-hidden', 'true');
      });
    }
    if (saveAdmin) {
      saveAdmin.addEventListener('click', () => {
        const overrides = loadOverrides();
        adminList.querySelectorAll('.admin-item').forEach((item) => {
          const id = item.dataset.id;
          const image = item.querySelector('[data-field="image"]').value.trim();
          const live_demo = item.querySelector('[data-field="live_demo"]').value.trim();
          overrides[id] = { image: image || undefined, live_demo: live_demo || undefined };
        });
        saveOverrides(overrides);
        // Re-apply & re-render
        projects = applyOverrides(DEFAULT_PROJECTS);
        render();
        closeAdmin.click();
        // Subtle confirmation
        const msg = document.createElement('div');
        msg.textContent = '✓ Project images & links updated';
        msg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;padding:10px 18px;border-radius:999px;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,0.3);font-weight:600;';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2200);
      });
    }
    if (resetAdmin) {
      resetAdmin.addEventListener('click', () => {
        if (confirm('Reset all custom images & demo links to defaults?')) {
          localStorage.removeItem(STORAGE_KEY);
          projects = applyOverrides(DEFAULT_PROJECTS);
          render();
          renderAdmin();
        }
      });
    }

    render();
  }
})();
