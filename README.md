# React Instant CLI v2.1.6

A powerful, production-ready Node.js command-line tool for bootstrapping modern React applications with Vite, Tailwind CSS v4.0, Axios, and more—complete with optimized folder structures, parallelized installs, and automatic cleanup.

## 🚀 Features

**Effortless Project Creation**  
Instantly scaffold a Vite + React template with a single command, auto-resolving naming conflicts.

**Optimized Installation**  
Leverages `npm ci` when possible and installs core dependencies in parallel to minimize setup time.

**Clean Workspace**  
Automatically prunes redundant `node_modules` folders and removes CLI installation artifacts from your working directory.

**Production-Ready Defaults**  
Includes a fully configured:
- **Tailwind CSS v4.0** setup with custom themes and utility classes  
- **Axios** instance with request/response interceptors  
- **React Router** routing boilerplate  
- Robust meta tags, PWA manifest, and security headers in `index.html`

**Opinionated Folder Structure**  
Organizes your code into logical directories:
```
src/
├─ assets/
│  ├─ icons/
│  └─ images/
├─ components/
│  ├─ layout/
│  └─ ui/
├─ context/
├─ hooks/
├─ pages/
├─ services/
├─ styles/
└─ utils/
public/
```

**Built-in Utilities**  
Includes helper functions for date formatting, debouncing, ID generation, and string capitalization.

## 📦 Installation

```bash
# Globally install the CLI
npm install -g react-instant-cli

# Or use npx (no global install required)
npx react-instant-cli
```

## ⚡ Quick Start

```bash
# Run the CLI and follow prompts
react-instant-cli

# Or with npx
npx react-instant-cli
```

You’ll be prompted to enter a folder name (default: `my-vite-app`). If that name already exists, the CLI will append a counter (e.g., `my-vite-app-1`) automatically.

## 🔧 Configuration

After project creation, navigate into your new app directory:

```bash
cd my-vite-app
```

Environment variables are defined in:

- `.env` (local overrides)  
- `.env.example` (template)

Default values:
```
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_APP_NAME=My Vite App
VITE_APP_VERSION=1.0.0
```

Tailwind and Vite configurations are provided in `tailwind.config.js` and `vite.config.js` respectively.

## 📖 Available Scripts

Inside your project directory, run:

- `npm run dev`  
  Start Vite development server (hot-reload).

- `npm run build`  
  Generate production build to `dist/`.

- `npm run preview`  
  Preview the production build locally.

- `npm run lint`  
  Run ESLint with zero-warning enforcement.

## 📁 Folder Structure

```
.
├─ public/
│  └─ manifest.json
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ context/
│  ├─ hooks/
│  ├─ pages/
│  ├─ services/
│  ├─ styles/
│  └─ utils/
├─ .env
├─ .gitignore
├─ index.html
├─ package.json
├─ README.md
└─ vite.config.js
```

## 🧹 Cleanup

Upon completion, the CLI will:

- Remove extra `node_modules` trees  
- Delete temporary CLI installation files (`package.json`, `.npm`, logs) from the original working directory

## 📄 License

MIT License

***

Enjoy a streamlined React development experience—get started in seconds and focus on building features, not boilerplate.
