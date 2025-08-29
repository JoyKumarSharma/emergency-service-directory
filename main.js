// --- DOM Element Selection Section ---
const heartCountEl = document.getElementById('heart-count');
const coinCountEl = document.getElementById('coin-count');
const copyCountEl = document.getElementById('copy-count');
const cardContainer = document.getElementById('card-container');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

// --- Global State Section ---
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// --- Data Section (Services) ---
const services = [
    { name: 'National Emergency Number', englishName: 'National Emergency', hotlineNumber: '999', category: 'All', icon: 'assets/emergency.png' },
    { name: 'Police Helpline Number', englishName: 'Police', hotlineNumber: '999', category: 'Police', icon: 'assets/police.png' },
    { name: 'Fire Service Number', englishName: 'Fire Service', hotlineNumber: '999', category: 'Fire', icon: 'assets/fire-service.png' },
    { name: 'Ambulance Service', englishName: 'Ambulance', hotlineNumber: '1994-999999', category: 'Health', icon: 'assets/ambulance.png' },
    { name: 'Women & Child Helpline', englishName: 'Women & Child Helpline', hotlineNumber: '109', category: 'Help', icon: 'assets/emergency.png' },
    { name: 'Anti-Corruption Helpline', englishName: 'Anti-Corruption', hotlineNumber: '106', category: 'Govt.', icon: 'assets/emergency.png' },
    { name: 'Electricity Helpline', englishName: 'Electricity Outage', hotlineNumber: '16216', category: 'Electricity', icon: 'assets/emergency.png' },
    { name: 'Brac Helpline', englishName: 'Brac', hotlineNumber: '16445', category: 'NGO', icon: 'assets/brac.png' },
    { name: 'Bangladesh Railway Helpline', englishName: 'Bangladesh Railway', hotlineNumber: '163', category: 'Travel', icon: 'assets/Bangladesh-Railway.png' },
];

// --- Function to Render Cards ---
function renderCards() {
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'bg-white p-8 rounded-xl shadow-md flex flex-col justify-between';
        card.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <img src="${service.icon}" alt="${service.englishName}" class="w-12 h-12">
                <span class="text-xl heart-icon cursor-pointer">❤️</span>
            </div>
            <div class="text-center mb-4">
                <h4 class="text-xl font-bold">${service.name}</h4>
                <p class="text-sm text-gray-500">${service.englishName}</p>
                <p class="text-2xl font-bold text-gray-800 mt-2">${service.hotlineNumber}</p>
            </div>
            <div class="flex justify-center mb-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">${service.category}</span>
            </div>
            <div class="flex space-x-2">
                <button class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors copy-btn" data-hotline="${service.hotlineNumber}">
                    <i class="fas fa-copy mr-1"></i>
                    Copy
                </button>
                <button class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors call-btn" data-service-name="${service.name}" data-hotline="${service.hotlineNumber}">
                    <i class="fas fa-phone mr-1"></i>
                    Call
                </button>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// --- Event Listeners Section ---
cardContainer.addEventListener('click', (event) => {
    const heartIcon = event.target.closest('.heart-icon');
    if (heartIcon) {
        heartCount++;
        heartCountEl.textContent = heartCount;
    }

    const callBtn = event.target.closest('.call-btn');
    if (callBtn) {
        const serviceName = callBtn.dataset.serviceName;
        const hotline = callBtn.dataset.hotline;

        if (coinCount >= 20) {
            coinCount -= 20;
            coinCountEl.textContent = coinCount;
            alert(`Calling ${serviceName} at ${hotline}.`);

            const historyItem = document.createElement('li');
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            historyItem.className = 'bg-gray-100 p-4 rounded-lg flex justify-between items-center';
            historyItem.innerHTML = `
                <div>
                    <p class="font-bold">${serviceName}</p>
                    <p class="text-gray-600 text-sm">${hotline}</p>
                </div>
                <span class="text-sm text-gray-500">${timeString}</span>
            `;
            historyList.prepend(historyItem);
        } else {
            alert('Insufficient coins.');
        }
    }

    const copyBtn = event.target.closest('.copy-btn');
    if (copyBtn) {
        const hotline = copyBtn.dataset.hotline;
        navigator.clipboard.writeText(hotline)
            .then(() => {
                alert(`Phone number ${hotline} copied!`);
                copyCount++;
                copyCountEl.textContent = copyCount;
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
});

// --- Clear History Button Click Event ---
clearHistoryBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
});

// --- Initial Page Load Section ---
renderCards();