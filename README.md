# Linux Knowledge Base 🐧

A comprehensive, interactive reference guide and documentation hub for Linux system administration, networking, kernel architecture, and shell scripting.

## Features ✨

### 📖 Deep Technical Content
- **100+ Core & Network Commands**: Detailed documentation including syntax, essential flags, and real-world examples for `ls`, `grep`, `awk`, `iptables`, `nmap`, `tcpdump`, and many more.
- **Kernel Architecture**: Visual diagrams of kernel layers, system calls, and how user space interacts with hardware.
- **File Systems Deep Dive**: Inodes, superblocks, journaling, ext4/XFS/Btrfs/ZFS comparisons, LVM, and administrative commands.
- **Networking & OSI Model**: Layer-by-layer breakdown with associated commands at each level.
- **Shell Scripting Masterclass**: 10 tabbed sections covering variables, arrays, string manipulation, conditionals, loops, I/O redirection, functions, error handling, cron jobs, and one-liners.
- **Advanced System Internals**: Systemd service management, Linux security modules (SELinux/AppArmor), containerization primitives (namespaces/cgroups), and eBPF/nftables.

### 🎮 Interactive Features
- **Terminal Simulator**: A fully functional mock terminal powered by [xterm.js](https://xtermjs.org/) with a virtual filesystem. Try `ls`, `cd`, `cat`, `pwd`, `whoami`, `hostname`, `uname -a`, and more — right in the browser.
- **Command Quiz**: Test your Linux knowledge with dynamically generated quiz questions pulled from the command database. Tracks your score with instant feedback.
- **Instant Search** (`Ctrl+K`): Fuzzy search across all 100+ commands, flags, and descriptions with keyboard navigation.

### 🎨 Design & UX
- **Light/Dark Mode Toggle**: Persists your preference via `localStorage` with system preference detection fallback.
- **Modern Glassmorphism UI**: Responsive design with backdrop blur, gradient accents, and smooth micro-animations.
- **Mobile Responsive**: Hamburger menu sidebar navigation, adaptive grids, and touch-friendly tab interfaces.
- **Accessible**: ARIA attributes on interactive elements, semantic HTML5, keyboard navigable.

## Tech Stack 🛠️

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic, accessible markup |
| **Vanilla CSS3** | Custom design system with CSS variables, light/dark theming |
| **Vanilla JavaScript** | DOM manipulation, IntersectionObserver, event delegation |
| **[Lucide Icons](https://lucide.dev/)** | Clean, scalable SVG iconography |
| **[xterm.js](https://xtermjs.org/)** | Interactive terminal emulator |

**Zero build tools. Zero bundlers. Zero frameworks.** Just open `index.html` and go.

## Getting Started 🚀

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sk-source-code/linux-learn.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd linux-learn
   ```
3. **Open `index.html` in your browser:**
   Simply double-click the `index.html` file, or serve it using a local development server for the best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js / npx
   npx serve .
   ```
4. **Access on mobile (same Wi-Fi):**
   ```bash
   # Find your local IP
   ip addr show  # Linux
   ipconfig       # Windows
   
   # Then open http://<your-ip>:8000 on your phone
   ```

## Repository Structure 📂

```
linux-learn/
├── index.html          # Main entry point (single-page application)
├── css/
│   └── styles.css      # Complete design system, responsive layout, light/dark themes
├── js/
│   ├── app.js          # Core logic: search, tabs, mobile nav, scroll spy, theme toggle
│   ├── content.js      # Command database (100+ commands) and HTML rendering
│   ├── terminal.js     # Interactive terminal simulator with mock filesystem
│   └── quiz.js         # Command quiz engine with score tracking
├── .github/
│   ├── workflows/
│   │   └── pages.yml   # GitHub Pages auto-deployment
│   ├── ISSUE_TEMPLATE/ # Bug report & feature request templates
│   └── PULL_REQUEST_TEMPLATE.md
├── README.md
├── LICENSE             # MIT License
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

## Contributing 🤝

Contributions, issues, and feature requests are welcome! 

**Adding a command is easy:**
1. Fork the project.
2. Edit `js/content.js` to add your command to the `coreCommands` or `networkCommands` arrays.
3. Submit a pull request!

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
