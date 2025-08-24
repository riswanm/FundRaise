// Database management - Default data for fallback
let appData = {
  fundRequirements: [
    {
      "id": 1,
      "purpose": "Tamil Class",
      "perMonth": 20000,
      "total": 120000
    },
    {
      "id": 2,
      "purpose": "Maths Class",
      "perMonth": 24000,
      "total": 144000
    },
    {
      "id": 3,
      "purpose": "Paper Discussion",
      "perMonth": 10000,
      "total": 60000
    },
    {
      "id": 4,
      "purpose": "Science Seminar",
      "perMonth": 5000,
      "total": 30000
    }
  ],
  donations: [
    {
      "id": 1,
      "name": "External Donations",
      "amount": 15000,
      "note": "One-time",
      "date": "2025-08-01"
    },
    {
      "id": 2,
      "name": "Generous Hand Members",
      "amount": 60000,
      "note": "Monthly",
      "date": "2025-08-15"
    }
  ],
  settings: {"currency": "LKR"},
  translations: {
    "en": {
      "project-title": "Fund Raising Project",
      "required": "REQUIRED",
      "collected": "COLLECTED",
      "remaining": "REMAINING",
      "recent-donations": "Recent Donations",
      "fund-requirement": "Fund Requirement",
      "purpose": "Purpose",
      "per-month": "Per month (LKR)",
      "total": "Total (LKR)",
      "donations": "Donations",
      "source": "Source",
      "amount": "Amount (LKR)",
      "note": "Note",
      "add-donation": "Add New Donation",
      "donor-name-placeholder": "Donor Name",
      "amount-placeholder": "Amount in LKR",
      "donate-btn": "Donate",
      "one-time": "One-time",
      "monthly": "Monthly",
      "validation-message": "Please enter valid name and donation amount."
    }
  }
};

// Calculate initial totals from default data
let totalRequired = appData.fundRequirements.reduce((sum, item) => sum + (item.total || 0), 0);
let totalCollected = appData.donations.reduce((sum, item) => sum + (item.amount || 0), 0);

// Load data from JSON file
async function loadData() {
  try {
    console.log("Attempting to load data.json...");
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    appData = await response.json();
    console.log("Data loaded successfully:", appData);
    
    // Calculate totals
    totalRequired = appData.fundRequirements.reduce((sum, item) => sum + item.total, 0);
    totalCollected = appData.donations.reduce((sum, item) => sum + item.amount, 0);
    
    console.log(`Total Required: ${totalRequired}, Total Collected: ${totalCollected}`);
    
    // Render data
    renderFundRequirements();
    renderDonations();
    updateSummary();
    updateRecentDonations();
    
    return true;
  } catch (error) {
    console.error('Error loading data:', error);
    
    // Let's fall back to hardcoded data for now
    useHardcodedData();
    return false;
  }
}

