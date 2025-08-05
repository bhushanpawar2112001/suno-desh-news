#!/bin/bash

echo "🚀 Building NewsHub for Single Server Deployment"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version (recommend 18+)
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_warning "Node.js version $(node -v) detected. Recommended: Node.js 18+"
fi

print_success "Prerequisites check completed"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf frontend/dist
rm -rf backend/dist
rm -rf build
mkdir -p build

# Install dependencies
print_status "Installing dependencies..."

# Root dependencies
print_status "Installing root dependencies..."
npm install --silent

# Backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install --legacy-peer-deps --silent
cd ..

# Frontend dependencies
print_status "Installing frontend dependencies..."
cd frontend
npm install --legacy-peer-deps --silent
cd ..

print_success "Dependencies installed successfully"

# Build backend
print_status "Building backend..."
cd backend
npm run build
if [ $? -ne 0 ]; then
    print_error "Backend build failed"
    exit 1
fi
cd ..

# Build frontend
print_status "Building frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    print_error "Frontend build failed"
    exit 1
fi
cd ..

print_success "Build completed successfully"

# Copy builds to deployment directory
print_status "Preparing deployment package..."

# Copy backend build
cp -r backend/dist build/backend
cp backend/package.json build/backend/
cp backend/package-lock.json build/backend/

# Copy frontend build
cp -r frontend/dist build/frontend

# Create production environment file
if [ ! -f backend/.env ]; then
    print_warning "No .env file found. Creating production environment template..."
    cat > build/backend/.env << EOF
# Production Environment Configuration
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
EOF
    print_warning "Please update build/backend/.env with your production values"
else
    cp backend/.env build/backend/
fi

# Create deployment scripts
cat > build/start.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting NewsHub Production Server"
echo "====================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${BLUE}[INFO]${NC} Starting MongoDB..."
    sudo systemctl start mongod || echo "Please start MongoDB manually"
fi

# Install production dependencies
echo -e "${BLUE}[INFO]${NC} Installing production dependencies..."
cd backend
npm install --only=production --silent

# Start the server
echo -e "${BLUE}[INFO]${NC} Starting NewsHub server..."
npm run start:prod
EOF

cat > build/install-deps.sh << 'EOF'
#!/bin/bash

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
EOF

cat > build/pm2-ecosystem.config.js << 'EOF'
module.exports = {
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
EOF

# Create nginx configuration for serving frontend
cat > build/nginx.conf << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # Change this to your domain

    # Serve frontend static files
    location / {
        root /var/www/newshub/frontend;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
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
EOF

# Create deployment README
cat > build/DEPLOYMENT.md << 'EOF'
# NewsHub Single Server Deployment

## Quick Start

1. **Upload the build folder to your server**
   ```bash
   scp -r build/ user@your-server:/opt/newshub/
   ```

2. **SSH into your server and run setup**
   ```bash
   ssh user@your-server
   cd /opt/newshub
   chmod +x install-deps.sh start.sh
   ./install-deps.sh
   ```

3. **Configure environment**
   ```bash
   nano backend/.env
   # Update MongoDB URI, JWT secret, and other settings
   ```

4. **Start the application**
   ```bash
   # Option 1: Direct start
   ./start.sh
   
   # Option 2: Using PM2 (recommended for production)
   pm2 start pm2-ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## Nginx Setup (Optional)

1. **Install nginx**
   ```bash
   sudo apt-get install nginx
   ```

2. **Copy nginx configuration**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/newshub
   sudo ln -s /etc/nginx/sites-available/newshub /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

3. **Set up SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Access Points

- **Frontend**: http://your-domain.com
- **Backend API**: http://your-domain.com/api
- **Admin Panel**: http://your-domain.com/admin

## Environment Variables

Update `backend/.env` with your production values:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong secret key for JWT tokens
- `CORS_ORIGIN`: Your frontend domain
- `PORT`: Backend port (default: 3000)

## Monitoring

- **PM2 Dashboard**: `pm2 monit`
- **Logs**: `pm2 logs newshub-backend`
- **Status**: `pm2 status`

## Troubleshooting

1. **Check MongoDB status**: `sudo systemctl status mongod`
2. **Check application logs**: `pm2 logs newshub-backend`
3. **Check nginx logs**: `sudo tail -f /var/log/nginx/error.log`
4. **Restart services**: `pm2 restart newshub-backend`
EOF

# Make scripts executable
chmod +x build/start.sh
chmod +x build/install-deps.sh

print_success "Deployment package created successfully!"
echo ""
echo "📁 Build output: ./build/"
echo ""
echo "📋 Next steps:"
echo "1. Upload the 'build' folder to your server"
echo "2. Run './install-deps.sh' on your server"
echo "3. Configure backend/.env with your production settings"
echo "4. Start the application with './start.sh'"
echo ""
echo "📖 See build/DEPLOYMENT.md for detailed instructions"
echo ""
echo "🌐 Access points after deployment:"
echo "- Frontend: http://your-domain.com"
echo "- Backend API: http://your-domain.com/api"
echo "- Admin Panel: http://your-domain.com/admin" 