// The appData variable is now loaded from data.js
// No need to define it here

// Calculate initial totals
let totalRequired = 0;
let totalCollected = 0;

// This will be called once the DOM is loaded and appData is available
function calculateTotals() {
  totalRequired = appData.fundRequirements.reduce((sum, item) => sum + item.total, 0);
  totalCollected = appData.donations.reduce((sum, item) => sum + item.amount, 0);
}

// Initialize data function
function initializeData() {
  // Calculate totals from the appData (loaded from data.js)
  calculateTotals();
  
  // Render data
  renderFundRequirements();
  renderDonations();
  updateSummary();
  updateRecentDonations();
  
  return true;
}

// Save data to localStorage (temporary storage only)
function saveData() {
  localStorage.setItem('fundRaiseData', JSON.stringify(appData));
  
  // Note: This only saves changes to browser storage
  // Changes will not be saved to data.json file
  // In a real application, this would be an API call to save the data on the server
  console.log('Changes saved to temporary browser storage');
}

// No localStorage loading functionality - we'll only use JSON file

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
  
  // Sort donations by date in descending order (most recent first)
  const sortedDonations = [...appData.donations].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  sortedDonations.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name || 'Anonymous'}</td>
      <td>${formatCurrency(item.amount || 0)}</td>
      <td>${formatDate(item.date) || ''}</td>
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

function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if parsing fails
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
  const today = new Date().toISOString().split('T')[0];
  row.innerHTML = `<td>${name}</td><td>${formatCurrency(amount)}</td><td>${formatDate(today)}</td>`;
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

// Refresh functionality removed

// Initialize the page
document.addEventListener("DOMContentLoaded", function() {
  // Show loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  }

  // Initialize data (now synchronous since we don't need to fetch)
  initializeData();
  
  // Hide loading indicator
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
  
  // Set up language switcher
  const languageButtons = document.querySelectorAll(".lang-btn");
  languageButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const lang = this.id.replace("lang-", "");
      setLanguage(lang);
    });
  });
    // Refresh button setup removed
  
  // Load preferred language or default to English
  const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
  setLanguage(savedLanguage);
});
