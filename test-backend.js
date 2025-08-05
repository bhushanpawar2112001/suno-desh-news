const axios = require('axios');

const BASE_URL = 'http://news.aawashyak.com:3000';

async function testBackend() {
  console.log('🧪 Testing Backend API...\n');

  try {
    // Test breaking news endpoint
    console.log('1. Testing Breaking News API...');
    const breakingNewsResponse = await axios.get(`${BASE_URL}/breaking-news/active`);
    console.log('✅ Breaking News API working:', breakingNewsResponse.data.length, 'items found');
    
    // Test categories endpoint
    console.log('\n2. Testing Categories API...');
    const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
    console.log('✅ Categories API working:', categoriesResponse.data.length, 'items found');
    
    // Test articles endpoint
    console.log('\n3. Testing Articles API...');
    const articlesResponse = await axios.get(`${BASE_URL}/articles`);
    console.log('✅ Articles API working:', articlesResponse.data.length, 'items found');

    console.log('\n🎉 All backend APIs are working correctly!');
    console.log('\n📊 Summary:');
    console.log(`- Breaking News: ${breakingNewsResponse.data.length} active items`);
    console.log(`- Categories: ${categoriesResponse.data.length} categories`);
    console.log(`- Articles: ${articlesResponse.data.length} articles`);
    
  } catch (error) {
    console.error('❌ Backend API test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testBackend(); 