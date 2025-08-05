const axios = require('axios');

const BASE_URL = 'http://news.aawashyak.com:3000';
let authToken = '';

// Sample data
const sampleCategories = [
  {
    name: 'Technology',
    nameHindi: 'तकनीक',
    description: 'Latest tech news, innovations, and digital trends',
    descriptionHindi: 'नवीनतम तकनीक समाचार, नवाचार और डिजिटल रुझान',
    isActive: true,
    rank: 1
  },
  {
    name: 'Sports',
    nameHindi: 'खेल',
    description: 'Sports news, match updates, and athlete stories',
    descriptionHindi: 'खेल समाचार, मैच अपडेट और एथलीट की कहानियां',
    isActive: true,
    rank: 2
  },
  {
    name: 'Business',
    nameHindi: 'व्यापार',
    description: 'Business news, market updates, and financial insights',
    descriptionHindi: 'व्यापार समाचार, बाजार अपडेट और वित्तीय अंतर्दृष्टि',
    isActive: true,
    rank: 3
  },
  {
    name: 'Health',
    nameHindi: 'स्वास्थ्य',
    description: 'Health news, medical breakthroughs, and wellness tips',
    descriptionHindi: 'स्वास्थ्य समाचार, चिकित्सा सफलताएं और कल्याण युक्तियां',
    isActive: true,
    rank: 4
  },
  {
    name: 'Entertainment',
    nameHindi: 'मनोरंजन',
    description: 'Entertainment news, celebrity updates, and cultural events',
    descriptionHindi: 'मनोरंजन समाचार, सेलिब्रिटी अपडेट और सांस्कृतिक कार्यक्रम',
    isActive: true,
    rank: 5
  },
  {
    name: 'Science',
    nameHindi: 'विज्ञान',
    description: 'Scientific discoveries, research updates, and space news',
    descriptionHindi: 'वैज्ञानिक खोजें, शोध अपडेट और अंतरिक्ष समाचार',
    isActive: true,
    rank: 6
  }
];

const sampleBreakingNews = [
  {
    title: 'Major developments in technology sector as AI breakthrough announced',
    titleHindi: 'प्रौद्योगिकी क्षेत्र में बड़े विकास के रूप में एआई सफलता की घोषणा',
    content: 'New AI breakthrough announced in technology sector • New sports records broken • Entertainment industry updates',
    contentHindi: 'प्रौद्योगिकी क्षेत्र में नई एआई सफलता की घोषणा • नए खेल रिकॉर्ड टूटे • मनोरंजन उद्योग अपडेट',
    isActive: true,
    priority: 1
  },
  {
    title: 'Breaking: Major sports records broken in championship finals',
    titleHindi: 'तोड़ने वाली खबर: चैम्पियनशिप फाइनल में बड़े खेल रिकॉर्ड टूटे',
    content: 'New sports records broken in championship finals • Technology sector updates • Business news highlights',
    contentHindi: 'चैम्पियनशिप फाइनल में नए खेल रिकॉर्ड टूटे • प्रौद्योगिकी क्षेत्र अपडेट • व्यापार समाचार के मुख्य आकर्षण',
    isActive: true,
    priority: 2
  },
  {
    title: 'Entertainment industry updates and celebrity news',
    titleHindi: 'मनोरंजन उद्योग अपडेट और सेलिब्रिटी समाचार',
    content: 'Entertainment industry updates • Technology breakthroughs • Sports highlights',
    contentHindi: 'मनोरंजन उद्योग अपडेट • प्रौद्योगिकी सफलताएं • खेल के मुख्य आकर्षण',
    isActive: false,
    priority: 3
  }
];

