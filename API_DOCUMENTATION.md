# 📚 NewsHub API Documentation

## 🚀 Base URL
```
http://news.aawashyak.com:3000
```

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Articles API](#articles-api)
3. [Categories API](#categories-api)
4. [Users API](#users-api)
5. [Categories API (Enhanced)](#categories-api-enhanced)
6. [Analytics API](#analytics-api)
7. [Data Upload Examples](#data-upload-examples)

---

## 🔐 Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@newshub.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "1",
    "email": "admin@newshub.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin",
    "isActive": true
  }
}
```

---

## 📰 Articles API

### Get All Articles
```http
GET /articles
Authorization: Bearer <token>
```

### Get Featured Articles
```http
GET /articles/featured
Authorization: Bearer <token>
```

### Get Article by ID
```http
GET /articles/:id
Authorization: Bearer <token>
```

### Get Article by Slug
```http
GET /articles/slug/:slug
Authorization: Bearer <token>
```

### Create Article
```http
POST /articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Breaking News: Technology Revolution",
  "titleHindi": "तकनीक क्रांति: ब्रेकिंग न्यूज",
  "content": "Scientists have made a groundbreaking discovery in quantum computing...",
  "contentHindi": "वैज्ञानिकों ने क्वांटम कंप्यूटिंग में एक बड़ी खोज की है...",
  "excerpt": "Latest developments in quantum computing and artificial intelligence...",
  "excerptHindi": "क्वांटम कंप्यूटिंग और आर्टिफिशियल इंटेलिजेंस में नवीनतम विकास...",
  "categoryId": "1",
  "featuredImage": "https://via.placeholder.com/800x400/3b82f6/ffffff?text=Tech+News",
  "status": "published",
  "isFeatured": true,
  "isActive": true,
  "tags": ["technology", "AI", "quantum computing"]
}
```

### Update Article
```http
PUT /articles/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Article Title",
  "isFeatured": false
}
```

### Delete Article
```http
DELETE /articles/:id
Authorization: Bearer <token>
```

### Increment View Count
```http
POST /articles/:id/view
Authorization: Bearer <token>
```

---

## 📂 Categories API

### Get All Categories
```http
GET /categories
Authorization: Bearer <token>
```

### Get Category by Slug
```http
GET /categories/slug/:slug
Authorization: Bearer <token>
```

### Create Category
```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Technology",
  "nameHindi": "तकनीक",
  "description": "Latest tech news, innovations, and digital trends",
  "descriptionHindi": "नवीनतम तकनीक समाचार, नवाचार और डिजिटल रुझान",
  "isActive": true
}
```

### Update Category
```http
PUT /categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Category Name",
  "isActive": false
}
```

### Delete Category
```http
DELETE /categories/:id
Authorization: Bearer <token>
```

---

## 👥 Users API

### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

### Get User by ID
```http
GET /users/:id
Authorization: Bearer <token>
```

### Create User
```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "john.doe@newshub.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword123",
  "role": "author",
  "isActive": true
}
```

### Update User
```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Updated Name",
  "isActive": false
}
```

### Delete User
```http
DELETE /users/:id
Authorization: Bearer <token>
```

---

## 📂 Categories API (Enhanced)

### Get All Categories
```http
GET /categories
Authorization: Bearer <token>
```

### Get Categories by Rank
```http
GET /categories?sort=rank
Authorization: Bearer <token>
```

### Get Category by Slug
```http
GET /categories/slug/:slug
Authorization: Bearer <token>
```

### Create Category
```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Technology",
  "nameHindi": "तकनीक",
  "description": "Latest tech news, innovations, and digital trends",
  "descriptionHindi": "नवीनतम तकनीक समाचार, नवाचार और डिजिटल रुझान",
  "isActive": true,
  "rank": 1
}
```

### Update Category Rank
```http
PUT /categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "rank": 2
}
```

### Update Category
```http
PUT /categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Category Name",
  "isActive": false,
  "rank": 3
}
```

### Delete Category
```http
DELETE /categories/:id
Authorization: Bearer <token>
```

---

## 📊 Analytics API

### Get Dashboard Stats
```http
GET /dashboard/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalArticles": 24,
  "totalCategories": 6,
  "totalUsers": 12,
  "totalViews": 15420,
  "recentArticles": [...],
  "topArticles": [...]
}
```

---

## 📤 Data Upload Examples

### 1. Upload Multiple Articles

```bash
curl -X POST http://news.aawashyak.com:3000/articles/bulk \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "title": "Technology Breakthrough",
      "titleHindi": "तकनीक सफलता",
      "content": "Scientists have made a groundbreaking discovery...",
      "contentHindi": "वैज्ञानिकों ने एक बड़ी खोज की है...",
      "excerpt": "Latest developments in quantum computing...",
      "excerptHindi": "क्वांटम कंप्यूटिंग में नवीनतम विकास...",
      "categoryId": "1",
      "featuredImage": "https://via.placeholder.com/800x400/3b82f6/ffffff?text=Tech",
      "status": "published",
      "isFeatured": true,
      "isActive": true,
      "tags": ["technology", "AI"]
    },
    {
      "title": "Sports Championship",
      "titleHindi": "खेल चैम्पियनशिप",
      "content": "Incredible moments from the championship finals...",
      "contentHindi": "चैम्पियनशिप फाइनल के अविश्वसनीय क्षण...",
      "excerpt": "Record-breaking performances in sports...",
      "excerptHindi": "खेलों में रिकॉर्ड तोड़ प्रदर्शन...",
      "categoryId": "2",
      "featuredImage": "https://via.placeholder.com/800x400/10b981/ffffff?text=Sports",
      "status": "published",
      "isFeatured": false,
      "isActive": true,
      "tags": ["sports", "championship"]
    }
  ]'
