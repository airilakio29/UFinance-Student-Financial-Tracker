# UFinance — Student Financial Tracker 🎓💰

A simple, modern, student-focused financial management website designed to track allowances, tuition fees, daily expenses, category budget limits, and savings goals in **Ringgit Malaysia (RM)** with real-time updates.

---

## ✨ Features

- **🎓 Student-Centric Interface**: Designed specifically for university & college students with friendly metrics (*Allowance Balance*, *Semester Budget Health*, *Tuition Savings*).
- **✨ Sparkling Gemstone Background**: Interactive HTML5 Canvas particle background generating sparkling emerald, mint, and gold crystal gems behind surface cards.
- **📊 Real-time Financial Dashboard**:
  - 4 Key RM Metric Cards (Total Balance, Total Income, Total Expenses, Saved Goals).
  - Direct SVG Category Spending Pie Chart with interactive hover tooltips & legend.
  - Semester Budget Health progress meter.
  - Recent transaction history table.
- **💳 Income & Expense Tracking**: Filter by search, category, or type. Supports recurring transactions (e.g. monthly hostel rent or allowance) and instant **CSV Data Export**.
- **🎯 Category Budget Caps**: Set monthly budget limits per category with visual color alerts (Green <70%, Amber 70-90%, Red >90%).
- **🌱 Savings Goals**: Set goals for laptops, reference textbooks, or emergency funds with target dates, visual progress bars, and deposit modal forms.
- **⚙️ Data Management & Guest Mode**: LocalStorage persistence, custom category creation, LocalStorage JSON backup/restore, and instant Guest Mode toggle.

---

## 🚀 Tech Stack

- **Frontend**: React, Lucide Icons, Canvas API, Modular CSS Design System (`Inter` & `Plus Jakarta Sans`).
- **Backend**: Node.js Express server (`server.js`).
- **Data Storage**: Client-side LocalStorage JSON persistence + JSON backup/restore.

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/airilakio29/UFinance-Student-Financial-Tracker.git
   cd UFinance-Student-Financial-Tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5174/`.

---

## 🛠️ Build for Production

To create an optimized production build:
```bash
npm run build
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
