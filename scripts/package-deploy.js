const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Packaging NewsHub for Single Server Deployment');
console.log('================================================');

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'blue') {
  console.log(`${colors[color]}[INFO]${colors.reset} ${message}`);
}

function logSuccess(message) {
  console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

// Check if builds exist
const frontendDist = path.join(__dirname, '../frontend/dist');
const backendDist = path.join(__dirname, '../backend/dist');

if (!fs.existsSync(frontendDist)) {
  logError('Frontend build not found. Run "npm run build" first.');
  process.exit(1);
}

if (!fs.existsSync(backendDist)) {
  logError('Backend build not found. Run "npm run build" first.');
  process.exit(1);
}

// Create build directory
const buildDir = path.join(__dirname, '../build');
if (fs.existsSync(buildDir)) {
  try {
    fs.rmSync(buildDir, { recursive: true });
  } catch (error) {
    logWarning('Could not remove existing build directory, continuing...');
  }
}
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

log('Creating deployment package...');

// Copy backend build
const backendBuildDir = path.join(buildDir, 'backend');
fs.mkdirSync(backendBuildDir, { recursive: true });

// Copy backend dist
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(backendDist, backendBuildDir);

// Copy backend package files
const backendPackageJson = path.join(__dirname, '../backend/package.json');
const backendPackageLock = path.join(__dirname, '../backend/package-lock.json');

if (fs.existsSync(backendPackageJson)) {
  fs.copyFileSync(backendPackageJson, path.join(backendBuildDir, 'package.json'));
}
if (fs.existsSync(backendPackageLock)) {
  fs.copyFileSync(backendPackageLock, path.join(backendBuildDir, 'package-lock.json'));
}

// Copy frontend build
const frontendBuildDir = path.join(buildDir, 'frontend');
fs.mkdirSync(frontendBuildDir, { recursive: true });

// Copy frontend dist
copyDir(frontendDist, frontendBuildDir);

log('Creating environment configuration...');

// Create production environment file
const envPath = path.join(__dirname, '../backend/.env');
const envBuildPath = path.join(backendBuildDir, '.env');

if (fs.existsSync(envPath)) {
  fs.copyFileSync(envPath, envBuildPath);
  log('Copied existing .env file');
} else {
  const envTemplate = `# Production Environment Configuration
NODE_ENV=production
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/newshub

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:4200

# API Configuration
API_PREFIX=api
`;
  fs.writeFileSync(envBuildPath, envTemplate);
  logWarning('Created .env template - please update with production values');
}

log('Creating deployment scripts...');

// Create start script
const startScript = `#!/bin/bash

echo "🚀 Starting NewsHub Production Server"
echo "====================================="

# Colors
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
NC='\\033[0m'

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "\${BLUE}[INFO]\${NC} Starting MongoDB..."
    sudo systemctl start mongod || echo "Please start MongoDB manually"
fi

# Install production dependencies
echo -e "\${BLUE}[INFO]\${NC} Installing production dependencies..."
cd backend
npm install --only=production --silent

# Start the server
echo -e "\${BLUE}[INFO]\${NC} Starting NewsHub server..."
npm run start:prod
`;

fs.writeFileSync(path.join(buildDir, 'start.sh'), startScript);

// Create install dependencies script
const installScript = `#!/bin/bash

echo "📦 Installing Production Dependencies"
echo "====================================="

# Install MongoDB (Ubuntu/Debian)
if command -v apt-get &> /dev/null; then
    echo "Installing MongoDB..."
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl enable mongod
    sudo systemctl start mongod
fi

# Install Node.js (if not installed)
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 for process management
npm install -g pm2

echo "✅ Dependencies installed successfully"
`;

fs.writeFileSync(path.join(buildDir, 'install-deps.sh'), installScript);

// Create PM2 ecosystem config
const pm2Config = `module.exports = {
  apps: [{
    name: 'newshub-backend',
    script: './backend/dist/main.js',
    cwd: './',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_file: './backend/.env'
  }]
};
`;

fs.writeFileSync(path.join(buildDir, 'pm2-ecosystem.config.js'), pm2Config);

// Create nginx configuration
const nginxConfig = `server {
    listen 80;
    server_name your-domain.com;  # Change this to your domain

    # Serve frontend static files
    location / {
        root /var/www/newshub/frontend;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://news.aawashyak.com:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
`;

fs.writeFileSync(path.join(buildDir, 'nginx.conf'), nginxConfig);

// Create deployment README
const deploymentReadme = `# NewsHub Single Server Deployment

## Quick Start

1. **Upload the build folder to your server**
   \`\`\`bash
   scp -r build/ user@your-server:/opt/newshub/
   \`\`\`

2. **SSH into your server and run setup**
   \`\`\`bash
   ssh user@your-server
   cd /opt/newshub
   chmod +x install-deps.sh start.sh
   ./install-deps.sh
   \`\`\`

3. **Configure environment**
   \`\`\`bash
   nano backend/.env
   # Update MongoDB URI, JWT secret, and other settings
   \`\`\`

4. **Start the application**
   \`\`\`bash
   # Option 1: Direct start
   ./start.sh
   
   # Option 2: Using PM2 (recommended for production)
   pm2 start pm2-ecosystem.config.js
   pm2 save
   pm2 startup
   \`\`\`

## Nginx Setup (Optional)

1. **Install nginx**
   \`\`\`bash
   sudo apt-get install nginx
   \`\`\`

2. **Copy nginx configuration**
   \`\`\`bash
   sudo cp nginx.conf /etc/nginx/sites-available/newshub
   sudo ln -s /etc/nginx/sites-available/newshub /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   \`\`\`

3. **Set up SSL with Let's Encrypt**
   \`\`\`bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   \`\`\`

## Access Points

- **Frontend**: http://your-domain.com
- **Backend API**: http://your-domain.com/api
- **Admin Panel**: http://your-domain.com/admin

## Environment Variables

Update \`backend/.env\` with your production values:

- \`MONGODB_URI\`: Your MongoDB connection string
- \`JWT_SECRET\`: A strong secret key for JWT tokens
- \`CORS_ORIGIN\`: Your frontend domain
- \`PORT\`: Backend port (default: 3000)

## Monitoring

- **PM2 Dashboard**: \`pm2 monit\`
- **Logs**: \`pm2 logs newshub-backend\`
- **Status**: \`pm2 status\`

## Troubleshooting

1. **Check MongoDB status**: \`sudo systemctl status mongod\`
2. **Check application logs**: \`pm2 logs newshub-backend\`
3. **Check nginx logs**: \`sudo tail -f /var/log/nginx/error.log\`
4. **Restart services**: \`pm2 restart newshub-backend\`
`;

fs.writeFileSync(path.join(buildDir, 'DEPLOYMENT.md'), deploymentReadme);

// Make scripts executable
try {
  execSync(`chmod +x "${path.join(buildDir, 'start.sh')}"`);
  execSync(`chmod +x "${path.join(buildDir, 'install-deps.sh')}"`);
} catch (error) {
  logWarning('Could not make scripts executable (this is normal on Windows)');
}

logSuccess('Deployment package created successfully!');
console.log('');
console.log('📁 Build output: ./build/');
console.log('');
console.log('📋 Next steps:');
console.log('1. Upload the \'build\' folder to your server');
console.log('2. Run \'./install-deps.sh\' on your server');
console.log('3. Configure backend/.env with your production settings');
console.log('4. Start the application with \'./start.sh\'');
console.log('');
console.log('📖 See build/DEPLOYMENT.md for detailed instructions');
console.log('');
console.log('🌐 Access points after deployment:');
console.log('- Frontend: http://your-domain.com');
console.log('- Backend API: http://your-domain.com/api');
console.log('- Admin Panel: http://your-domain.com/admin'); 