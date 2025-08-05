@echo off
echo 🚀 Building NewsHub for Single Server Deployment
echo ================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

echo ✅ Prerequisites check completed

REM Clean previous builds
echo 📦 Cleaning previous builds...
if exist frontend\dist rmdir /s /q frontend\dist
if exist backend\dist rmdir /s /q backend\dist
if exist build rmdir /s /q build
mkdir build

REM Install dependencies
echo 📦 Installing dependencies...

REM Root dependencies
echo 📦 Installing root dependencies...
call npm install --silent

REM Backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install --legacy-peer-deps --silent
cd ..

REM Frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install --legacy-peer-deps --silent
cd ..

echo ✅ Dependencies installed successfully

REM Build backend
echo 🔨 Building backend...
cd backend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Backend build failed
    exit /b 1
)
cd ..

REM Build frontend
echo 🔨 Building frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    exit /b 1
)
cd ..

echo ✅ Build completed successfully

REM Copy builds to deployment directory
echo 📦 Preparing deployment package...

REM Copy backend build
xcopy backend\dist build\backend\ /E /I /Y
copy backend\package.json build\backend\
copy backend\package-lock.json build\backend\

REM Copy frontend build
xcopy frontend\dist build\frontend\ /E /I /Y

REM Create production environment file
if not exist backend\.env (
    echo ⚠️  No .env file found. Creating production environment template...
    (
        echo # Production Environment Configuration
        echo NODE_ENV=production
        echo PORT=3000
        echo.
        echo # MongoDB Configuration
        echo MONGODB_URI=mongodb://localhost:27017/newshub
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
        echo JWT_EXPIRES_IN=24h
        echo.
        echo # CORS Configuration
        echo CORS_ORIGIN=http://localhost:4200
        echo.
        echo # API Configuration
        echo API_PREFIX=api
    ) > build\backend\.env
    echo ⚠️  Please update build\backend\.env with your production values
) else (
    copy backend\.env build\backend\
)

REM Create deployment scripts
echo 📝 Creating deployment scripts...

REM Create start script for Linux
(
    echo #!/bin/bash
    echo.
    echo echo "🚀 Starting NewsHub Production Server"
    echo echo "====================================="
    echo.
    echo # Colors
    echo GREEN='\033[0;32m'
    echo BLUE='\033[0;34m'
    echo NC='\033[0m'
    echo.
    echo # Check if MongoDB is running
    echo if ! pgrep -x "mongod" ^> /dev/null; then
    echo     echo -e "${BLUE}[INFO]${NC} Starting MongoDB..."
    echo     sudo systemctl start mongod ^|^| echo "Please start MongoDB manually"
    echo fi
    echo.
    echo # Install production dependencies
    echo echo -e "${BLUE}[INFO]${NC} Installing production dependencies..."
    echo cd backend
    echo npm install --only=production --silent
    echo.
    echo # Start the server
    echo echo -e "${BLUE}[INFO]${NC} Starting NewsHub server..."
    echo npm run start:prod
) > build\start.sh

REM Create install dependencies script
(
    echo #!/bin/bash
    echo.
    echo echo "📦 Installing Production Dependencies"
    echo echo "====================================="
    echo.
    echo # Install MongoDB (Ubuntu/Debian)
    echo if command -v apt-get ^&^> /dev/null; then
    echo     echo "Installing MongoDB..."
    echo     wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc ^| sudo apt-key add -
    echo     echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" ^| sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    echo     sudo apt-get update
    echo     sudo apt-get install -y mongodb-org
    echo     sudo systemctl enable mongod
    echo     sudo systemctl start mongod
    echo fi
    echo.
    echo # Install Node.js (if not installed)
    echo if ! command -v node ^&^> /dev/null; then
    echo     echo "Installing Node.js..."
    echo     curl -fsSL https://deb.nodesource.com/setup_18.x ^| sudo -E bash -
    echo     sudo apt-get install -y nodejs
    echo fi
    echo.
    echo # Install PM2 for process management
    echo npm install -g pm2
    echo.
    echo echo "✅ Dependencies installed successfully"
) > build\install-deps.sh

REM Create PM2 ecosystem config
(
    echo module.exports = {
    echo   apps: [{
    echo     name: 'newshub-backend',
    echo     script: './backend/dist/main.js',
    echo     cwd: './',
    echo     instances: 1,
    echo     autorestart: true,
    echo     watch: false,
    echo     max_memory_restart: '1G',
    echo     env: {
    echo       NODE_ENV: 'production',
    echo       PORT: 3000
    echo     },
    echo     env_file: './backend/.env'
    echo   }]
    echo };
) > build\pm2-ecosystem.config.js