// Use hardcoded data as fallback
function useHardcodedData() {
  console.log("Using hardcoded data as fallback");
  appData = {
    "fundRequirements": [
      {
        "id": 1,
        "purpose": "Tamil Class",
        "perMonth": 20000,
        "total": 120000
      },
      {
        "id": 2,
        "purpose": "Maths Class",
        "perMonth": 24000,
        "total": 144000
      },
      {
        "id": 3,
        "purpose": "Paper Discussion",
        "perMonth": 10000,
        "total": 60000
      },
      {
        "id": 4,
        "purpose": "Science Seminar",
        "perMonth": 5000,
        "total": 30000
      }
    ],
    "donations": [
      {
        "id": 1,
        "name": "External Donations",
        "amount": 15000,
        "note": "One-time",
        "date": "2025-08-01"
      },
      {
        "id": 2,
        "name": "Generous Hand Members",
        "amount": 60000,
        "note": "Monthly",
        "date": "2025-08-15"
      }
    ],
    "settings": {
      "currency": "LKR",
      "lastUpdated": "2025-08-24"
    },
    "translations": {
      "en": {
        "project-title": "Fund Raising Project",
        "required": "REQUIRED",
        "collected": "COLLECTED",
        "remaining": "REMAINING",
        "recent-donations": "Recent Donations",
        "fund-requirement": "Fund Requirement",
        "purpose": "Purpose",
        "per-month": "Per month (LKR)",
        "total": "Total (LKR)",
        "donations": "Donations",
        "source": "Source",
        "amount": "Amount (LKR)",
        "note": "Note",
        "add-donation": "Add New Donation",
        "donor-name-placeholder": "Donor Name",
        "amount-placeholder": "Amount in LKR",
        "donate-btn": "Donate",
        "one-time": "One-time",
        "monthly": "Monthly",
        "validation-message": "Please enter valid name and donation amount."
      },
      "si": {
        "project-title": "අරමුදල් රැස් කිරීමේ ව්‍යාපෘතිය",
        "required": "අවශ්‍ය මුදල",
        "collected": "එකතු කළ මුදල",
        "remaining": "ඉතිරි මුදල",
        "recent-donations": "මෑත පරිත්‍යාග",
        "fund-requirement": "අරමුදල් අවශ්‍යතා",
        "purpose": "අරමුණ",
        "per-month": "මසකට (LKR)",
        "total": "මුළු එකතුව (LKR)",
        "donations": "පරිත්‍යාග",
        "source": "මූලාශ්‍රය",
        "amount": "මුදල (LKR)",
        "note": "සටහන",
        "add-donation": "නව පරිත්‍යාගයක් එකතු කරන්න",
        "donor-name-placeholder": "පරිත්‍යාගශීලියාගේ නම",
        "amount-placeholder": "මුදල (LKR)",
        "donate-btn": "පරිත්‍යාග කරන්න",
        "one-time": "එක් වරක්",
        "monthly": "මාසික",
        "validation-message": "කරුණාකර වලංගු නමක් සහ පරිත්‍යාග මුදලක් ඇතුළත් කරන්න."
      },
      "ta": {
        "project-title": "நிதி திரட்டும் திட்டம்",
        "required": "தேவைப்படுகிறது",
        "collected": "சேகரிக்கப்பட்டது",
        "remaining": "மீதமுள்ளது",
        "recent-donations": "சமீபத்திய நன்கொடைகள்",
        "fund-requirement": "நிதி தேவை",
        "purpose": "நோக்கம்",
        "per-month": "மாதத்திற்கு (LKR)",
        "total": "மொத்தம் (LKR)",
        "donations": "நன்கொடைகள்",
        "source": "மூலம்",
        "amount": "தொகை (LKR)",
        "note": "குறிப்பு",
        "add-donation": "புதிய நன்கொடை சேர்க்க",
        "donor-name-placeholder": "நன்கொடையாளர் பெயர்",
        "amount-placeholder": "தொகை (LKR)",
        "donate-btn": "நன்கொடை அளி",
        "one-time": "ஒரு முறை",
        "monthly": "மாதாந்திர",
        "validation-message": "சரியான பெயர் மற்றும் நன்கொடை தொகையை உள்ளிடவும்."
      }
    }
  };
  
  // Calculate totals
  totalRequired = appData.fundRequirements.reduce((sum, item) => sum + item.total, 0);
  totalCollected = appData.donations.reduce((sum, item) => sum + item.amount, 0);
  
  // Render data
  renderFundRequirements();
  renderDonations();
  updateSummary();
  updateRecentDonations();
}

// Save data to localStorage (as we can't write to a file from browser)
function saveData() {
  localStorage.setItem('fundRaiseData', JSON.stringify(appData));
  
  // In a real application, this would be an API call to save the data on the server
  console.log('Data saved to localStorage');
}

