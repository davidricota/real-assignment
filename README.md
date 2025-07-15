# Real Assignment – Custom WordPress Blocks (Technical Challenge)

This repository contains a custom WordPress plugin developed as a technical challenge deliverable. The plugin provides several modern, reusable blocks for the WordPress block editor, focusing on visual appeal, interactivity, and clean code structure.

---

## What does this plugin do?

- Adds custom visual and functional blocks to the WordPress editor.
- Enables modern effects like parallax, animated counters, and flexible layouts.
- Designed to be easy to use and customize from the block editor.

---

## Included Blocks

### 🛠️ Proprietary Tools
A visual block with tabs and a smooth parallax effect. Perfect for showcasing tools, features, or services in an interactive and modern way.

### 🎯 Comprehensive Benefits
A benefits block with a flexible layout and automatic numbering. Allows rich (HTML) content and adapts to different visual styles.

### 🕰️ Legacy (Animated Counter)
An animated counter block that increments up to a target value when it enters the viewport. Great for displaying metrics, percentages, or achievements in an eye-catching way.

---

## Installation & Usage

1. **Install the plugin** like any other WordPress plugin (copy the folder to `wp-content/plugins`).
2. **Activate it** from the WordPress admin panel.
3. **Add the blocks** from the page or post editor.
4. **Customize** the content and styles visually.

---

## Development & Build Commands

All commands are run from the plugin root directory:

- `npm install` – Install all development dependencies.
- `npm run build` – Compile all assets (JS/CSS) and copy necessary files to the `build/` directory.
- `npm run start` – Start development mode with file watchers for SCSS and JS, and the WordPress scripts in watch mode.
- `npm run dist` – Create a production-ready ZIP in the `dist/` folder, containing only the final plugin files (no source or dev files).

**Note:** The source code is in `/src`. The distributable plugin is in `/build` and the ZIP for deployment is in `/dist`.

---

## Development Notes

- Source code is in `/src`.
- The final build is generated in `/build`.
- Build and distribution scripts are available in `package.json`.
- `.gitignore` is set up to exclude build artifacts, node_modules, and other development files.

---

Made with ❤️ for WordPress technical challenges. 