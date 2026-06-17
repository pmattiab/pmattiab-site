export const skills = {
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

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    // Dizionario delle traduzioni (Italiano / Inglese)
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
            copyBtn: "Copia",
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
            visitProfile: "View Profile",
            copyBtn: "Copy",
            copiedMsg: "Copied!"
        }
    };

    const elements = {
        header: document.querySelector("#headerSection"),
        skillsSection: document.querySelector("#skills"),
        contactsSection: document.querySelector("#contacts"),
        devTitle: document.querySelector("#devTitle"),
        subHeroText: document.querySelector("#headerSection p"),
        navHome: document.querySelector("#navHome"),
        navSkills: document.querySelector("#navSkills"),
        navContacts: document.querySelector("#navContacts"),
        // Elementi Navbar da tradurre
        labelHome: document.querySelector("#labelHome"),
        labelSkills: document.querySelector("#labelSkills"),
        labelContacts: document.querySelector("#labelContacts"),
        // Elementi delle Sezioni da tradurre
        skillsMainTitle: document.querySelector("#skills h2"),
        contactsMainTitle: document.querySelector("#contacts h2"),
        frontEndTitle: document.querySelector("#frontEndTitle"),
        backEndTitle: document.querySelector("#backEndTitle"),
        toolsTitle: document.querySelector("#toolsTitle"),
        frontEndContainer: document.querySelector("#frontEndContainer"),
        backEndContainer: document.querySelector("#backEndContainer"),
        toolsContainer: document.querySelector("#toolsContainer"),
        // Contatti da tradurre
        labelDigivents: document.querySelector("#businessEmailContact h4"),
        labelGoApp: document.querySelector("#goappEmailContact h4"),
        labelPersonal: document.querySelector("#personalEmailContact h4"),
        labelLinkedin: document.querySelector("#linkedinContact h4"),
        linkedinBtn: document.querySelector("#linkedinContact a"),
        // Controlli
        themeToggle: document.querySelector("#themeToggle"),
        themeToggleDarkIcon: document.querySelector("#themeToggleDarkIcon"),
        themeToggleLightIcon: document.querySelector("#themeToggleLightIcon"),
        langToggle: document.querySelector("#langToggle"),
        langText: document.querySelector("#langText"),
        contactBlocks: [
            document.querySelector("#linkedinContact"),
            document.querySelector("#businessEmailContact"),
            document.querySelector("#goappEmailContact"),
            document.querySelector("#personalEmailContact")
        ]
    };

    const config = {
        currentLang: localStorage.getItem('portfolio-lang') || 'it',
        typingSpeed: 60,
        activeSection: "",
        typingTimeout: null
    };

    let idxTitle = 0;

    // ==========================================
    // 1. LOGICA CAMBIO LINGUA (i18n)
    // ==========================================
    function updateInterfaceTexts() {
        const lang = config.currentLang;
        const data = translations[lang];

        // Aggiorna etichette Navbar
        elements.labelHome.textContent = data.home;
        elements.labelSkills.textContent = data.skills;
        elements.labelContacts.textContent = data.contacts;

        // Aggiorna Titoli Principali delle sezioni
        elements.skillsMainTitle.textContent = data.skills;
        elements.contactsMainTitle.textContent = data.contacts;

        // Sottotitolo Home
        elements.subHeroText.textContent = data.subHero;

        // Aggiorna Intestazioni Colonne Skill
        elements.frontEndTitle.textContent = "Front-end";
        elements.backEndTitle.textContent = "Back-end";
        elements.toolsTitle.textContent = data.toolsTitle;

        // Aggiorna Label dei contatti
        elements.labelLinkedin.textContent = "Linkedin";
        elements.linkedinBtn.innerHTML = `${data.visitProfile} <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>`;
        elements.labelDigivents.textContent = data.digiventsLabel;
        elements.labelGoApp.textContent = data.goappLabel;
        elements.labelPersonal.textContent = data.personalLabel;

        // Aggiorna i testi dei bottoni copia e feedback
        document.querySelectorAll(".copy-btn").forEach(btn => {
            const span = btn.querySelector('span');
            if(span) span.textContent = data.copyBtn;
        });
        document.querySelectorAll(".copied").forEach(div => div.textContent = data.copiedMsg);

        if (config.currentLang === 'it') {
            elements.langText.innerHTML = `
                <img src="img/flag-en.png" alt="English" class="w-4 h-3 object-cover rounded-sm inline-block align-middle mr-1.5 shadow-sm">
                <span class="align-middle">EN</span>
            `;
        } else {
            elements.langText.innerHTML = `
                <img src="img/flag-it.png" alt="Italiano" class="w-4 h-3 object-cover rounded-sm inline-block align-middle mr-1.5 shadow-sm">
                <span class="align-middle">IT</span>
            `;
        }
    }

    function initLanguage() {
        updateInterfaceTexts();

        elements.langToggle.addEventListener('click', () => {
            config.currentLang = config.currentLang === 'it' ? 'en' : 'it';
            localStorage.setItem('portfolio-lang', config.currentLang);
            
            // Aggiorna i testi statici
            updateInterfaceTexts();

            // Se siamo in Home, resetta e fai ripartire l'effetto scrittura nella nuova lingua
            if (config.activeSection === "") {
                clearTimeout(config.typingTimeout);
                elements.devTitle.textContent = "";
                idxTitle = 0;
                typingDevTitle();
            }
        });
    }

    // ==========================================
    // 2. EFFETTO TYPING (Aggiornato per supportare i reset)
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
    // 3. INIEZIONE DELLE SKILLS (Da skills.js)
    // ==========================================
    function renderSkillsCategory(categoryData, container) {
        const listContainer = container.querySelector('.skill-list');
        const fragment = document.createDocumentFragment();
        
        categoryData.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'flex items-center gap-4 p-3 pt-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200 group';
            wrapper.innerHTML = `
                <div class="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:scale-110 transition-transform duration-200 overflow-hidden p-1.5">
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
    // 4. LOGICA TEMA (Dark/Light)
    // ==========================================
    function initTheme() {
        const isDark = localStorage.getItem('color-theme') === 'dark' || 
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            document.documentElement.classList.add('dark');
            elements.themeToggleLightIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            elements.themeToggleDarkIcon.classList.remove('hidden');
        }

        elements.themeToggle.addEventListener('click', () => {
            elements.themeToggleDarkIcon.classList.toggle('hidden');
            elements.themeToggleLightIcon.classList.toggle('hidden');

            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    }

    // ==========================================
    // 5. ANIMAZIONE INGRESSO NAVBAR & CLIPBOARD
    // ==========================================
    function initNavbarAnimation() {
        setTimeout(() => elements.navSkills.classList.remove('opacity-0', 'translate-y-2'), 300);
        setTimeout(() => elements.navContacts.classList.remove('opacity-0', 'translate-y-2'), 500);
    }

    function initClipboard() {
        document.querySelectorAll(".copy-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const card = e.target.closest('.group');
                const emailLink = card.querySelector('a');
                if (!emailLink) return;

                try {
                    await navigator.clipboard.writeText(emailLink.textContent.trim());
                    const feedback = card.querySelector('.copied');
                    if (feedback) {
                        feedback.classList.remove('hidden');
                        setTimeout(() => feedback.classList.add('hidden'), 2000);
                    }
                } catch (err) {
                    console.error("Errore di copia: ", err);
                }
            });
        });
    }

    // ==========================================
    // 6. NAVIGAZIONE E TRANSIZIONI NATIVE
    // ==========================================
    function updateActiveNavbarStyle(activeButton, inactiveButtonsList) {
        activeButton.classList.add('bg-indigo-50/80', 'dark:bg-indigo-500/10', 'text-indigo-600', 'dark:text-indigo-400', 'font-bold');
        activeButton.classList.remove('text-slate-600', 'dark:text-slate-300', 'font-semibold');

        inactiveButtonsList.forEach(btn => {
            btn.classList.remove('bg-indigo-50/80', 'dark:bg-indigo-500/10', 'text-indigo-600', 'dark:text-indigo-400', 'font-bold');
            btn.classList.add('text-slate-600', 'dark:text-slate-300', 'font-semibold');
        });
    }

    async function switchSection(targetSection) {
        const sectionMapping = {
            "": elements.header,
            "skills": elements.skillsSection,
            "contacts": elements.contactsSection
        };

        const currentSectionElement = sectionMapping[config.activeSection];

        if (currentSectionElement) {
            currentSectionElement.classList.add('opacity-0');
            if (config.activeSection === "skills") {
                [elements.frontEndContainer, elements.backEndContainer, elements.toolsContainer].forEach(el => el.classList.add('opacity-0', 'translate-y-4'));
            } else if (config.activeSection === "contacts") {
                elements.contactBlocks.forEach(el => el.classList.add('opacity-0', 'translate-y-4'));
            }
            await delay(400);
            currentSectionElement.classList.add('hidden');
        }

        if (targetSection === elements.header) config.activeSection = "";
        else if (targetSection === elements.skillsSection) config.activeSection = "skills";
        else if (targetSection === elements.contactsSection) config.activeSection = "contacts";

        targetSection.classList.remove('hidden');
        targetSection.offsetHeight;
        targetSection.classList.remove('opacity-0');
    }

    elements.navHome.addEventListener("click", async () => {
        if (config.activeSection === "") return;
        updateActiveNavbarStyle(elements.navHome, [elements.navSkills, elements.navContacts]);
        await switchSection(elements.header);
        
        // Fai ripartire l'effetto scrittura al ritorno in Home
        clearTimeout(config.typingTimeout);
        elements.devTitle.textContent = "";
        idxTitle = 0;
        typingDevTitle();
    });

    elements.navSkills.addEventListener("click", async () => {
        if (config.activeSection === "skills") return;
        updateActiveNavbarStyle(elements.navSkills, [elements.navHome, elements.navContacts]);
        await switchSection(elements.skillsSection);
        
        const containers = [elements.frontEndContainer, elements.backEndContainer, elements.toolsContainer];
        containers.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.add('transition-all', 'duration-500');
                el.classList.remove('opacity-0', 'translate-y-4');
            }, idx * 150);
        });
    });

    elements.navContacts.addEventListener("click", async () => {
        if (config.activeSection === "contacts") return;
        updateActiveNavbarStyle(elements.navContacts, [elements.navHome, elements.navSkills]);
        await switchSection(elements.contactsSection);
        
        elements.contactBlocks.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.add('transition-all', 'duration-500');
                el.classList.remove('opacity-0', 'translate-y-4');
            }, idx * 150);
        });
    });

    // Boot delle impostazioni
    initTheme();
    initLanguage(); // <-- Gestisce la localizzazione iniziale e l'evento click
    initSkills();
    typingDevTitle();
    initNavbarAnimation();
    initClipboard();
});