// Try to load from localStorage if fetch fails
function loadFromLocalStorage() {
  console.log("Attempting to load from localStorage");
  const savedData = localStorage.getItem('fundRaiseData');
  if (savedData) {
    try {
      appData = JSON.parse(savedData);
      console.log("Loaded data from localStorage:", appData);
      
      if (!appData || !appData.fundRequirements || !appData.donations) {
        console.error('Invalid data structure in localStorage');
        return false;
      }
      
      totalRequired = appData.fundRequirements.reduce((sum, item) => sum + (item.total || 0), 0);
      totalCollected = appData.donations.reduce((sum, item) => sum + (item.amount || 0), 0);
      
      console.log(`Total Required from localStorage: ${totalRequired}, Total Collected: ${totalCollected}`);
      return true;
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return false;
    }
  }
  console.log("No data found in localStorage");
  return false;
}

// Functions for rendering data from our JSON database
function renderFundRequirements() {
  const tableBody = document.querySelector('.card:nth-child(1) table tbody');
  if (!tableBody) {
    console.error("Fund requirements table body not found!");
    return;
  }
  
  tableBody.innerHTML = '';
  
  if (!appData.fundRequirements || appData.fundRequirements.length === 0) {
    console.warn("No fund requirements data found!");
    return;
  }
  
  appData.fundRequirements.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.purpose || 'Unknown'}</td>
      <td>${formatCurrency(item.perMonth || 0)}</td>
      <td>${formatCurrency(item.total || 0)}</td>
    `;
    tableBody.appendChild(row);
  });
}

function renderDonations() {
  const tableBody = document.getElementById('donation-table-body');
  if (!tableBody) {
    console.error("Donation table body not found!");
    return;
  }
  
  tableBody.innerHTML = '';
  
  if (!appData.donations || appData.donations.length === 0) {
    console.warn("No donations data found!");
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="3">No donations yet</td>
    `;
    tableBody.appendChild(row);
    return;
  }
  
  appData.donations.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name || 'Anonymous'}</td>
      <td>${formatCurrency(item.amount || 0)}</td>
      <td>${item.note || ''}</td>
    `;
    tableBody.appendChild(row);
  });
  
  updateRecentDonations();
}

function formatCurrency(amount) {
  if (amount === undefined || amount === null) {
    return '0';
  }
  try {
    return amount.toLocaleString();
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '0';
  }
}

function updateSummary() {
  document.getElementById("collected").textContent = formatCurrency(totalCollected);
  document.getElementById("remaining").textContent = formatCurrency(totalRequired - totalCollected);
  document.getElementById("required").textContent = formatCurrency(totalRequired);

  // Ensure we don't divide by zero
  let progress = totalRequired > 0 
    ? Math.min((totalCollected / totalRequired) * 100, 100).toFixed(1) 
    : "0.0";
  
  const progressBarElement = document.getElementById("progress-bar-inner");
  if (progressBarElement) {
    progressBarElement.style.width = progress + "%";
    progressBarElement.textContent = progress + "%";
  } else {
    console.error("Progress bar element not found!");
  }
}

function addDonation() {
  const name = document.getElementById("donorName").value;
  const amount = parseFloat(document.getElementById("donationAmount").value);
  const lang = window.currentLanguage || "en";
  
  if (!name || isNaN(amount) || amount <= 0) {
    return alert(appData.translations[lang]["validation-message"]);
  }

  // Generate new ID
  const newId = appData.donations.length > 0 ? Math.max(...appData.donations.map(d => d.id)) + 1 : 1;
  
  // Create donation object with current date
  const newDonation = {
    id: newId,
    name: name,
    amount: amount,
    note: appData.translations[lang]["one-time"],
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  };
  
  // Add to database
  appData.donations.push(newDonation);
  totalCollected += amount;
  
  // Save to localStorage
  saveData();
  
  // Update UI
  const tableBody = document.getElementById("donation-table-body");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${name}</td><td>${formatCurrency(amount)}</td><td>${appData.translations[lang]["one-time"]}</td>`;
  tableBody.appendChild(row);

  document.getElementById("donorName").value = "";
  document.getElementById("donationAmount").value = "";

  // Show a brief success animation
  const button = document.querySelector(".donation-form button");
  const originalText = button.textContent;
  button.textContent = lang === "en" ? "Thank You!" : (lang === "si" ? "ස්තුතියි!" : "நன்றி!");
  button.style.backgroundColor = "#2ecc71";
  setTimeout(() => {
    button.textContent = appData.translations[lang]["donate-btn"];
    button.style.backgroundColor = "#3498db";
  }, 2000);

  updateSummary();
  updateRecentDonations();
}

