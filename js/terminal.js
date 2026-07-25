/**
 * Terminal Animation Engine
 */

const terminalSequence = [
    { type: 'command', text: 'uname -a' },
    { type: 'output', text: 'Linux kernel-dev 6.1.0-11-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.38-4 x86_64 GNU/Linux' },
    { type: 'command', text: 'whoami' },
    { type: 'output', text: 'root' },
    { type: 'command', text: 'uptime' },
    { type: 'output', text: ' 14:32:01 up 45 days, 12:15,  2 users,  load average: 0.15, 0.08, 0.01' },
    { type: 'command', text: 'echo "Welcome to the Linux Knowledge Base!"' },
    { type: 'output', text: 'Welcome to the Linux Knowledge Base!' },
    { type: 'command', text: 'cat /etc/os-release' },
    { type: 'output', text: 'PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"<br>NAME="Debian GNU/Linux"<br>VERSION_ID="12"<br>VERSION="12 (bookworm)"' }
];

const terminalBody = document.getElementById('terminal-body');
const typingSpeed = 50; // ms per char
const delayBetweenCommands = 1000; // ms
const promptText = '<span class="term-prompt">user@linux:~$</span>';

let seqIndex = 0;

function typeText(element, text, index, callback) {
    if (index < text.length) {
        element.appendChild(document.createTextNode(text.charAt(index)));
        setTimeout(() => {
            typeText(element, text, index + 1, callback);
        }, typingSpeed);
    } else {
        if (callback) callback();
    }
}

function processSequence() {
    if (seqIndex >= terminalSequence.length) {
        // Add final prompt with blinking cursor
        const finalLine = document.createElement('div');
        finalLine.className = 'term-line';
        finalLine.innerHTML = `${promptText} <span class="term-cursor"></span>`;
        terminalBody.appendChild(finalLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
    }

    const item = terminalSequence[seqIndex];
    const lineElement = document.createElement('div');
    lineElement.className = 'term-line';

    if (item.type === 'command') {
        lineElement.innerHTML = `${promptText} <span class="term-command"></span><span class="term-cursor"></span>`;
        terminalBody.appendChild(lineElement);
        const cmdSpan = lineElement.querySelector('.term-command');
        const cursor = lineElement.querySelector('.term-cursor');
        
        typeText(cmdSpan, item.text, 0, () => {
            cursor.remove(); // Remove cursor after typing
            seqIndex++;
            setTimeout(processSequence, delayBetweenCommands / 2);
        });
    } else if (item.type === 'output') {
        lineElement.innerHTML = `<div class="term-output">${item.text}</div>`;
        terminalBody.appendChild(lineElement);
        seqIndex++;
        setTimeout(processSequence, delayBetweenCommands);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Start animation when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add small delay before starting
    setTimeout(processSequence, 1000);
});