```

### 2. Upload Multiple Categories

```bash
curl -X POST http://news.aawashyak.com:3000/categories/bulk \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "Technology",
      "nameHindi": "तकनीक",
      "description": "Latest tech news and innovations",
      "descriptionHindi": "नवीनतम तकनीक समाचार और नवाचार",
      "isActive": true
    },
    {
      "name": "Sports",
      "nameHindi": "खेल",
      "description": "Sports news and updates",
      "descriptionHindi": "खेल समाचार और अपडेट",
      "isActive": true
    },
    {
      "name": "Business",
      "nameHindi": "व्यापार",
      "description": "Business and financial news",
      "descriptionHindi": "व्यापार और वित्तीय समाचार",
      "isActive": true
    }
  ]'
```

### 3. Upload Categories with Ranking

```bash
curl -X POST http://news.aawashyak.com:3000/categories/bulk \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "Technology",
      "nameHindi": "तकनीक",
      "description": "Latest tech news and innovations",
      "descriptionHindi": "नवीनतम तकनीक समाचार और नवाचार",
      "isActive": true,
      "rank": 1
    },
    {
      "name": "Sports",
      "nameHindi": "खेल",
      "description": "Sports news and updates",
      "descriptionHindi": "खेल समाचार और अपडेट",
      "isActive": true,
      "rank": 2
    },
    {
      "name": "Business",
      "nameHindi": "व्यापार",
      "description": "Business and financial news",
      "descriptionHindi": "व्यापार और वित्तीय समाचार",
      "isActive": true,
      "rank": 3
    }
  ]'
```

---

## 🔧 Swagger UI

### Access Swagger Documentation
```
http://news.aawashyak.com:3000/api-docs
```

### Swagger Configuration
```yaml
swagger: "2.0"
info:
  title: NewsHub API
  description: Complete API documentation for NewsHub news platform
  version: 1.0.0
  contact:
    name: NewsHub Support
    email: support@newshub.com
host: news.aawashyak.com:3000
basePath: /
schemes:
  - http
  - https
securityDefinitions:
  Bearer:
    type: apiKey
    name: Authorization
    in: header
paths:
  /auth/login:
    post:
      tags:
        - Authentication
      summary: User login
      description: Authenticate user and return JWT token
      parameters:
        - name: body
          in: body
          required: true
          schema:
            type: object
            properties:
              email:
                type: string
                example: "admin@newshub.com"
              password:
                type: string
                example: "admin123"
      responses:
        200:
          description: Login successful
          schema:
            type: object
            properties:
              token:
                type: string
              user:
                $ref: '#/definitions/User'
        401:
          description: Invalid credentials