function updateRecentDonations() {
  const recentList = document.getElementById("recent-donations");
  
  if (!recentList) {
    console.error("Recent donations list element not found!");
    return;
  }
  
  recentList.innerHTML = "";
  
  if (!appData.donations || appData.donations.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No donations yet";
    recentList.appendChild(li);
    return;
  }
  
  // Sort by date, most recent first, and take the 4 most recent
  const recent = [...appData.donations]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
  
  for (let d of recent) {
    const li = document.createElement("li");
    li.textContent = `${d.name}: LKR ${formatCurrency(d.amount)}`;
    recentList.appendChild(li);
  }
}

// Set the UI language
function setLanguage(lang) {
  if (!appData.translations[lang]) return;
  
  // Save selected language to localStorage
  localStorage.setItem("preferredLanguage", lang);
  
  // Update active button
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.id === "lang-" + lang) {
      btn.classList.add("active");
    }
  });
  
  // Set body class for language-specific styling
  document.body.classList.remove("lang-en", "lang-si", "lang-ta");
  document.body.classList.add("lang-" + lang);
  
  // Update all translatable elements
  document.querySelectorAll("[data-lang-key]").forEach(element => {
    const key = element.getAttribute("data-lang-key");
    
    if (element.tagName === "INPUT") {
      element.placeholder = appData.translations[lang][key] || element.placeholder;
    } else {
      element.textContent = appData.translations[lang][key] || element.textContent;
    }
  });
  
  // Update thank you message and validation message
  window.currentLanguage = lang;
  
  // Update the UI with the new language
  updateSummary();
}

// Handle refresh button click
function refreshData() {
  const refreshButton = document.getElementById('refresh-data');
  refreshButton.classList.add('spinning');
  
  loadData()
    .then(() => {
      setTimeout(() => {
        refreshButton.classList.remove('spinning');
      }, 500);
    })
    .catch(() => {
      refreshButton.classList.remove('spinning');
    });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", async function() {
  console.log("DOM Content Loaded - initializing application");

  // Show loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  }

  // Try to load data from JSON file first
  let dataLoaded = await loadData();
  
  // If loading from JSON file fails, try localStorage
  if (!dataLoaded) {
    console.log("Loading from JSON failed, trying localStorage");
    dataLoaded = loadFromLocalStorage();
    
    if (dataLoaded) {
      console.log("Data loaded from localStorage");
      // Since we loaded from localStorage, we need to manually update the UI
      renderFundRequirements();
      renderDonations();
      updateSummary();
      updateRecentDonations();
    } else {
      console.log("No data in localStorage either, using hardcoded data");
      // If both methods fail, use hardcoded data
      useHardcodedData();
    }
  }
  
  // Hide loading indicator
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
  
  // Make sure UI is initialized, even if data loading had issues
  renderFundRequirements();
  renderDonations();
  updateSummary();
  updateRecentDonations();
  
  // Set up language switcher
  const languageButtons = document.querySelectorAll(".lang-btn");
  languageButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const lang = this.id.replace("lang-", "");
      setLanguage(lang);
    });
  });
  
  // Setup refresh button
  const refreshButton = document.getElementById('refresh-data');
  if (refreshButton) {
    refreshButton.addEventListener('click', refreshData);
  }
  
  // Load preferred language or default to English
  const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
  setLanguage(savedLanguage);
});
