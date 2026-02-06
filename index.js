const input = document.getElementById('terminal-input');
const terminalContent = document.getElementById('terminal-content');
const actionArea = document.getElementById('action-area');
const contactArea = document.getElementById('contact-area');
const projectsArea = document.getElementById('projects-area');
const termContainer = document.getElementById('terminal-container');
const homeBtn = document.getElementById('home-Btn')
const lines = document.getElementById('line');

let menuVisable = false;

let accessGranted = false;
const bootLogs = [
    "[OK] Initializing kernel...",
    "[OK] Loading NJIT_AI_MODULE...",
    "[OK] Establishing Secure Tunnel...",
    "[WARN] Unauthorized access attempt blocked...",
    "[OK] Decrypting user_profile: MZ_CYBER...",
    "[SUCCESS] Access Granted."
];
const menuLogs = [
    "<div class=\"line\"><span class=\"blue\">[SYSTEM]</span> Verifying Integrity... </div>",
    "<div class=\"line\">University: <span class=\"green\">New Jersey Institute of Technology</span></div>",
    "<div class=\"line\">Minor: <span class=\"green\">Artificial Intelligence</span></div><br>",
    "<div class=\"hero-text\">WELCOME_GUEST_USER</div>",
    "<p class=\"dim-text\">Authorized Session: Zuniga, Moises [SPRING_2026]</p>",
    "<p class=\"dim-text instruction-line\">>--- PRESS [ENTER] TO START ---<</p>",
]
// START PAGE IMPORTANT

async function startBootSequence() {
    const logContainer = document.getElementById('boot-logs');
    if (!logContainer) return;
    
    for(const log of bootLogs) {
        const line = document.createElement('div');
        line.textContent = log;
        logContainer.appendChild(line);

        await new Promise(resolve => setTimeout(resolve, 400));
    }
    await new Promise(r => setTimeout(r, 800));
    document.getElementById('boot-loader').style.display = 'none';
}


async function bootSystem() {
    const menuContainer = document.getElementById('menu-Logs');
    if (!menuContainer) return;

    for(const logContent of menuLogs) {
        const lina = document.createElement('div');
        lina.innerHTML = logContent;
        menuContainer.appendChild(lina);

        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 600));
    }
}

async function initPortfolio() {
    await startBootSequence();
    await new Promise(r => setTimeout(r, 800));
    await bootSystem();
}

function goHome() {
    projectsArea.classList.add('hidden');
    contactArea.classList.add('hidden');
    homeBtn.classList.add('hidden')
    const mainView = document.getElementById('main-menu-view');
    const menuContainer = document.getElementById('menu-Logs');
    if (mainView) {
        menuContainer.classList.remove('hidden');
        mainView.classList.remove('hidden');
    }

    input.focus()
    window.scrollTo(0, 0);
}
//LISTENS FOR ENTER KEY AND IF HEARS IT CONTINUES HANDLEMENU FUNCTION
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        if(!menuVisable) {
            actionArea.classList.remove('hidden');
            menuVisable = true;
            const instruction = document.querySelector('.instruction-line');
            if (instruction) instruction.style.display = "none";
        }
        else {
            handleMenu(val);
        }
        input.value = '';
    }
});

document.addEventListener('keydown', function(e) {
    if(e.key === "Escape") {
        goHome();
    }
});

//HIDES ALL CONTENT
function hideAll() {
    // We do NOT hide terminalContent anymore because you want it visible
    document.getElementById('main-menu-view').classList.add('hidden');
    projectsArea.classList.add('hidden');
    contactArea.classList.add('hidden');
    homeBtn.classList.add('hidden');

    const menuContainer = document.getElementById('menu-Logs');
    if(menuContainer) menuContainer.classList.add('hidden');
}

//OPEN RESUME
function openResume() {
    // This is the cleanest way to open a PDF in a new tab
    const resumeUrl = 'resume.pdf'; 
    window.open(resumeUrl, '_blank');
}
function handleMenu(choice) {
    const cmd = choice.toString().toLowerCase().trim();

    if (cmd === '1' || cmd === 'projects') {
        hideAll();
        document.getElementById('projects-area').classList.remove('hidden');
        homeBtn.classList.remove('hidden');
    } else if (cmd === '2' || cmd === 'contact') {
        hideAll();
        document.getElementById('contact-area').classList.remove('hidden');
        homeBtn.classList.remove('hidden');
    } else if (cmd === '3') {
        window.open('https://www.linkedin.com/in/moises-zuniga2034894/', '_blank');
    } else if (cmd === '4') {
        window.open('https://github.com/Moises-ITS', '_blank');
    } else if (cmd === '5' || cmd === 'resume') {
        openResume();
    } else if (cmd === 'back' || cmd === 'home' || cmd === "return") {
        goHome();
    }
}
window.onload = initPortfolio;
