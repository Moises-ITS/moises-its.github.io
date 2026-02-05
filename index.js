const input = document.getElementById('terminal-input');
const terminalContent = document.getElementById('terminal-content');
const actionArea = document.getElementById('action-area');
const contactArea = document.getElementById('contact-area');

let accessGranted = false;

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

function handleMenu(choice) {
    const cmd = choice.toLowerCase();

    function hideAll() {
        actionArea.classList.add('hidden');
        contactArea.classList.add('hidden');
        document.getElementById('projects-area').classList.add('hidden');
        // terminalContent.classList.add('hidden'); <-- REMOVED THIS LINE
    }

    if (cmd === '1') {
        hideAll();
        document.getElementById('projects-area').classList.remove('hidden');
    }
    else if (cmd === '2') {
        hideAll();
        contactArea.classList.remove('hidden');
    }
    else if (cmd === '3') {
        window.open('https://www.linkedin.com/in/moises-zuniga2034894/', '_blank');
    }
    else if (cmd === '4') {
        window.open('https://github.com/Moises-ITS', '_blank'); // Update with your actual GitHub
    }
    else if (cmd === '5') {
        downloadResume();
    }
    else if (cmd === 'back') {
        hideAll();
        actionArea.classList.remove('hidden');
    }
}

function downloadResume() {
    const hiddenLink = document.createElement('a');
    hiddenLink.href = 'resume.pdf'; 
    hiddenLink.download = 'Moises_Zuniga_Resume.pdf';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
    document.body.removeChild(hiddenLink);
}

// Helper to print text to the screen if you want feedback
function printToTerminal(text) {
    const line = document.createElement('p');
    line.innerHTML = `<span class="blue">[SYSTEM]:</span> ${text}`;
    actionArea.appendChild(line);
}
