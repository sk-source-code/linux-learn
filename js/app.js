/**
 * Main Application Logic — Linux Knowledge Base
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Render Content ---
    const commandsContainer = document.getElementById('commands-container');
    const networkCommandsContainer = document.getElementById('network-commands-container');

    // Render Core Commands
    if (commandsContainer && typeof coreCommands !== 'undefined') {
        commandsContainer.innerHTML = coreCommands.map(cmd => generateCommandHTML(cmd)).join('');
    }

    // Render Network Commands
    if (networkCommandsContainer && typeof networkCommands !== 'undefined') {
        networkCommandsContainer.innerHTML = networkCommands.map(cmd => generateCommandHTML(cmd)).join('');
    }

    // Update stats
    const statCore = document.getElementById('stat-core');
    const statNet = document.getElementById('stat-net');
    const cmdCount = document.getElementById('cmd-count');
    if (statCore && typeof coreCommands !== 'undefined') statCore.textContent = coreCommands.length;
    if (statNet && typeof networkCommands !== 'undefined') statNet.textContent = networkCommands.length;
    if (cmdCount && typeof coreCommands !== 'undefined' && typeof networkCommands !== 'undefined') {
        cmdCount.textContent = `${coreCommands.length + networkCommands.length} commands documented`;
    }

    // Re-initialize icons after dynamic content injection
    lucide.createIcons();

    // --- Generic Filter Function ---
    function setupFilters(filterContainerId, cardsContainerId) {
        const filterContainer = document.getElementById(filterContainerId);
        const cardsContainer = document.getElementById(cardsContainerId);
        if (!filterContainer || !cardsContainer) return;

        const filterBtns = filterContainer.querySelectorAll('.filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state within this filter group
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                const cards = cardsContainer.querySelectorAll('.command-card');

                cards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeIn 0.3s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Setup both filter groups
    setupFilters('command-filters', 'commands-container');
    setupFilters('net-command-filters', 'network-commands-container');

    // --- Copy to Clipboard ---
    document.body.addEventListener('click', async (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        if (!copyBtn) return;

        const codeToCopy = copyBtn.getAttribute('data-code').replace(/&quot;/g, '"');
        
        try {
            await navigator.clipboard.writeText(codeToCopy);
            
            // Visual feedback
            const icon = copyBtn.querySelector('i');
            if (!icon) return;
            const originalIcon = icon.getAttribute('data-lucide');
            
            icon.setAttribute('data-lucide', 'check');
            lucide.createIcons({ root: copyBtn });
            copyBtn.style.color = '#a6e3a1';
            
            setTimeout(() => {
                icon.setAttribute('data-lucide', originalIcon);
                lucide.createIcons({ root: copyBtn });
                copyBtn.style.color = '';
            }, 2000);
        } catch (err) {
            // Fallback for non-HTTPS or older browsers
            const textarea = document.createElement('textarea');
            textarea.value = codeToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            copyBtn.style.color = '#a6e3a1';
            setTimeout(() => { copyBtn.style.color = ''; }, 2000);
        }
    });

    // --- Navigation & Scroll Spy ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-item a');
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobile-toggle');

    // Mobile Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isActive = sidebar.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    // Close sidebar on mobile when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Scroll Spy using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- Search Functionality ---
    const searchModal = document.getElementById('search-modal');
    const triggerSearch = document.getElementById('trigger-search');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    function openSearch() {
        searchModal.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        searchInput.value = '';
        renderSearchResults('');
    }

    if (triggerSearch) triggerSearch.addEventListener('click', openSearch);
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);

    // Close modal on backdrop click
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }

    // Keyboard shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });

    // Search Logic — routes to the correct section
    function getCommandSection(cmd) {
        // Check if command is in network commands
        if (typeof networkCommands !== 'undefined') {
            const isNet = networkCommands.some(nc => nc.name === cmd.name);
            if (isNet) return '#net-commands';
        }
        return '#commands';
    }

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderSearchResults(query) {
        if (!query.trim()) {
            const total = (typeof searchIndex !== 'undefined') ? searchIndex.length : '100+';
            searchResults.innerHTML = `<div class="search-empty">Start typing to search across <strong>${total}</strong> commands...</div>`;
            return;
        }

        query = query.toLowerCase();
        
        const results = (typeof searchIndex !== 'undefined' ? searchIndex : []).filter(cmd => 
            cmd.name.toLowerCase().includes(query) || 
            cmd.description.toLowerCase().includes(query) ||
            cmd.category.toLowerCase().includes(query) ||
            (cmd.flags && cmd.flags.some(f => f.flag.toLowerCase().includes(query) || f.desc.toLowerCase().includes(query)))
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">No results found. Try a different term.</div>';
            return;
        }

        searchResults.innerHTML = results.slice(0, 15).map(cmd => {
            const section = getCommandSection(cmd);
            return `
                <a href="${section}" class="search-item" onclick="document.getElementById('search-modal').classList.remove('active')">
                    <span class="search-item-title">${escapeHTML(cmd.name)}</span>
                    <span class="search-item-category">${escapeHTML(cmd.category)}</span>
                    <span class="search-item-desc">${escapeHTML(cmd.description)}</span>
                </a>
            `;
        }).join('');

        if (results.length > 15) {
            searchResults.innerHTML += `<div class="search-empty" style="padding: 0.5rem 0;">...and ${results.length - 15} more results</div>`;
        }
    }

    if (searchInput) {
        let debounceTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                renderSearchResults(e.target.value);
            }, 150);
        });
    }

    // --- Scroll Animations ---
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card, .command-card, .code-block').forEach(el => {
        el.classList.add('animate-target');
        animateOnScroll.observe(el);
    });
    // --- Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.tab-container');
            if (!container) return;

            const containerBtns = container.querySelectorAll('.tab-btn');
            const containerPanes = container.querySelectorAll('.tab-pane');

            // Remove active class from this container's buttons and panes
            containerBtns.forEach(b => b.classList.remove('active'));
            containerPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Add active class to corresponding pane
            const targetId = `tab-${btn.getAttribute('data-tab')}`;
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});
