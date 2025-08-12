// Wanderlust Adventures - Main JavaScript File 
// Global Variables 
let currentTheme = localStorage.getItem('theme') || 'light'; 
let userLocation = null; 
let nearbyDestinations = []; 
 
// Destination Data with Coordinates 
const destinations = [ 
    { 
        id: 1, 
        title: "Paris, France", 
        description: "The City of Light offers iconic landmarks, world-class museums, and exquisite cuisine.", 
        image: "https://images.unsplash.com/photo-15026028985348610c9d4aefd?w=400&h=300&fit=crop", 
        price: "From $800", 
        coordinates: { lat: 48.8566, lng: 2.3522 } 
    }, 
    { 
        id: 2, 
        title: "Tokyo, Japan", 
        description: "A fascinating blend of ultramodern and traditional, offering unique cultural experiences.", 
        image: "https://images.unsplash.com/photo-1540959733332eab4deabeeaf?w=400&h=300&fit=crop", 
        price: "From $1200", 
        coordinates: { lat: 35.6762, lng: 139.6503 } 
    }, 
    { 
        id: 3, 
        title: "New York, USA", 
        description: "The Big Apple - a city that never sleeps with endless entertainment and culture.", 
        image: "https://images.unsplash.com/photo-14964422266668d4d0e62e6e9?w=400&h=300&fit=crop", 
        price: "From $600", 
        coordinates: { lat: 40.7128, lng: -74.0060 } 
    }, 
    { 
        id: 4, 
        title: "Santorini, Greece", 
        description: "Stunning white architecture, crystal blue waters, and breathtaking sunsets.", 
        image: "https://images.unsplash.com/photo-1570077188670e3a8d69ac5ff?w=400&h=300&fit=crop", 
        price: "From $1000", 
        coordinates: { lat: 36.3932, lng: 25.4615 } 
    }, 
    { 
        id: 5, 
        title: "Bali, Indonesia", 
        description: "Tropical paradise with rich culture, beautiful beaches, and spiritual temples.", 
        image: "https://images.unsplash.com/photo-1537953773345d172ccf13cf1?w=400&h=300&fit=crop", 
        price: "From $900", 
        coordinates: { lat: -8.3405, lng: 115.0920 } 
    }, 
    { 
        id: 6, 
        title: "London, UK", 
        description: "Historic city with royal palaces, world-famous museums, and vibrant culture.", 
        image: "https://images.unsplash.com/photo-151363526997559663e0ac1ad?w=400&h=300&fit=crop", 
        price: "From $1000", 
        coordinates: { lat: 51.5074, lng: -0.1278 } 
    }, 
    { 
        id: 7, 
        title: "Rome, Italy", 
        description: "Eternal city with ancient ruins, art masterpieces, and delicious Italian cuisine.", 
        image: "https://images.unsplash.com/photo-1552832230cb7b2c2c0b8f?w=400&h=300&fit=crop", 
        price: "From $700", 
        coordinates: { lat: 41.9028, lng: 12.4964 } 
    }, 
    { 
        id: 8, 
        title: "Sydney, Australia", 
        description: "Harbor city with iconic Opera House, beautiful beaches, and outdoor lifestyle.", 
        image: "https://images.unsplash.com/photo-1506973035872a4ec16b8e8d9?w=400&h=300&fit=crop", 
        price: "From $1500", 
        coordinates: { lat: -33.8688, lng: 151.2093 } 
    } 
]; 
 
// Sample Community Posts 
let communityPosts = [ 
    { 
        id: 1, 
        name: "Sarah Johnson", 
message: "Just returned from an amazing trip to Paris! The Eiffel Tower at sunset was absolutely magical. Highly recommend visiting in spring!", 
        image: "https://images.unsplash.com/photo-15026028985348610c9d4aefd?w=400&h=300&fit=crop", 
        date: "2024-01-15", 
        timestamp: Date.now() - 86400000 
    }, 
    { 
        id: 2, 
        name: "Mike Chen", 
        message: "Tokyo was incredible! The blend of traditional temples and modern technology is fascinating. Don't miss the cherry blossom season!", 
        image: "https://images.unsplash.com/photo-1540959733332eab4deabeeaf?w=400&h=300&fit=crop", 
        date: "2024-01-10", 
        timestamp: Date.now() - 172800000 
    }, 
    { 
        id: 3, 
        name: "Emma Davis", 
        message: "Santorini exceeded all expectations! The white buildings against the blue sea create the most picturesque views. Perfect for honeymoons!", 
        image: "https://images.unsplash.com/photo-1570077188670e3a8d69ac5ff?w=400&h=300&fit=crop", 
        date: "2024-01-05", 
        timestamp: Date.now() - 259200000 
    } 
]; 
 