const sampleArticles = [
  {
    title: 'Breaking News: Major Technology Breakthrough',
    titleHindi: 'तकनीक में बड़ी सफलता',
    content: 'Scientists have made a groundbreaking discovery in quantum computing that could revolutionize the industry. This breakthrough could lead to faster computers and more secure communications.',
    contentHindi: 'वैज्ञानिकों ने क्वांटम कंप्यूटिंग में एक बड़ी खोज की है जो उद्योग को बदल सकती है।',
    excerpt: 'Scientists have made a groundbreaking discovery in quantum computing that could revolutionize the industry...',
    excerptHindi: 'वैज्ञानिकों ने क्वांटम कंप्यूटिंग में एक बड़ी खोज की है...',
    categoryId: '1',
    featuredImage: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Tech+News',
    status: 'published',
    isFeatured: true,
    isActive: true,
    tags: ['technology', 'quantum computing', 'innovation']
  },
  {
    title: 'Sports Update: Championship Finals',
    titleHindi: 'खेल अपडेट: चैम्पियनशिप फाइनल',
    content: 'The highly anticipated championship finals are set to begin this weekend with record-breaking viewership expected. Teams have been preparing for months for this moment.',
    contentHindi: 'चैम्पियनशिप फाइनल इस सप्ताहांत शुरू होने वाले हैं और रिकॉर्ड व्यूअरशिप की उम्मीद है।',
    excerpt: 'The highly anticipated championship finals are set to begin this weekend with record-breaking viewership expected...',
    excerptHindi: 'चैम्पियनशिप फाइनल इस सप्ताहांत शुरू होने वाले हैं...',
    categoryId: '2',
    featuredImage: 'https://via.placeholder.com/800x400/10b981/ffffff?text=Sports',
    status: 'published',
    isFeatured: true,
    isActive: true,
    tags: ['sports', 'championship', 'finals']
  },
  {
    title: 'Business News: Market Analysis',
    titleHindi: 'व्यापार समाचार: बाजार विश्लेषण',
    content: 'Global markets show positive trends as investors gain confidence in emerging technologies and sustainable investments. The market is showing strong growth potential.',
    contentHindi: 'वैश्विक बाजार सकारात्मक रुझान दिखा रहे हैं क्योंकि निवेशक उभरती तकनीकों में विश्वास हासिल कर रहे हैं।',
    excerpt: 'Global markets show positive trends as investors gain confidence in emerging technologies and sustainable investments...',
    excerptHindi: 'वैश्विक बाजार सकारात्मक रुझान दिखा रहे हैं...',
    categoryId: '3',
    featuredImage: 'https://via.placeholder.com/800x400/f59e0b/ffffff?text=Business',
    status: 'published',
    isFeatured: false,
    isActive: true,
    tags: ['business', 'market', 'investment']
  },
  {
    title: 'Health & Wellness: New Research Findings',
    titleHindi: 'स्वास्थ्य और कल्याण: नए शोध निष्कर्ष',
    content: 'Recent studies reveal the importance of mental health awareness and its impact on overall well-being. New research shows promising results in mental health treatment.',
    contentHindi: 'हाल के अध्ययन मानसिक स्वास्थ्य जागरूकता के महत्व को प्रकट करते हैं।',
    excerpt: 'Recent studies reveal the importance of mental health awareness and its impact on overall well-being...',
    excerptHindi: 'हाल के अध्ययन मानसिक स्वास्थ्य जागरूकता के महत्व को प्रकट करते हैं...',
    categoryId: '4',
    featuredImage: 'https://via.placeholder.com/800x400/ef4444/ffffff?text=Health',
    status: 'published',
    isFeatured: true,
    isActive: true,
    tags: ['health', 'wellness', 'mental health']
  },
  {
    title: 'Entertainment: Award Show Highlights',
    titleHindi: 'मनोरंजन: पुरस्कार समारोह के मुख्य आकर्षण',
    content: 'The annual entertainment awards ceremony celebrated outstanding achievements in film, music, and television. The event was attended by industry leaders and celebrities.',
    contentHindi: 'वार्षिक मनोरंजन पुरस्कार समारोह ने फिल्म, संगीत और टेलीविजन में उत्कृष्ट उपलब्धियों का जश्न मनाया।',
    excerpt: 'The annual entertainment awards ceremony celebrated outstanding achievements in film, music, and television...',
    excerptHindi: 'वार्षिक मनोरंजन पुरस्कार समारोह ने उत्कृष्ट उपलब्धियों का जश्न मनाया...',
    categoryId: '5',
    featuredImage: 'https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Entertainment',
    status: 'published',
    isFeatured: false,
    isActive: true,
    tags: ['entertainment', 'awards', 'celebrities']
  },
  {
    title: 'Science: Space Exploration Update',
    titleHindi: 'विज्ञान: अंतरिक्ष अन्वेषण अपडेट',
    content: 'NASA announces new missions to explore distant planets and search for signs of extraterrestrial life. These missions will push the boundaries of human exploration.',
    contentHindi: 'नासा ने दूर के ग्रहों की खोज और अलौकिक जीवन के संकेतों की खोज के लिए नए मिशन की घोषणा की।',
    excerpt: 'NASA announces new missions to explore distant planets and search for signs of extraterrestrial life...',
    excerptHindi: 'नासा ने दूर के ग्रहों की खोज के लिए नए मिशन की घोषणा की...',
    categoryId: '6',
    featuredImage: 'https://via.placeholder.com/800x400/06b6d4/ffffff?text=Science',
    status: 'published',
    isFeatured: true,
    isActive: true,
    tags: ['science', 'space', 'NASA']
  }
];



