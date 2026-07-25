# Contributing to Linux Knowledge Base

First off, thank you for considering contributing to the Linux Knowledge Base! It's people like you that make open-source such a great community to learn, inspire, and create.

## How Can I Contribute?

### 1. Adding New Commands or Concepts
If you notice a crucial Linux command, networking concept, or kernel feature that is missing, you can easily add it:
1. Navigate to `js/content.js`.
2. Locate either the `coreCommands` or `networkCommands` array.
3. Add a new object following the existing structure (ensure you include `name`, `category`, `description`, `syntax`, `flags`, and `examples`).
4. Keep HTML tags out of the raw strings; the application securely escapes and renders them.

### 2. Reporting Bugs
If you find a typo, visual bug, or broken functionality:
- Check if the issue has already been reported in the Issues tab.
- If not, open a new issue using the **Bug Report** template.

### 3. Submitting a Pull Request
1. Fork the project.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request following our PR template.

## Code Style
- Use Vanilla JavaScript (ES6+).
- Do not add external dependencies unless absolutely necessary (the goal is to remain lightweight).
- Ensure your CSS changes use the existing CSS variables defined in `styles.css`.