// Initialize the application 
document.addEventListener('DOMContentLoaded', function() { 
    initializeApp(); 
}); 
 
function initializeApp() { 
    // Set initial theme 
    setTheme(currentTheme); 
     
    // Initialize components 
    initializeNavigation(); 
    initializeDestinationCards(); 
    initializeContactForm(); 
    initializeCommunitySection(); 
    initializeThemeToggle(); 
    initializeSearchAndGeolocation(); 
     
    // Load saved data 
    loadSavedData(); 
} 
 
// Navigation with Active State 
function initializeNavigation() { 
    const navLinks = document.querySelectorAll('.nav-link'); 
     
    navLinks.forEach(link => { 
        link.addEventListener('click', function(e) { 
            e.preventDefault(); 
             
            // Remove active class from all links 
            navLinks.forEach(l => l.classList.remove('active')); 
             
            // Add active class to clicked link 
            this.classList.add('active'); 
             
            // Smooth scroll to section 
            const targetId = this.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId); 
            if (targetSection) { 
                targetSection.scrollIntoView({ behavior: 'smooth' }); 
            } 
        }); 
    }); 
     
    // Update active state based on scroll position 
    window.addEventListener('scroll', updateActiveNavigation); 
} 
 
function updateActiveNavigation() { 
    const sections = document.querySelectorAll('section[id]'); 
    const navLinks = document.querySelectorAll('.nav-link'); 
     
    let current = ''; 
    sections.forEach(section => { 
        const sectionTop = section.offsetTop; 
        const sectionHeight = section.clientHeight; 
        if (window.pageYOffset >= sectionTop - 200) { 
            current = section.getAttribute('id'); 
        } 
    }); 
     
    navLinks.forEach(link => { 
        link.classList.remove('active'); 
        if (link.getAttribute('href') === `#${current}`) { 
            link.classList.add('active'); 
        } 
    }); 
} 
 
// Destination Cards Generation 
function initializeDestinationCards() { 
    const destinationsGrid = document.getElementById('destinationsGrid'); 
     
    destinations.forEach(destination => { 
        const card = createDestinationCard(destination); 
        destinationsGrid.appendChild(card); 
    }); 
} 
 
function createDestinationCard(destination) { 
    const card = document.createElement('div'); 
    card.className = 'destination-card'; 
     
    card.innerHTML = ` 
        <img src="${destination.image}" alt="${destination.title}" class="destination-image"> 
        <div class="destination-content"> 
            <h3 class="destination-title">${destination.title}</h3> 
            <p class="destination-description">${destination.description}</p> 
            <p class="destination-price">${destination.price}</p> 
            <div class="destination-actions"> 
                <button class="btn btn-primary" onclick="learnMore('${destination.title}')">Learn 
More</button> 
                <button class="btn btn-secondary" 
onclick="shareExperience('${destination.title}')">Share Experience</button> 
            </div> 
        </div> 
    `; 
     
    return card; 
} 
 
// Search and Geolocation 
function initializeSearchAndGeolocation() { 
    const findNearbyBtn = document.getElementById('findNearbyBtn'); 
    const searchInput = document.getElementById('searchInput'); 
     
    findNearbyBtn.addEventListener('click', findNearbyDestinations); 
    searchInput.addEventListener('input', filterDestinations); 
} 
 
function findNearbyDestinations() { 
    const findNearbyBtn = document.getElementById('findNearbyBtn'); 
    findNearbyBtn.textContent = 'Finding...'; 
    findNearbyBtn.disabled = true; 
     
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition( 
            position => { 
                userLocation = { 
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude 
                }; 
                 
                calculateNearbyDestinations(); 
                findNearbyBtn.textContent = 'Find Nearby'; 
                findNearbyBtn.disabled = false; 
            }, 
            error => { 
                console.error('Error getting location:', error); 
                alert('Unable to get your location. Please check your browser settings.'); 
                findNearbyBtn.textContent = 'Find Nearby'; 
                findNearbyBtn.disabled = false; 
            } 
        ); 
    } else { 
        alert('Geolocation is not supported by this browser.'); 
        findNearbyBtn.textContent = 'Find Nearby'; 
        findNearbyBtn.disabled = false; 
    } 
} 
 