const sampleUsers = [
  {
    email: 'john.smith@newshub.com',
    firstName: 'John',
    lastName: 'Smith',
    password: 'password123',
    role: 'author',
    isActive: true
  },
  {
    email: 'sarah.johnson@newshub.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    password: 'password123',
    role: 'author',
    isActive: true
  },
  {
    email: 'mike.chen@newshub.com',
    firstName: 'Mike',
    lastName: 'Chen',
    password: 'password123',
    role: 'author',
    isActive: true
  },
  {
    email: 'emily.brown@newshub.com',
    firstName: 'Emily',
    lastName: 'Brown',
    password: 'password123',
    role: 'author',
    isActive: true
  },
  {
    email: 'lisa.wang@newshub.com',
    firstName: 'Lisa',
    lastName: 'Wang',
    password: 'password123',
    role: 'author',
    isActive: true
  },
  {
    email: 'robert.wilson@newshub.com',
    firstName: 'Robert',
    lastName: 'Wilson',
    password: 'password123',
    role: 'author',
    isActive: true
  }
];

// Authentication function
async function login() {
  try {
    console.log('🔐 Logging in...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@newshub.com',
      password: 'admin123'
    });
    authToken = response.data.token;
    console.log('✅ Login successful');
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

// Upload categories
async function uploadCategories() {
  console.log('\n📂 Uploading categories...');
  const categoryIds = [];
  
  for (const category of sampleCategories) {
    try {
      const response = await axios.post(`${BASE_URL}/categories`, category, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      categoryIds.push(response.data._id);
      console.log(`✅ Created category: ${category.name}`);
    } catch (error) {
      console.error(`❌ Failed to create category ${category.name}:`, error.response?.data || error.message);
    }
  }
  
  return categoryIds;
}

// Upload articles
async function uploadArticles(categoryIds) {
  console.log('\n📰 Uploading articles...');
  
  for (let i = 0; i < sampleArticles.length; i++) {
    const article = { ...sampleArticles[i] };
    article.categoryId = categoryIds[i % categoryIds.length];
    
    try {
      const response = await axios.post(`${BASE_URL}/articles`, article, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log(`✅ Created article: ${article.title}`);
    } catch (error) {
      console.error(`❌ Failed to create article ${article.title}:`, error.response?.data || error.message);
    }
  }
}



// Upload users
async function uploadUsers() {
  console.log('\n👥 Uploading users...');
  
  for (const user of sampleUsers) {
    try {
      const response = await axios.post(`${BASE_URL}/users`, user, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log(`✅ Created user: ${user.firstName} ${user.lastName}`);
    } catch (error) {
      console.error(`❌ Failed to create user ${user.firstName}:`, error.response?.data || error.message);
    }
  }
}

// Upload breaking news
async function uploadBreakingNews() {
  console.log('\n📰 Uploading breaking news...');
  
  for (const news of sampleBreakingNews) {
    try {
      const response = await axios.post(`${BASE_URL}/breaking-news`, news, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log(`✅ Created breaking news: ${news.title}`);
    } catch (error) {
      console.error(`❌ Failed to create breaking news ${news.title}:`, error.response?.data || error.message);
    }
  }
}

// Main function
async function uploadSampleData() {
  console.log('🚀 Starting sample data upload...\n');
  
  // Login
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.error('❌ Cannot proceed without authentication');
    return;
  }
  
  // Upload data
  const categoryIds = await uploadCategories();
  await uploadArticles(categoryIds);
  await uploadUsers();
  await uploadBreakingNews();
  
  console.log('\n🎉 Sample data upload completed!');
  console.log('\n📊 Summary:');
  console.log(`- Categories: ${sampleCategories.length}`);
  console.log(`- Articles: ${sampleArticles.length}`);
  console.log(`- Users: ${sampleUsers.length}`);
  console.log(`- Breaking News: ${sampleBreakingNews.length}`);
  console.log('\n🌐 You can now access your data at:');
  console.log(`- Frontend: http://news.aawashyak.com`);
  console.log(`- API Docs: http://news.aawashyak.com:3000/api-docs`);
}

// Run the script
uploadSampleData().catch(console.error); 