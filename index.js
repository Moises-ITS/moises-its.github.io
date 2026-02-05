const input = document.getElementById('terminal-input');
const terminalContent = document.getElementById('terminal-content');
const actionArea = document.getElementById('action-area');
const contactArea = document.getElementById('contact-area');

let accessGranted = false;
const bootLogs = [
    "[OK] Initializing kernel...",
    "[OK] Loading NJIT_AI_MODULE...",
    "[OK] Establishing Secure Tunnel...",
    "[WARN] Unauthorized access attempt blocked...",
    "[OK] Decrypting user_profile: MZ_CYBER...",
    "[SUCCESS] Access Granted."
];

function startBootSequence() {
    const logContainer = document.getElementById('boot-logs');
    let i = 0;

    // 1. Display Logs one by one
    const interval = setInterval(() => {
        if (i < bootLogs.length) {
            const line = document.createElement('div');
            line.textContent = bootLogs[i];
            logContainer.appendChild(line);
            i++;
        } else {
            clearInterval(interval);
            // 2. Hide loader after 1 second delay
            setTimeout(() => {
                document.getElementById('boot-loader').style.display = 'none';
            }, 1000);
        }
    }, 300); // Speed of the boot logs
}

// Start on page load
window.onload = startBootSequence;
document.addEventListener('click', () => {
    input.focus();
});

function goHome() {
    hideAll();
    document.getElementById('action-area').classList.remove('hidden');
    document.getElementById('home-Btn').classList.add('hidden');
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        input.value = ''; // Clear input field after pressing enter
        if (!accessGranted) {
            // Step 1: Reveal the Menu
            accessGranted = true;
            terminalContent.classList.add('hidden'); // Hide the welcome text
            actionArea.classList.remove('hidden');   // Show the menu
        } else {
            // Step 2: Handle Menu Choices
            handleMenu(val);
        }
    }
});
document.addEventListener('keydown', function(event) {
    if(event.key === "Escape") {
        const mainMenu = document.getElementById('action-area');

        if (mainMenu.classList.contains('hidden')){
            goHome();
        }
    }
});

function hideAll() {
    const sections = ['action-area', 'contact-area', 'projects-area', 'terminal-content'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    document.getElementById('home-Btn').classList.add('hidden');
}

function handleMenu(choice) {
    const cmd = choice.toString().toLowerCase().trim();

    if (cmd === '1' || cmd === 'projects') {
        hideAll();
        document.getElementById('projects-area').classList.remove('hidden');
        document.getElementById('home-Btn').classList.remove('hidden');
    } else if (cmd === '2' || cmd === 'contact') {
        hideAll();
        document.getElementById('contact-area').classList.remove('hidden');
        document.getElementById('home-Btn').classList.remove('hidden');
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

function openResume() {
    // This is the cleanest way to open a PDF in a new tab
    const resumeUrl = 'resume.pdf'; 
    window.open(resumeUrl, '_blank');
    
    // Optional: Print a status message to your terminal
    printToTerminal("Opening 'resume.pdf' in secure external buffer...");
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleMenu(input.value);
        input.value = '';
    }
});

// Helper to print text to the screen if you want feedback
function printToTerminal(text) {
    const line = document.createElement('p');
    line.innerHTML = `<span class="blue">[SYSTEM]:</span> ${text}`;
    actionArea.appendChild(line);
}
