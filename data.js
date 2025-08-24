// Fund Raise Project Data
// This file contains all the data for the fundraising project

// Database as a global JavaScript variable
const appData = {
  fundRequirements: [
    {
      id: 1,
      purpose: "Tamil Class",
      perMonth: 20000,
      total: 120000
    },
    {
      id: 2,
      purpose: "Maths Class",
      perMonth: 24000,
      total: 144000
    },
    {
      id: 3,
      purpose: "Paper Discussion",
      perMonth: 10000,
      total: 60000
    },
    {
      id: 4,
      purpose: "Science Seminar",
      perMonth: 5000,
      total: 30000
    }
  ],  donations: [
    {
      id: 1,
      name: "External Donations",
      amount: 15000,
      date: "2025-08-01"
    },
    {
      id: 2,
      name: "Generous Hand Members",
      amount: 60000,
      date: "2025-08-15"
    },
    {
      id: 2,
      name: "External Donations",
      amount: 12500,
      date: "2025-08-20"
    }
  ],
  settings: {
    currency: "LKR",
    lastUpdated: "2025-08-24"
  },  translations: {
    en: {
      "project-title": "Fund Raising Project",
      "required": "REQUIRED",
      "collected": "COLLECTED",
      "remaining": "REMAINING",
      "recent-donations": "Recent Donations",
      "fund-requirement": "Fund Requirement",
      "purpose": "Purpose",
      "per-month": "Per month (LKR)",
      "total": "Total (LKR)",
      "donations": "Donations",      "source": "Source",
      "amount": "Amount (LKR)",
      "date": "Date",
      "add-donation": "Add New Donation",
      "donor-name-placeholder": "Donor Name",
      "amount-placeholder": "Amount in LKR",
      "donate-btn": "Donate",
      "donate-link": "DONATE NOW",
      "donation-description": "Support our education initiative! Your contribution helps provide quality education to underprivileged students.",
      "one-time": "One-time",
      "monthly": "Monthly",
      "validation-message": "Please enter valid name and donation amount."
    },    si: {
      "project-title": "අරමුදල් රැස් කිරීමේ ව්‍යාපෘතිය",
      "required": "අවශ්‍ය මුදල",
      "collected": "එකතු කළ මුදල",
      "remaining": "ඉතිරි මුදල",
      "recent-donations": "මෑත පරිත්‍යාග",
      "fund-requirement": "අරමුදල් අවශ්‍යතා",
      "purpose": "අරමුණ",
      "per-month": "මසකට (LKR)",
      "total": "මුළු එකතුව (LKR)",
      "donations": "පරිත්‍යාග",      "source": "මූලාශ්‍රය",
      "amount": "මුදල (LKR)",
      "date": "දිනය",
      "add-donation": "නව පරිත්‍යාගයක් එකතු කරන්න",
      "donor-name-placeholder": "පරිත්‍යාගශීලියාගේ නම",
      "amount-placeholder": "මුදල (LKR)",
      "donate-btn": "පරිත්‍යාග කරන්න",
      "donate-link": "දැන් පරිත්‍යාග කරන්න",
      "donation-description": "අපගේ අධ්‍යාපන මුලපිරීම සඳහා සහාය වන්න! ඔබේ දායකත්වය අඩු වරප්‍රසාදිත සිසුන්ට ගුණාත්මක අධ්‍යාපනයක් ලබා දීමට උපකාරී වේ.",
      "one-time": "එක් වරක්",
      "monthly": "මාසික",
      "validation-message": "කරුණාකර වලංගු නමක් සහ පරිත්‍යාග මුදලක් ඇතුළත් කරන්න."
    },    ta: {
      "project-title": "நிதி திரட்டும் திட்டம்",
      "required": "தேவைப்படுகிறது",
      "collected": "சேகரிக்கப்பட்டது",
      "remaining": "மீதமுள்ளது",
      "recent-donations": "சமீபத்திய நன்கொடைகள்",
      "fund-requirement": "நிதி தேவை",
      "purpose": "நோக்கம்",
      "per-month": "மாதத்திற்கு (LKR)",
      "total": "மொத்தம் (LKR)",
      "donations": "நன்கொடைகள்",      "source": "மூலம்",
      "amount": "தொகை (LKR)",
      "date": "தேதி",
      "add-donation": "புதிய நன்கொடை சேர்க்க",
      "donor-name-placeholder": "நன்கொடையாளர் பெயர்",
      "amount-placeholder": "தொகை (LKR)",
      "donate-btn": "நன்கொடை அளி",
      "donate-link": "இப்போது நன்கொடை அளி",
      "donation-description": "எங்கள் கல்வி முயற்சிக்கு ஆதரவளியுங்கள்! உங்கள் பங்களிப்பு குறைவான வசதி கொண்ட மாணவர்களுக்கு தரமான கல்வியை வழங்க உதவுகிறது.",
      "one-time": "ஒரு முறை",
      "monthly": "மாதாந்திர",
      "validation-message": "சரியான பெயர் மற்றும் நன்கொடை தொகையை உள்ளிடவும்."
    }
  }
};