REM Create nginx configuration
(
    echo server {
    echo     listen 80;
    echo     server_name your-domain.com;  # Change this to your domain
    echo.
    echo     # Serve frontend static files
    echo     location / {
    echo         root /var/www/newshub/frontend;
    echo         try_files $uri $uri/ /index.html;
    echo         
    echo         # Cache static assets
    echo         location ~* \.(js^|css^|png^|jpg^|jpeg^|gif^|ico^|svg^)$ {
    echo             expires 1y;
    echo             add_header Cache-Control "public, immutable";
    echo         }
    echo     }
    echo.
    echo     # Proxy API requests to backend
    echo     location /api {
    echo         proxy_pass http://news.aawashyak.com:3000;
    echo         proxy_http_version 1.1;
    echo         proxy_set_header Upgrade $http_upgrade;
    echo         proxy_set_header Connection 'upgrade';
    echo         proxy_set_header Host $host;
    echo         proxy_set_header X-Real-IP $remote_addr;
    echo         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    echo         proxy_set_header X-Forwarded-Proto $scheme;
    echo         proxy_cache_bypass $http_upgrade;
    echo     }
    echo }
) > build\nginx.conf

REM Create deployment README
(
    echo # NewsHub Single Server Deployment
    echo.
    echo ## Quick Start
    echo.
    echo 1. **Upload the build folder to your server**
    echo    ```bash
    echo    scp -r build/ user@your-server:/opt/newshub/
    echo    ```
    echo.
    echo 2. **SSH into your server and run setup**
    echo    ```bash
    echo    ssh user@your-server
    echo    cd /opt/newshub
    echo    chmod +x install-deps.sh start.sh
    echo    ./install-deps.sh
    echo    ```
    echo.
    echo 3. **Configure environment**
    echo    ```bash
    echo    nano backend/.env
    echo    # Update MongoDB URI, JWT secret, and other settings
    echo    ```
    echo.
    echo 4. **Start the application**
    echo    ```bash
    echo    # Option 1: Direct start
    echo    ./start.sh
    echo    
    echo    # Option 2: Using PM2 (recommended for production)
    echo    pm2 start pm2-ecosystem.config.js
    echo    pm2 save
    echo    pm2 startup
    echo    ```
    echo.
    echo ## Nginx Setup (Optional)
    echo.
    echo 1. **Install nginx**
    echo    ```bash
    echo    sudo apt-get install nginx
    echo    ```
    echo.
    echo 2. **Copy nginx configuration**
    echo    ```bash
    echo    sudo cp nginx.conf /etc/nginx/sites-available/newshub
    echo    sudo ln -s /etc/nginx/sites-available/newshub /etc/nginx/sites-enabled/
    echo    sudo nginx -t
    echo    sudo systemctl reload nginx
    echo    ```
    echo.
    echo 3. **Set up SSL with Let's Encrypt**
    echo    ```bash
    echo    sudo apt-get install certbot python3-certbot-nginx
    echo    sudo certbot --nginx -d your-domain.com
    echo    ```
    echo.
    echo ## Access Points
    echo.
    echo - **Frontend**: http://your-domain.com
    echo - **Backend API**: http://your-domain.com/api
    echo - **Admin Panel**: http://your-domain.com/admin
    echo.
    echo ## Environment Variables
    echo.
    echo Update `backend/.env` with your production values:
    echo.
    echo - `MONGODB_URI`: Your MongoDB connection string
    echo - `JWT_SECRET`: A strong secret key for JWT tokens
    echo - `CORS_ORIGIN`: Your frontend domain
    echo - `PORT`: Backend port (default: 3000)
    echo.
    echo ## Monitoring
    echo.
    echo - **PM2 Dashboard**: `pm2 monit`
    echo - **Logs**: `pm2 logs newshub-backend`
    echo - **Status**: `pm2 status`
    echo.
    echo ## Troubleshooting
    echo.
    echo 1. **Check MongoDB status**: `sudo systemctl status mongod`
    echo 2. **Check application logs**: `pm2 logs newshub-backend`
    echo 3. **Check nginx logs**: `sudo tail -f /var/log/nginx/error.log`
    echo 4. **Restart services**: `pm2 restart newshub-backend`
) > build\DEPLOYMENT.md

echo ✅ Deployment package created successfully!
echo.
echo 📁 Build output: ./build/
echo.
echo 📋 Next steps:
echo 1. Upload the 'build' folder to your server
echo 2. Run './install-deps.sh' on your server
echo 3. Configure backend/.env with your production settings
echo 4. Start the application with './start.sh'
echo.
echo 📖 See build/DEPLOYMENT.md for detailed instructions
echo.
echo 🌐 Access points after deployment:
echo - Frontend: http://your-domain.com
echo - Backend API: http://your-domain.com/api
echo - Admin Panel: http://your-domain.com/admin

pause 