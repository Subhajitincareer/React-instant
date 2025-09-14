#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Support __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for better CLI experience
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Function to remove extra node_modules directories
async function removeExtraNodeModules(baseDir) {
  log('🧹 Cleaning up extra node_modules directories...', 'yellow');

  async function walk(dir) {
    try {
      const files = await fs.readdir(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          // Skip the main node_modules folder
          if (file === 'node_modules' && path.resolve(fullPath) !== path.resolve(path.join(baseDir, 'node_modules'))) {
            log(`   Removing: ${fullPath}`, 'red');
            await fs.remove(fullPath);
          } else if (file !== 'node_modules' && file !== '.git') {
            await walk(fullPath);
          }
        }
      }
    } catch (error) {
      // Silently skip if directory is not accessible
    }
  }

  await walk(baseDir);
  log('✅ Extra node_modules cleanup completed!', 'green');
}

// Enhanced cleanup function to remove CLI installation files
async function cleanupCLIFiles(workingDir, projectDir) {
  log('🧹 Cleaning CLI installation files...', 'yellow');

  try {
    // Only cleanup if working directory is different from project directory
    if (path.resolve(workingDir) === path.resolve(projectDir)) {
      log('   Skipping CLI cleanup (same directory)', 'cyan');
      return;
    }

    // Check if CLI files exist in working directory
    const cliFilesToRemove = [
      'node_modules',
      'package.json',
      'package-lock.json',
      '.npm',
      'npm-debug.log',
      '.npmrc'
    ];

    let filesRemoved = 0;
    for (const file of cliFilesToRemove) {
      const filePath = path.join(workingDir, file);
      try {
        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath);
          log(`   ✅ Removed CLI file: ${file}`, 'green');
          filesRemoved++;
        }
      } catch (error) {
        log(`   ⚠️ Could not remove: ${file}`, 'yellow');
      }
    }

    if (filesRemoved > 0) {
      log(`✅ CLI cleanup completed! Removed ${filesRemoved} files.`, 'green');
    } else {
      log('✅ No CLI files to cleanup.', 'green');
    }

  } catch (error) {
    log('⚠️ CLI cleanup failed, but project created successfully', 'yellow');
  }
}

// Enhanced user input function
async function getUserFolder() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`${colors.cyan}📁 Enter folder name for your Vite React project (default: my-vite-app): ${colors.reset}`, (answer) => {
      rl.close();

      let folderName = answer.trim() || 'my-vite-app';
      let counter = 1;

      // Auto-resolve naming conflicts
      while (fs.existsSync(folderName)) {
        folderName = `${answer.trim() || 'my-vite-app'}-${counter}`;
        counter++;
      }

      if (counter > 1) {
        log(`⚠️  Folder "${answer.trim() || 'my-vite-app'}" exists. Using "${folderName}" instead.`, 'yellow');
      }

      resolve(folderName);
    });
  });
}

// Safe execution with error handling
function safeExec(command, options = {}) {
  try {
    log(`🔄 Running: ${command}`, 'blue');
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return false;
  }
}

// Speed optimization: Install packages in parallel
async function optimizedInstall(baseDir) {
  log('⚡ Installing dependencies with optimization...', 'blue');

  // Use npm ci for faster installation if package-lock.json exists
  const hasLockFile = await fs.pathExists(path.join(baseDir, 'package-lock.json'));

  if (hasLockFile) {
    safeExec('npm ci');
  } else {
    safeExec('npm install');
  }

  // Install additional packages in parallel
  log('📦 Installing additional packages...', 'blue');
  safeExec('npm install axios react-router-dom tailwindcss @tailwindcss/vite --silent');
}

