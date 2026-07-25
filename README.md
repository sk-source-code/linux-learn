# Linux Knowledge Base 🐧

A comprehensive, interactive reference guide and documentation hub for Linux system administration, networking, kernel architecture, and shell scripting.

## Features ✨

- **100+ Core & Network Commands**: Detailed documentation including syntax, essential flags, and real-world examples.
- **Interactive Terminal Animation**: A dynamic typing preview demonstrating basic terminal interactions.
- **Deep Dives**: Sections covering Linux Fundamentals, the File System Hierarchy (FHS), Kernel Layers, OSI Model, and Advanced Networking (eBPF).
- **Modern UI**: A responsive, sleek Dark Mode interface utilizing glassmorphism and custom scroll animations.
- **Keyboard Navigation**: Press `Ctrl+K` from anywhere to open the instant fuzzy-search modal.
- **Accessible & SEO Friendly**: Follows web accessibility guidelines (ARIA attributes) and semantic HTML structure.

## Tech Stack 🛠️

- **HTML5**: Semantic and accessible markup.
- **Vanilla CSS3**: Custom design system built with CSS variables (`styles.css`). No heavy frameworks required.
- **Vanilla JavaScript**: Pure DOM manipulation, scroll-spy navigation, intersection observers, and event delegation (`app.js`, `content.js`, `terminal.js`).
- **Lucide Icons**: Clean, scalable SVG iconography.

## Getting Started 🚀

Because this project is built entirely with client-side vanilla web technologies, there are no build steps, bundlers, or dependencies required.

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

## Repository Structure 📂

- `/css/styles.css` — The complete design system and responsive layout styling.
- `/js/app.js` — Core application logic (search, tabs, mobile nav, scroll spy).
- `/js/content.js` — The database of Linux commands and the HTML rendering templates.
- `/js/terminal.js` — The logic powering the interactive terminal typing animation.
- `/index.html` — The main entry point and structural template.

## Contributing 🤝

Contributions, issues, and feature requests are welcome! 
If you have a Linux command or concept you'd like to add:
1. Fork the project.
2. Edit `js/content.js` to add your command to the `coreCommands` or `networkCommands` arrays.
3. Submit a pull request!

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
