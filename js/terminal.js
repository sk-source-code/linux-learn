document.addEventListener('DOMContentLoaded', () => {
    const terminalContainer = document.getElementById('terminal-body');
    if (!terminalContainer) return;

    // Initialize xterm.js
    const term = new Terminal({
        cursorBlink: true,
        theme: {
            background: 'transparent',
            foreground: '#e2e8f0',
            cursor: '#8b5cf6'
        },
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        cols: 60,
        rows: 12
    });

    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalContainer);
    fitAddon.fit();

    // Handle window resize
    window.addEventListener('resize', () => {
        fitAddon.fit();
    });

    // Mock File System
    let currentDir = '/home/user';
    
    // Structure: Directory is an array of strings. File is a string (content).
    const fileSystem = {
        '/home/user': ['documents', 'downloads', 'notes.txt', '.bashrc'],
        '/home/user/documents': ['resume.pdf', 'project.html'],
        '/home/user/downloads': ['linux_cheatsheet.pdf'],
        '/': ['bin', 'etc', 'home', 'var', 'usr', 'tmp'],
        // Mock file contents
        '/home/user/notes.txt': 'Learn Linux kernel architecture\nMaster iptables and nftables\nWrite bash scripts',
        '/home/user/.bashrc': 'alias ll="ls -la"\nexport PATH=$PATH:/usr/local/bin',
        '/home/user/documents/project.html': '<h1>Hello Linux</h1>\n<p>This is a test project.</p>'
    };

    const prompt = () => {
        const dir = currentDir === '/home/user' ? '~' : currentDir;
        term.write(`\r\n\x1b[1;32muser@linux\x1b[0m:\x1b[1;34m${dir}\x1b[0m$ `);
    };

    term.writeln('Welcome to the interactive Linux Terminal Simulator!');
    term.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands.');
    prompt();

    let input = '';

    term.onKey(e => {
        const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

        if (e.domEvent.keyCode === 13) { // Enter
            term.write('\r\n');
            processCommand(input.trim());
            input = '';
            prompt();
        } else if (e.domEvent.keyCode === 8) { // Backspace
            if (input.length > 0) {
                input = input.slice(0, -1);
                term.write('\b \b');
            }
        } else if (printable) {
            input += e.key;
            term.write(e.key);
        }
    });

    function processCommand(cmdStr) {
        if (!cmdStr) return;
        
        const args = cmdStr.split(' ');
        const cmd = args[0].toLowerCase();

        switch (cmd) {
            case 'help':
                term.writeln('Available mock commands:');
                term.writeln('  ls      List directory contents');
                term.writeln('  cd      Change directory');
                term.writeln('  pwd     Print working directory');
                term.writeln('  cat     Concatenate and print file contents');
                term.writeln('  echo    Print text to terminal');
                term.writeln('  whoami  Print current user');
                term.writeln('  date    Print system date/time');
                term.writeln('  uptime  Tell how long the system has been running');
                term.writeln('  clear   Clear terminal screen');
                break;
            case 'ls':
                const contents = fileSystem[currentDir] || [];
                if (Array.isArray(contents) && contents.length === 0) {
                    term.writeln('Directory is empty.');
                } else if (Array.isArray(contents)) {
                    term.writeln(contents.join('  '));
                } else {
                    term.writeln(`ls: cannot access '${currentDir}': Not a directory`);
                }
                break;
            case 'cd':
                const target = args[1];
                if (!target || target === '~') {
                    currentDir = '/home/user';
                } else if (target === '..') {
                    if (currentDir !== '/') {
                        const parts = currentDir.split('/');
                        parts.pop();
                        currentDir = parts.join('/') || '/';
                    }
                } else if (target === '/') {
                    currentDir = '/';
                } else {
                    const newPath = currentDir === '/' ? `/${target}` : `${currentDir}/${target}`;
                    if (fileSystem[newPath]) {
                        currentDir = newPath;
                    } else if (fileSystem[currentDir] && fileSystem[currentDir].includes(target)) {
                        term.writeln(`bash: cd: ${target}: Not a directory`);
                    } else {
                        term.writeln(`bash: cd: ${target}: No such file or directory`);
                    }
                }
                break;
            case 'pwd':
                term.writeln(currentDir);
                break;
            case 'cat':
                if (!args[1]) {
                    term.writeln('cat: missing file operand');
                    break;
                }
                const targetFile = args[1];
                let filePath = targetFile;
                if (!targetFile.startsWith('/')) {
                    filePath = currentDir === '/' ? `/${targetFile}` : `${currentDir}/${targetFile}`;
                }
                
                const fileContent = fileSystem[filePath];
                if (fileContent === undefined) {
                    term.writeln(`cat: ${targetFile}: No such file or directory`);
                } else if (Array.isArray(fileContent)) {
                    term.writeln(`cat: ${targetFile}: Is a directory`);
                } else {
                    // It's a file, print its contents properly handling newlines
                    const lines = fileContent.split('\n');
                    lines.forEach(line => term.writeln(line));
                }
                break;
            case 'echo':
                term.writeln(args.slice(1).join(' '));
                break;
            case 'whoami':
                term.writeln('user');
                break;
            case 'date':
                term.writeln(new Date().toString());
                break;
            case 'uptime':
                term.writeln(' 10:20:30 up 3 days,  4:20,  1 user,  load average: 0.01, 0.05, 0.02');
                break;
            case 'clear':
                term.clear();
                break;
            case 'sudo':
                term.writeln('user is not in the sudoers file. This incident will be reported.');
                break;
            default:
                term.writeln(`bash: ${cmd}: command not found`);
        }
    }
});