// Main function
async function createViteReactSetup() {
  // Store working directory before changing
  const originalWorkingDir = process.cwd();

  console.clear();
  log('🚀 React Instant CLI v2.1.3 - Enhanced Setup', 'cyan');
  log('=============================================\n', 'cyan');

  // Get user input
  const userFolder = await getUserFolder();
  const baseDir = path.resolve(originalWorkingDir, userFolder);

  log(`\n🚀 Creating Vite React project in folder: ${userFolder}`, 'green');

  // Create Vite React project
  log('⚡ Creating Vite project with React template...', 'blue');
  if (!safeExec(`npm create vite@latest ${userFolder} -- --template react`)) {
    log('❌ Failed to create Vite project', 'red');
    process.exit(1);
  }

  // Change to project directory
  process.chdir(baseDir);

  // Optimized installation
  await optimizedInstall(baseDir);

  // Remove extra node_modules immediately after installation
  await removeExtraNodeModules(baseDir);

  // Create folder structure
  log('📁 Creating optimized folder structure...', 'blue');
  const folders = [
    'src/components/ui',
    'src/components/layout',
    'src/pages',
    'src/hooks',
    'src/services',
    'src/utils',
    'src/context',
    'src/assets/images',
    'src/assets/icons',
    'src/styles',
    'public'
  ];

  await Promise.all(
    folders.map(folder => fs.ensureDir(path.join(baseDir, folder)))
  );

  // Create all files in parallel for speed
  log('📄 Setting up project files...', 'blue');

  const fileOperations = [
    // Production-ready index.html
    fs.writeFile(path.join(baseDir, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>%VITE_APP_NAME% | Modern React App</title>
  <meta name="title" content="%VITE_APP_NAME% | Modern React App" />
  <meta name="description" content="A modern React application built with Vite, Tailwind CSS v4.0, and Axios for rapid development" />
  <meta name="keywords" content="react, vite, tailwind, axios, javascript, frontend, webapp" />
  <meta name="author" content="Your Name" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-domain.com/" />
  <meta property="og:title" content="%VITE_APP_NAME% | Modern React App" />
  <meta property="og:description" content="A modern React application built with Vite, Tailwind CSS v4.0, and Axios for rapid development" />
  <meta property="og:image" content="/og-image.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://your-domain.com/" />
  <meta property="twitter:title" content="%VITE_APP_NAME% | Modern React App" />
  <meta property="twitter:description" content="A modern React application built with Vite, Tailwind CSS v4.0, and Axios for rapid development" />
  <meta property="twitter:image" content="/twitter-image.png" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="theme-color" content="#3b82f6" />
  <meta name="msapplication-TileColor" content="#3b82f6" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="DENY" />
  <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <link rel="manifest" href="/manifest.json" />
  <style>
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #f9fafb;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    #root:not(:empty) + .loading-container {
      display: none;
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-900 antialiased">
  <div id="root"></div>
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  <script type="module" src="/src/main.jsx"></script>
  <noscript>
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
      <h1>JavaScript Required</h1>
      <p>This application requires JavaScript to run. Please enable JavaScript in your browser.</p>
    </div>
  </noscript>
</body>
</html>`),

    // .gitignore
    fs.writeFile(path.join(baseDir, '.gitignore'), `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage
*.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# public

# Vite build output
dist/
dist-ssr/

# Rollup build output
build/

# Storybook build outputs
.out
.storybook-out
storybook-static

# Temporary folders
tmp/
temp/

# SvelteKit build / generate output
.svelte-kit

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Local Netlify folder
.netlify

# Vercel
.vercel`),

    // PWA manifest.json
    fs.writeFile(path.join(baseDir, 'public/manifest.json'), `{
  "name": "My Vite React App",
  "short_name": "ViteApp", 
  "description": "A modern React application built with Vite and Tailwind CSS",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f9fafb",
  "theme_color": "#3b82f6",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/favicon.png",
      "sizes": "192x192", 
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`),

    // Tailwind CSS setup
    fs.writeFile(path.join(baseDir, 'src/index.css'), `@import "tailwindcss";

@theme {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
}

@layer base {
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}`),

    // App.jsx
    fs.writeFile(path.join(baseDir, 'src/App.jsx'), `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;`),

    // Layout component
    fs.writeFile(path.join(baseDir, 'src/components/layout/Layout.jsx'), `import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-custom py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;`),

    // Header component  
    fs.writeFile(path.join(baseDir, 'src/components/layout/Header.jsx'), `import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            My App
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;`),

    // Footer component
    fs.writeFile(path.join(baseDir, 'src/components/layout/Footer.jsx'), `const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container-custom py-6">
        <p className="text-center text-gray-600">
          © 2025 My App. Built with Vite + React + Tailwind CSS v4.0.
        </p>
      </div>
    </footer>
  );
};

export default Footer;`),

    // Home page
    fs.writeFile(path.join(baseDir, 'src/pages/Home.jsx'), `import { useState } from 'react';
import { fetchData } from '../services/api';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleFetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Vite + React + Tailwind v4.0
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        This is a clean starter template with Vite, React, Tailwind CSS v4.0, 
        Axios, and React Router pre-configured for rapid development.
      </p>
      
      <div className="space-y-4">
        <button 
          onClick={handleFetchData}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Test API Call'}
        </button>
        
        {data && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto">
            <p className="text-green-800">API Response received!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;`),

    // About page
    fs.writeFile(path.join(baseDir, 'src/pages/About.jsx'), `const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-4">
          This project was created with a custom CLI tool that sets up a modern 
          React development environment with the following technologies:
        </p>
        
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li><strong>Vite</strong> - Fast build tool and dev server</li>
          <li><strong>React</strong> - UI library</li>
          <li><strong>Tailwind CSS v4.0</strong> - Latest utility-first CSS framework</li>
          <li><strong>Axios</strong> - HTTP client for API calls</li>
          <li><strong>React Router</strong> - Client-side routing</li>
        </ul>
        
        <p className="text-gray-600 mt-6">
          The project includes a well-organized folder structure, 
          pre-configured components, and ready-to-use utilities with the latest Tailwind v4.0.
        </p>
      </div>
    </div>
  );
};

export default About;`),

    // API service
    fs.writeFile(path.join(baseDir, 'src/services/api.js'), `import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchData = async () => {
  try {
    const response = await api.get('/posts/1');
    return response;
  } catch (error) {
    throw error;
  }
};

export const postData = async (data) => {
  try {
    const response = await api.post('/posts', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;`),

    // Utility functions
    fs.writeFile(path.join(baseDir, 'src/utils/helpers.js'), `export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};`),

    // Environment variables
    fs.writeFile(path.join(baseDir, '.env'), `VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_APP_NAME=My Vite App
VITE_APP_VERSION=1.0.0`),

    // .env.example
    fs.writeFile(path.join(baseDir, '.env.example'), `VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=My Vite App
VITE_APP_VERSION=1.0.0`),

    // README.md
    fs.writeFile(path.join(baseDir, 'README.md'), `# ${userFolder}

A modern React application built with **Vite**, **React**, **Tailwind CSS v4.0**, **Axios**, and **React Router**.

## 🚀 Quick Start

\`\`\`bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
\`\`\`

## 📦 Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library with hooks
- **Tailwind CSS v4.0** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

## 🔧 Configuration

- **Environment Variables**: See \`.env.example\`
- **Tailwind Config**: \`tailwind.config.js\`
- **Vite Config**: \`vite.config.js\`

## 🚀 Deployment

Build the project:
\`\`\`bash
npm run build
\`\`\`

The \`dist/\` folder contains the production build ready for deployment.

## 📄 License

MIT`)
  ];

  // Execute all file operations in parallel
  await Promise.all(fileOperations);

  // Update package.json
  log('🔧 Updating package.json...', 'blue');
  const packageJsonPath = path.join(baseDir, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

  packageJson.scripts = {
    ...packageJson.scripts,
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  };

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Update vite.config.js
  await fs.writeFile(path.join(baseDir, 'vite.config.js'), `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          axios: ['axios'],
        },
      },
    },
  },
})`);

  // Final cleanup - remove extra node_modules from project
  await removeExtraNodeModules(baseDir);

  // **CRITICAL: Clean CLI installation files from original working directory**
  await cleanupCLIFiles(originalWorkingDir, baseDir);

  // Optional package updates (skip if slow)
  try {
    log('🔄 Updating packages to latest versions...', 'blue');
    safeExec('npx npm-check-updates -u --silent');
    safeExec('npm install --silent');
  } catch (error) {
    log('⚠️  Package update skipped for speed', 'yellow');
  }

  // Success message
  log('\n🎉 Setup completed successfully!', 'green');
  log('===============================', 'green');
  log(`📁 Project created: ${userFolder}`, 'cyan');
  log('🧹 Workspace automatically cleaned!', 'cyan');
  log('🚀 Ready to start development!', 'cyan');

  // Start dev server
  log('\n🚀 Starting development server...', 'blue');
  safeExec('npm run dev');
}

// Run the main function
createViteReactSetup().catch((error) => {
  log(`❌ Setup failed: ${error.message}`, 'red');
  process.exit(1);
});
