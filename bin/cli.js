#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Support __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get user input for folder name
async function getUserFolder() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('📁 Enter folder name for your Vite React project (default: my-vite-app): ', (answer) => {
      rl.close();
      resolve(answer.trim() || 'my-vite-app');
    });
  });
}

async function createViteReactSetup() {
  // Get user input for folder name
  const userFolder = await getUserFolder();
  const baseDir = path.resolve(process.cwd(), userFolder);

  console.log(`🚀 Creating Vite React project in folder: ${userFolder}`);

  // Create Vite React project
  console.log('⚡ Creating Vite project with React template...');
  execSync(`npm create vite@latest ${userFolder} -- --template react`, { stdio: 'inherit' });

  // Change to project directory
  process.chdir(baseDir);

  console.log('📦 Installing base dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Install additional dependencies with Tailwind v4.0
  console.log('📦 Installing Axios, Tailwind CSS v4.0, and additional packages...');
  execSync('npm install axios react-router-dom', { stdio: 'inherit' });
  execSync('npm install tailwindcss @tailwindcss/vite', { stdio: 'inherit' });

  // Create standard folder structure
  console.log('📁 Creating standard folder structure...');
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

  folders.forEach(folder => fs.mkdirSync(path.join(baseDir, folder), { recursive: true }));

  // Create production-ready index.html
  console.log('📄 Setting up production-ready index.html...');
  await fs.writeFile(path.join(baseDir, 'index.html'), `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Primary Meta Tags -->
  <title>%VITE_APP_NAME% | Modern React App</title>
  <meta name="title" content="%VITE_APP_NAME% | Modern React App" />
  <meta name="description" content="A modern React application built with Vite, Tailwind CSS v4.0, and Axios for rapid development" />
  <meta name="keywords" content="react, vite, tailwind, axios, javascript, frontend, webapp" />
  <meta name="author" content="Your Name" />
  <meta name="robots" content="index, follow" />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-domain.com/" />
  <meta property="og:title" content="%VITE_APP_NAME% | Modern React App" />
  <meta property="og:description" content="A modern React application built with Vite, Tailwind CSS v4.0, and Axios for rapid development" />
  <meta property="og:image" content="/og-image.png" />
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://your-domain.com/" />
  <meta property="twitter:title" content="%VITE_APP_NAME% | Modern React App" />
  <meta property="twitter:description" content="A modern React application built with Vite, Tailwind CSS v4.0, and Axios for rapid development" />
  <meta property="twitter:image" content="/twitter-image.png" />
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <!-- Theme Color -->
  <meta name="theme-color" content="#3b82f6" />
  <meta name="msapplication-TileColor" content="#3b82f6" />
  <!-- Preconnect to external domains for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <!-- Security Headers -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="DENY" />
  <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
  <!-- Performance and Caching -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <!-- PWA Support -->
  <link rel="manifest" href="/manifest.json" />
  <!-- Critical CSS will be inlined here during build -->
  <style>
    /* Loading spinner */
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
    
    /* Hide loading when React loads */
    #root:not(:empty) + .loading-container {
      display: none;
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-900 antialiased">
  <!-- App Container -->
  <div id="root"></div>
  <!-- Loading Fallback -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  <!-- Module Script -->
  <script type="module" src="/src/main.jsx"></script>
  <!-- No Script Fallback -->
  <noscript>
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
      <h1>JavaScript Required</h1>
      <p>This application requires JavaScript to run. Please enable JavaScript in your browser.</p>
    </div>
  </noscript>
</body>
</html>
    `.trim());

  // Create .gitignore file
  console.log('🔒 Creating .gitignore file...');
  await fs.writeFile(path.join(baseDir, '.gitignore'), `
# Logs
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
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
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

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional stylelint cache
.stylelintcache

# SvelteKit build / generate output
.svelte-kit

# End of https://www.toptal.com/developers/gitignore/api/node

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
.vercel
    `.trim());

  // Create PWA manifest.json
  await fs.writeFile(path.join(baseDir, 'public/manifest.json'), `
{
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
}
    `.trim());

  // Update CSS file with Tailwind v4.0 directives
  console.log('🎨 Setting up Tailwind CSS v4.0...');
  await fs.writeFile(path.join(baseDir, 'src/index.css'), `
@import "tailwindcss";

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
}
    `.trim());

  // Clean App.jsx and create new content
  await fs.writeFile(path.join(baseDir, 'src/App.jsx'), `
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default App;
    `.trim());

  // Create Layout component
  await fs.writeFile(path.join(baseDir, 'src/components/layout/Layout.jsx'), `
import Header from './Header';
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

export default Layout;
    `.trim());

  // Create Header component
  await fs.writeFile(path.join(baseDir, 'src/components/layout/Header.jsx'), `
import { Link } from 'react-router-dom';

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

export default Header;
    `.trim());

  // Create Footer component
  await fs.writeFile(path.join(baseDir, 'src/components/layout/Footer.jsx'), `
const Footer = () => {
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

export default Footer;
    `.trim());

  // Create Home page
  await fs.writeFile(path.join(baseDir, 'src/pages/Home.jsx'), `
import { useState } from 'react';
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

export default Home;
    `.trim());

  // Create About page
  await fs.writeFile(path.join(baseDir, 'src/pages/About.jsx'), `
const About = () => {
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

export default About;
    `.trim());

  // Create API service
  await fs.writeFile(path.join(baseDir, 'src/services/api.js'), `
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
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

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
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

export default api;
    `.trim());

  // Create utility functions
  await fs.writeFile(path.join(baseDir, 'src/utils/helpers.js'), `
// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Debounce function
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

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
    `.trim());

  // Create environment variables file
  await fs.writeFile(path.join(baseDir, '.env'), `
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_APP_NAME=My Vite App
VITE_APP_VERSION=1.0.0
    `.trim());

  // Update .env.example
  await fs.writeFile(path.join(baseDir, '.env.example'), `
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=My Vite App
VITE_APP_VERSION=1.0.0
    `.trim());

  // Create README.md file
  console.log('📚 Creating README.md file...');
  await fs.writeFile(path.join(baseDir, 'README.md'), `
# ${userFolder}

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

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── services/         # API services
├── utils/            # Utility functions
├── context/          # React context
├── assets/           # Static assets
└── styles/           # Additional styles
\`\`\`

## 🔧 Configuration

- **Environment Variables**: See \`.env.example\`
- **Tailwind Config**: \`tailwind.config.js\`
- **Vite Config**: \`vite.config.js\`

## 🌟 Features

- ✅ Modern React setup with Vite
- ✅ Tailwind CSS v4.0 with @theme syntax
- ✅ Pre-configured Axios with interceptors
- ✅ React Router with layout system
- ✅ Production-ready build configuration
- ✅ SEO optimized HTML
- ✅ PWA ready
- ✅ TypeScript support ready

## 🚀 Deployment

Build the project:
\`\`\`bash
npm run build
\`\`\`

The \`dist/\` folder contains the production build ready for deployment.

## 📄 License

MIT
    `.trim());

  // Update package.json scripts
  console.log('🔧 Updating package.json...');
  const packageJsonPath = path.join(baseDir, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

  packageJson.scripts = {
    ...packageJson.scripts,
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  };

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Update vite.config.js for path resolution and Tailwind v4.0
  await fs.writeFile(path.join(baseDir, 'vite.config.js'), `
import { defineConfig } from 'vite'
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
})
    `.trim());

  // Check and update packages (optional)
  try {
    console.log('🔄 Checking for package updates...');
    execSync('npx npm-check-updates -u', { stdio: 'inherit' });
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Package update check failed, continuing...');
  }

  console.log('🚀 Starting development server...');
  execSync('npm run dev', { stdio: 'inherit' });

  console.log('✅ Vite React project with Tailwind CSS v4.0 setup complete! 🎉');
  console.log(`\n📁 Project created in: ${userFolder}/`);
  console.log('\n🚀 To start your server again:');
  console.log(`   cd ${userFolder}`);
  console.log('   npm run dev     # Development server');
  console.log('   npm run build   # Production build');
  console.log('   npm run preview # Preview production build');
  console.log('\n📝 Environment variables are in .env file');
  console.log('🔗 Development server: http://localhost:5173');
}

createViteReactSetup().catch(console.error);