```

---

## 📝 JSON Schema Examples

### Article Schema
```json
{
  "type": "object",
  "properties": {
    "_id": { "type": "string" },
    "title": { "type": "string" },
    "titleHindi": { "type": "string" },
    "slug": { "type": "string" },
    "content": { "type": "string" },
    "contentHindi": { "type": "string" },
    "excerpt": { "type": "string" },
    "excerptHindi": { "type": "string" },
    "featuredImage": { "type": "string" },
    "category": { "$ref": "#/definitions/Category" },
    "author": { "$ref": "#/definitions/User" },
    "status": { "type": "string", "enum": ["draft", "published", "archived"] },
    "isFeatured": { "type": "boolean" },
    "isActive": { "type": "boolean" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "viewCount": { "type": "number" },
    "likeCount": { "type": "number" },
    "createdAt": { "type": "string", "format": "date-time" },
    "updatedAt": { "type": "string", "format": "date-time" }
  },
  "required": ["title", "content", "categoryId", "status"]
}
```



---

## 🚀 Quick Start Guide

### 1. Get Authentication Token
```bash
curl -X POST http://news.aawashyak.com:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@newshub.com",
    "password": "admin123"
  }'
```

### 2. Create an Article
```bash
curl -X POST http://news.aawashyak.com:3000/articles \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Article",
    "titleHindi": "मेरा पहला लेख",
    "content": "This is the content of my first article...",
    "contentHindi": "यह मेरे पहले लेख की सामग्री है...",
    "excerpt": "A brief excerpt of the article...",
    "excerptHindi": "लेख का संक्षिप्त अंश...",
    "categoryId": "1",
    "featuredImage": "https://via.placeholder.com/800x400/3b82f6/ffffff?text=Article",
    "status": "published",
    "isFeatured": true,
    "isActive": true,
    "tags": ["news", "technology"]
  }'
```

### 3. Create a Category with Rank
```bash
curl -X POST http://news.aawashyak.com:3000/categories \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Politics",
    "nameHindi": "राजनीति",
    "description": "Political news and updates",
    "descriptionHindi": "राजनीतिक समाचार और अपडेट",
    "isActive": true,
    "rank": 7
  }'
```

---

## 📞 Support

For API support and questions:
- **Email**: support@newshub.com
- **Documentation**: http://news.aawashyak.com:3000/api-docs
- **GitHub**: https://github.com/newshub/api

---

## 🔄 Rate Limits

- **GET requests**: 1000 requests per hour
- **POST/PUT/DELETE requests**: 100 requests per hour
- **Authentication**: 10 login attempts per hour

---

## 📰 Breaking News API

### Get All Breaking News
```http
GET /breaking-news
Authorization: Bearer <token>
```

### Get Active Breaking News
```http
GET /breaking-news/active
```

### Create Breaking News
```http
POST /breaking-news
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Major Technology Breakthrough",
  "titleHindi": "प्रमुख तकनीक सफलता",
  "content": "New AI breakthrough announced in technology sector • New sports records broken • Entertainment industry updates",
  "contentHindi": "प्रौद्योगिकी क्षेत्र में नई एआई सफलता की घोषणा • नए खेल रिकॉर्ड टूटे • मनोरंजन उद्योग अपडेट",
  "isActive": true,
  "priority": 1
}
```

### Update Breaking News
```http
PUT /breaking-news/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Breaking News",
  "titleHindi": "अपडेटेड तोड़ने वाली खबर",
  "content": "Updated content",
  "contentHindi": "अपडेटेड सामग्री",
  "isActive": true,
  "priority": 2
}
```

### Toggle Breaking News Status
```http
PATCH /breaking-news/:id/toggle
Authorization: Bearer <token>
```

### Delete Breaking News
```http
DELETE /breaking-news/:id
Authorization: Bearer <token>
```

---

## 🔒 Security

- All API endpoints require authentication (except login)
- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- CORS enabled for frontend domain
- Rate limiting enabled for all endpoints 