function calculateNearbyDestinations() { 
    if (!userLocation) return; 
     
    nearbyDestinations = destinations 
        .map(dest => ({ 
            ...dest, 
            distance: calculateDistance(userLocation.lat, userLocation.lng, dest.coordinates.lat, 
dest.coordinates.lng) 
        })) 
        .filter(dest => dest.distance <= 50) // Within 50km 
        .sort((a, b) => a.distance - b.distance) 
        .slice(0, 5); // Top 5 closest 
     
    displayNearbyDestinations(); 
} 
 
function calculateDistance(lat1, lng1, lat2, lng2) { 
    const R = 6371; // Earth's radius in kilometers 
    const dLat = (lat2 - lat1) * Math.PI / 180; 
    const dLng = (lng2 - lng1) * Math.PI / 180; 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLng/2) * Math.sin(dLng/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
} 
 
function displayNearbyDestinations() { 
    const nearbySection = document.getElementById('nearbySection'); 
    const nearbyGrid = document.getElementById('nearbyGrid'); 
     
    if (nearbyDestinations.length === 0) { 
        nearbySection.style.display = 'none'; 
        return; 
    } 
     
    nearbySection.style.display = 'block'; 
    nearbyGrid.innerHTML = ''; 
     
    nearbyDestinations.forEach(dest => { 
        const card = document.createElement('div'); 
        card.className = 'destination-card'; 
         
        card.innerHTML = ` 
            <img src="${dest.image}" alt="${dest.title}" class="destination-image"> 
            <div class="destination-content"> 
                <h3 class="destination-title">${dest.title}</h3> 
                <p class="destination-description">${dest.description}</p> 
                <p class="destination-price">${dest.price}</p> 
                <p class="destination-distance">${dest.distance.toFixed(1)} km away</p> 
                <div class="destination-actions"> 
                    <button class="btn btn-primary" onclick="learnMore('${dest.title}')">Learn 
More</button> 
                    <button class="btn btn-secondary" onclick="shareExperience('${dest.title}')">Share 
Experience</button> 
                </div> 
            </div> 
        `; 
         
        nearbyGrid.appendChild(card); 
    }); 
} 
 
function filterDestinations() { 
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); 
    const destinationCards = document.querySelectorAll('.destination-card'); 
     
    destinationCards.forEach(card => { 
const title = card.querySelector('.destination-title').textContent.toLowerCase(); 
const description = card.querySelector('.destination-description').textContent.toLowerCase(); 
 
if (title.includes(searchTerm) || description.includes(searchTerm)) { 
    card.style.display = 'block'; 
} else { 
    card.style.display = 'none'; 
} 
    }); 
} 
 
// Contact Form with Validation 
function initializeContactForm() { 
    const contactForm = document.getElementById('contactForm'); 
     
    contactForm.addEventListener('submit', function(e) { 
        e.preventDefault(); 
         
        if (validateForm()) { 
            saveContactData(); 
            showSuccessMessage(); 
            contactForm.reset(); 
        } 
    }); 
} 
 
function validateForm() { 
    let isValid = true; 
     
    // Reset error messages 
    document.querySelectorAll('.error-message').forEach(msg => msg.textContent = ''); 
     
    // Validate name 
    const name = document.getElementById('name').value.trim(); 
    if (!name) { 
        document.getElementById('nameError').textContent = 'Name is required'; 
        isValid = false; 
    } 
     
    // Validate email 
    const email = document.getElementById('email').value.trim(); 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!email) { 
        document.getElementById('emailError').textContent = 'Email is required'; 
        isValid = false; 
    } else if (!emailRegex.test(email)) { 
        document.getElementById('emailError').textContent = 'Please enter a valid email address'; 
        isValid = false; 
    } 
     
    // Validate message 
    const message = document.getElementById('message').value.trim(); 
    if (!message) { 
        document.getElementById('messageError').textContent = 'Message is required'; 
        isValid = false; 
    } 
     
    return isValid; 
} 
 
function saveContactData() { 
    const formData = { 
        name: document.getElementById('name').value, 
        email: document.getElementById('email').value, 
        destination: document.getElementById('destination').value, 
        message: document.getElementById('message').value, 
        timestamp: new Date().toISOString() 
    }; 
     
    // Get existing data or create new array 
    let existingData = JSON.parse(localStorage.getItem('contactSubmissions') || '[]'); 
    existingData.push(formData); 
     
    // Save to localStorage 
    localStorage.setItem('contactSubmissions', JSON.stringify(existingData)); 
} 
 
