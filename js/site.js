// OGGETTO SKILLS 
const skills = {
    frontEnd: [
        { title: "HTML 5", path: "html.png" },
        { title: "CSS 3", path: "css.png" },
        { title: "JavaScript ES6", path: "javascript.png" },
        { title: "TypeScript", path: "typescript.png" },
        { title: "React JS", path: "react.png" },
        { title: "Vue JS", path: "vuejs.png" },
        { title: "Node JS", path: "nodejs.png" },
        { title: "Vite JS", path: "vitejs.png" }
    ],
    backEnd: [
        { title: "C#", path: "c-sharp.png" },
        { title: ".NET Core", path: "net-core.png" },
        { title: ".NET Framework", path: "net-framework.png" },
        { title: "PHP", path: "php.png" },
        { title: "Laravel", path: "laravel.png" },
        { title: "SQL", path: "sql.png" },
        { title: "DynamoDB", path: "dynamodb.png" }
    ],
    tools: [
        { title: "Git", path: "git.png" },
        { title: "Docker", path: "docker.png" },
        { title: "Postman", path: "postman.png" },
        { title: "MySQL Workbench", path: "mysql.png" },
        { title: "NoSQL Workbench", path: "nosql.png" },
        { title: "Amazon Web Services", path: "aws.png" }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DIZIONARIO TRADUZIONI (i18n Centralizzato)
    const translations = {
        it: {
            home: "Home",
            skills: "Competenze",
            contacts: "Contatti",
            subHero: "Seleziona una sezione per esplorare le mie competenze",
            titleText: "Ciao, sono Mattia e sviluppo soluzioni web full-stack.",
            toolsTitle: "Strumenti & DevOps",
            digiventsLabel: "Email Aziendale / Progetti Digivents",
            goappLabel: "Email Aziendale / Progetti GoApp",
            personalLabel: "Collaborazioni & Freelance",
            visitProfile: "Profilo",
            write: "Scrivi",
            copy: "Copia",
            copiedMsg: "Copiato!"
        },
        en: {
            home: "Home",
            skills: "Skills",
            contacts: "Contacts",
            subHero: "Select a section to explore my expertise",
            titleText: "Hi, I'm Mattia and I build full-stack web solutions.",
            toolsTitle: "Development Tools & DevOps",
            digiventsLabel: "Corporate Email / Digivents Projects",
            goappLabel: "Corporate Email / GoApp Projects",
            personalLabel: "Freelance & Collaborations",
            visitProfile: "Profile",
            write: "Write",
            copy: "Copy",
            copiedMsg: "Copied!"
        }
    };

    // 2. SELETTORI DOM MAPPA
    const elements = {
        header: document.querySelector("#headerSection"),
        skillsSection: document.querySelector("#skills"),
        contactsSection: document.querySelector("#contacts"),
        devTitle: document.querySelector("#devTitle"),
        subHeroText: document.querySelector("#headerSection p"),
        // Bottoni Navbar Desktop
        navHome: document.querySelector("#navHome"),
        navSkills: document.querySelector("#navSkills"),
        navContacts: document.querySelector("#navContacts"),
        // Componenti Hamburger Mobile Drawer
        menuTrigger: document.querySelector("#menuTrigger"),
        menuClose: document.querySelector("#menuClose"),
        mobileDrawer: document.querySelector("#mobileDrawer"),
        menuOverlay: document.querySelector("#menuOverlay"),
        navHomeMobile: document.querySelector("#navHomeMobile"),
        navSkillsMobile: document.querySelector("#navSkillsMobile"),
        navContactsMobile: document.querySelector("#navContactsMobile"),
        // Contenitori di Struttura Skill
        skillsMainTitle: document.querySelector("#skills h2"),
        frontEndTitle: document.querySelector("#frontEndTitle"),
        backEndTitle: document.querySelector("#backEndTitle"),
        toolsTitle: document.querySelector("#toolsTitle"),
        frontEndContainer: document.querySelector("#frontEndContainer"),
        backEndContainer: document.querySelector("#backEndContainer"),
        toolsContainer: document.querySelector("#toolsContainer"),
        // Elementi Sezione Contatti
        contactsMainTitle: document.querySelector("#contacts h2"),
        linkedinBtn: document.querySelector("#linkedinBtn"), // Corretto ID selettore diretto
        labelDigivents: document.querySelector("#businessEmailContact h4"),
        labelGoApp: document.querySelector("#goappEmailContact h4"),
        labelPersonal: document.querySelector("#personalEmailContact h4"),
        // Tasti di controllo Navbar
        themeToggle: document.querySelector("#themeToggle"),
        themeToggleDarkIcon: document.querySelector("#themeToggleDarkIcon"),
        themeToggleLightIcon: document.querySelector("#themeToggleLightIcon"),
        langToggle: document.querySelector("#langToggle"),
        langText: document.querySelector("#langText"),
        // Array blocchi contatti per dissolvenze sequenziali
        contactBlocks: [
            document.querySelector("#linkedinContact"),
            document.querySelector("#businessEmailContact"),
            document.querySelector("#goappEmailContact"),
            document.querySelector("#personalEmailContact")
        ]
    };

    // STATO APPLICAZIONE
    const config = {
        currentLang: localStorage.getItem('portfolio-lang') || 'it',
        typingSpeed: 50,
        activeSection: "",
        typingTimeout: null
    };

    let idxTitle = 0;

    // Utility asincrona di attesa
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // ==========================================
    // 3. LOGICA CAMBIO TEMA (Sincronizzata con attributo hidden)
    // ==========================================
    function updateThemeUI(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            elements.themeToggleDarkIcon.hidden = true;   // Nasconde la Luna
            elements.themeToggleLightIcon.hidden = false; // Mostra il Sole
        } else {
            document.documentElement.classList.remove('dark');
            elements.themeToggleLightIcon.hidden = true;  // Nasconde il Sole
            elements.themeToggleDarkIcon.hidden = false;  // Mostra la Luna
        }
    }

    function initTheme() {
        const isDarkStored = localStorage.getItem('color-theme') === 'dark';
        const isDarkSystem = !('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = isDarkStored || isDarkSystem;

        updateThemeUI(isDark);

        elements.themeToggle.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.classList.contains('dark');
            const newDarkState = !isCurrentlyDark;
            
            localStorage.setItem('color-theme', newDarkState ? 'dark' : 'light');
            updateThemeUI(newDarkState);
        });
    }

    // ==========================================
    // 4. INTERFACCIA INTERNAZIONALE (i18n)
    // ==========================================
    function updateInterfaceTexts() {
        const lang = config.currentLang;
        const data = translations[lang];

        document.querySelectorAll(".label-home").forEach(el => el.textContent = data.home);
        document.querySelectorAll(".label-skills").forEach(el => el.textContent = data.skills);
        document.querySelectorAll(".label-contacts").forEach(el => el.textContent = data.contacts);

        elements.skillsMainTitle.textContent = data.skills;
        elements.contactsMainTitle.textContent = data.contacts;
        
        // Modificato qui: usiamo il selettore di classe così aggiorna sempre il testo corretto
        document.querySelectorAll(".label-subhero").forEach(el => el.textContent = data.subHero);

        elements.frontEndTitle.textContent = "Front-end";
        elements.backEndTitle.textContent = "Back-end";
        elements.toolsTitle.textContent = data.toolsTitle;

        if(elements.labelDigivents) elements.labelDigivents.textContent = data.digiventsLabel;
        if(elements.labelGoApp) elements.labelGoApp.textContent = data.goappLabel;
        if(elements.labelPersonal) elements.labelPersonal.textContent = data.personalLabel;

        const profileBtnText = elements.linkedinBtn.querySelector('.btn-profile-text');
        if (profileBtnText) profileBtnText.textContent = data.visitProfile;

        document.querySelectorAll(".label-write").forEach(span => span.textContent = data.write);
        document.querySelectorAll(".label-copy").forEach(span => span.textContent = data.copy);
        document.querySelectorAll(".copied").forEach(div => div.textContent = data.copiedMsg);

        if (lang === 'it') {
            elements.langText.innerHTML = `
                <img src="img/flag-en.png" alt="English" class="w-4 h-3 object-cover rounded-sm inline-block align-middle shadow-sm">
                <span class="align-middle">EN</span>
            `;
        } else {
            elements.langText.innerHTML = `
                <img src="img/flag-it.png" alt="Italiano" class="w-4 h-3 object-cover rounded-sm inline-block align-middle shadow-sm">
                <span class="align-middle">IT</span>
            `;
        }
    }

    function initLanguage() {
        updateInterfaceTexts();

        elements.langToggle.addEventListener('click', () => {
            config.currentLang = config.currentLang === 'it' ? 'en' : 'it';
            localStorage.setItem('portfolio-lang', config.currentLang);
            updateInterfaceTexts();

            // Forza il reset del titolo della macchina da scrivere se siamo sulla Home
            if (config.activeSection === "home" || config.activeSection === "") {
                clearTimeout(config.typingTimeout);
                elements.devTitle.textContent = "";
                idxTitle = 0;
                typingDevTitle();
            }
        });
    }

    // ==========================================
    // 5. MACCHINA DA SCRIVERE (Typing Effect)
    // ==========================================
    function typingDevTitle() {
        const currentText = translations[config.currentLang].titleText;
        if (idxTitle < currentText.length) {
            elements.devTitle.textContent += currentText.charAt(idxTitle);
            idxTitle++;
            config.typingTimeout = setTimeout(typingDevTitle, config.typingSpeed);
        }
    }

    // ==========================================
    // 6. RENDERIZZA SKILLS DINAMICHE
    // ==========================================
    function renderSkillsCategory(categoryData, container) {
        const listContainer = container.querySelector('.skill-list');
        listContainer.innerHTML = ""; 
        const fragment = document.createDocumentFragment();
        
        categoryData.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'flex items-center gap-4 p-3 pt-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200 group';
            wrapper.innerHTML = `
                <div class="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:scale-110 transition-transform duration-200 overflow-hidden p-1.5 shadow-sm">
                    <img class="max-w-full max-h-full object-contain" src="img/${item.path}" alt="${item.title}">
                </div>
                <div class="font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">${item.title}</div>
            `;
            fragment.appendChild(wrapper);
        });
        listContainer.appendChild(fragment);
    }

    function initSkills() {
        renderSkillsCategory(skills.frontEnd, elements.frontEndContainer);
        renderSkillsCategory(skills.backEnd, elements.backEndContainer);
        renderSkillsCategory(skills.tools, elements.toolsContainer);
    }

    // ==========================================
    // 7. GESTIONE APPUNTI (Copia Clipboard)
    // ==========================================
    function initClipboard() {
        document.querySelectorAll(".copy-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const targetBtn = e.currentTarget;
                const card = targetBtn.closest('.group');
                const emailLink = card.querySelector('a[href^="mailto:"]');
                if (!emailLink) return;

                const email = emailLink.textContent.trim();
                try {
                    await navigator.clipboard.writeText(email);
                    const toast = card.querySelector('.copied');
                    if (toast) {
                        toast.classList.remove('hidden');
                        setTimeout(() => toast.classList.add('hidden'), 2000);
                    }
                } catch (err) {
                    console.error("Errore durante la copia: ", err);
                }
            });
        });
    }

    // ==========================================
    // 8. LOGICA DI NAVIGAZIONE E ANIMAZIONI SEZIONI
    // ==========================================
    async function switchSection(sectionName) {
        if (config.activeSection === sectionName) return;
        config.activeSection = sectionName;

        // Reset classi attive bottoni desktop
        [elements.navHome, elements.navSkills, elements.navContacts].forEach(btn => {
            btn.className = "group flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-all";
        });
        // Reset classi attive bottoni mobile
        [elements.navHomeMobile, elements.navSkillsMobile, elements.navContactsMobile].forEach(btn => {
            btn.className = "flex items-center gap-4 px-4 py-3 rounded-xl text-left text-base font-semibold text-slate-600 dark:text-slate-300 cursor-pointer w-full";
        });

        // Nascondi tutte le sezioni principali
        [elements.header, elements.skillsSection, elements.contactsSection].forEach(sec => {
            sec.classList.add('hidden');
            sec.classList.remove('opacity-100');
            sec.classList.add('opacity-0');
        });

        // Applica stili al bottone attivo in base alla sezione
        if (sectionName === "home") {
            elements.navHome.className = "group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold uppercase transition-all duration-300 bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer";
            elements.navHomeMobile.className = "flex items-center gap-4 px-4 py-3 rounded-xl text-left text-base font-bold bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer w-full";
            
            elements.header.classList.remove('hidden');
            await delay(50);
            elements.header.classList.remove('opacity-0');
            elements.header.classList.add('opacity-100');

        } else if (sectionName === "skills") {
            elements.navSkills.className = "group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold uppercase transition-all duration-300 bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer";
            elements.navSkillsMobile.className = "flex items-center gap-4 px-4 py-3 rounded-xl text-left text-base font-bold bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer w-full";
            
            elements.skillsSection.classList.remove('hidden');
            await delay(50);
            elements.skillsSection.classList.remove('opacity-0');
            elements.skillsSection.classList.add('opacity-100');

            // Reset ed entrata sequenziale delle 3 card skill
            const cards = [elements.frontEndContainer, elements.backEndContainer, elements.toolsContainer];
            cards.forEach(c => c.className = "opacity-0 translate-y-4 bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all duration-500");
            
            for (let i = 0; i < cards.length; i++) {
                await delay(150);
                cards[i].classList.remove('opacity-0', 'translate-y-4');
                cards[i].classList.add('opacity-100', 'translate-y-0');
            }

        } else if (sectionName === "contacts") {
            elements.navContacts.className = "group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold uppercase transition-all duration-300 bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer";
            elements.navContactsMobile.className = "flex items-center gap-4 px-4 py-3 rounded-xl text-left text-base font-bold bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer w-full";
            
            elements.contactsSection.classList.remove('hidden');
            await delay(50);
            elements.contactsSection.classList.remove('opacity-0');
            elements.contactsSection.classList.add('opacity-100');

            // Reset ed entrata sequenziale dei blocchi contatti
            elements.contactBlocks.forEach(b => b.className = "opacity-0 translate-y-4 bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 relative group");
            
            for (let i = 0; i < elements.contactBlocks.length; i++) {
                await delay(100);
                elements.contactBlocks[i].classList.remove('opacity-0', 'translate-y-4');
                elements.contactBlocks[i].classList.add('opacity-100', 'translate-y-0');
            }
        }
    }

    function toggleMobileMenu(isOpen) {
        if (isOpen) {
            elements.mobileDrawer.classList.remove('-translate-x-full');
            elements.menuOverlay.classList.remove('hidden');
            setTimeout(() => {
                elements.menuOverlay.classList.remove('opacity-0');
                elements.menuOverlay.classList.add('opacity-100');
            }, 10);
        } else {
            elements.mobileDrawer.classList.add('-translate-x-full');
            elements.menuOverlay.classList.remove('opacity-100');
            elements.menuOverlay.classList.add('opacity-0');
            setTimeout(() => elements.menuOverlay.classList.add('hidden'), 300);
        }
    }

    function initNavigation() {
        // Navigazione Desktop
        elements.navHome.addEventListener('click', () => switchSection('home'));
        elements.navSkills.addEventListener('click', () => switchSection('skills'));
        elements.navContacts.addEventListener('click', () => switchSection('contacts'));

        // Navigazione Mobile + Chiusura automatica drawer al click
        elements.navHomeMobile.addEventListener('click', () => { switchSection('home'); toggleMobileMenu(false); });
        elements.navSkillsMobile.addEventListener('click', () => { switchSection('skills'); toggleMobileMenu(false); });
        elements.navContactsMobile.addEventListener('click', () => { switchSection('contacts'); toggleMobileMenu(false); });

        // Eventi Drawer Hamburger
        elements.menuTrigger.addEventListener('click', () => toggleMobileMenu(true));
        elements.menuClose.addEventListener('click', () => toggleMobileMenu(false));
        elements.menuOverlay.addEventListener('click', () => toggleMobileMenu(false));
    }

    // ==========================================
    // 9. AVVIO APPLICAZIONE (Bootstrap)
    // ==========================================
    initTheme();
    initLanguage();
    initSkills();
    initClipboard();
    initNavigation();
    
    // Stato iniziale: Home attiva e avvio macchina da scrivere
    switchSection('home');
    typingDevTitle();
});