function showSuccessMessage() { 
    const successMessage = document.getElementById('successMessage'); 
    successMessage.style.display = 'block'; 
     
    setTimeout(() => { 
        successMessage.style.display = 'none'; 
    }, 5000); 
} 
 
// Community Section 
function initializeCommunitySection() { 
    const postForm = document.getElementById('postForm'); 
     
    postForm.addEventListener('submit', function(e) { 
        e.preventDefault(); 
        submitPost(); 
    }); 
     
    displayCommunityPosts(); 
} 
 
function submitPost() { 
    const name = document.getElementById('postName').value.trim(); 
    const message = document.getElementById('postMessage').value.trim(); 
    const image = document.getElementById('postImage').value.trim(); 
     
    if (!name || !message) { 
        alert('Please fill in all required fields.'); 
        return; 
    } 
     
    const newPost = { 
        id: Date.now(), 
        name: name, 
        message: message, 
        image: image || null, 
        date: new Date().toISOString().split('T')[0], 
        timestamp: Date.now() 
    }; 
     
    communityPosts.unshift(newPost); 
    saveCommunityPosts(); 
    displayCommunityPosts(); 
     
    // Reset form 
    document.getElementById('postForm').reset(); 
} 
 
function displayCommunityPosts() { 
    const communityFeed = document.getElementById('communityFeed'); 
    communityFeed.innerHTML = ''; 
     
    communityPosts.forEach(post => { 
        const postCard = createPostCard(post); 
        communityFeed.appendChild(postCard); 
    }); 
} 
 
function createPostCard(post) { 
    const postCard = document.createElement('div'); 
    postCard.className = 'post-card'; 
     
    const timeAgo = getTimeAgo(post.timestamp); 
     
    postCard.innerHTML = ` 
        <div class="post-header"> 
            <span class="post-author">${post.name}</span> 
            <span class="post-date">${timeAgo}</span> 
        </div> 
        <p class="post-content">${post.message}</p> 
        ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''} 
        <div class="post-actions"> 
            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button> 
        </div> 
    `; 
     
    return postCard; 
} 
 
function deletePost(postId) { 
    if (confirm('Are you sure you want to delete this post?')) { 
        communityPosts = communityPosts.filter(post => post.id !== postId); 
        saveCommunityPosts(); 
        displayCommunityPosts(); 
    } 
} 
 
function saveCommunityPosts() { 
    localStorage.setItem('communityPosts', JSON.stringify(communityPosts)); 
} 
 
function getTimeAgo(timestamp) { 
    const now = Date.now(); 
    const diff = now - timestamp; 
     
    const minutes = Math.floor(diff / 60000); 
    const hours = Math.floor(diff / 3600000); 
    const days = Math.floor(diff / 86400000); 
     
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`; 
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`; 
    return `${days} day${days !== 1 ? 's' : ''} ago`; 
} 
 
// Light/Dark Mode Toggle 
function initializeThemeToggle() { 
    const themeToggle = document.getElementById('themeToggle'); 
     
    themeToggle.addEventListener('click', function() { 
        currentTheme = currentTheme === 'light' ? 'dark' : 'light'; 
        setTheme(currentTheme); 
        localStorage.setItem('theme', currentTheme); 
    }); 
} 
 
function setTheme(theme) { 
    document.documentElement.setAttribute('data-theme', theme); 
     
    const themeToggle = document.getElementById('themeToggle'); 
    if (theme === 'dark') { 
        themeToggle.textContent = '  '; 
    } else { 
        themeToggle.textContent = '  '; 
    } 
} 
 
// Utility Functions 
function learnMore(destinationName) { 
    alert(`Learn more about ${destinationName}! This would typically open a detailed page or 
modal.`); 
} 
 
function shareExperience(destinationName) { 
    // Pre-fill the post form with destination name 
    document.getElementById('postMessage').value = `I just visited ${destinationName} and it 
was amazing! `; 
    document.getElementById('postMessage').focus(); 
     
    // Scroll to community section 
    document.getElementById('community').scrollIntoView({ behavior: 'smooth' }); 
} 
 
// Load saved data on page load 
function loadSavedData() { 
    // Load community posts 
    const savedPosts = localStorage.getItem('communityPosts'); 
    if (savedPosts) { 
        communityPosts = JSON.parse(savedPosts); 
        displayCommunityPosts(); 
    } 
} 
// Handle window resize for responsive design 
window.addEventListener('resize', function() { 
// Recalculate layouts if needed 
if (nearbyDestinations.length > 0) { 
displayNearbyDestinations(); 
} 
});