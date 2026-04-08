# 🗓️ Interactive DSA Wall Calendar

A beautifully crafted interactive calendar component built with **React**, **TypeScript**, and **Tailwind CSS**.  
Designed specifically for developers and competitive programmers, this calendar emulates a physical wall calendar where each month focuses on a different **Data Structure or Algorithm (DSA)** topic. It features topic-specific hero images, intuitive date range selection, persistent problem-tracking notes, and smooth swipe animations.

![Calendar Demo](https://via.placeholder.com/800x400?text=Interactive+DSA+Calendar+Demo)

---

## ✨ Features

### Core Requirements
- **Wall Calendar Aesthetic** – A clean, rectangular card layout featuring a prominent DSA-themed hero image at the top, mimicking a real wall calendar.
- **Date Range Selector** – Click any date to start a range, click another to complete it. Perfect for setting up problem-solving sprints or tracking days spent on a specific topic.
- **Integrated Problem Notes** – Notes are saved to `localStorage` and are context-aware, making it easy to track your coding progress:
  - General monthly goals (e.g., "Master Dynamic Programming")
  - Notes for a single date (e.g., "Solved 3 LeetCode Hard Trees problems")
  - Notes for a selected date range (e.g., "Weekly Contest Revision")
- **Fully Responsive** – Works flawlessly on desktop, tablet, and mobile. Desktop uses a side-by-side calendar + notes layout; mobile stacks vertically.

### Creative Enhancements
- 🖼️ **DSA Topic Hero Images** – The hero image changes each month to represent a different DSA topic (e.g., Arrays, Pointers, Binary Search, Trees, Graphs, Dynamic Programming) to keep your learning themed and focused.
- 📖 **Smooth Swipe Navigation** – Tap the **top-left corner** to go to the previous month, or the **bottom-right corner** to go to the next month. Features a custom 1.5s sliding animation where the calendar sweeps off-screen while the background transitions instantly.
- 🌈 **Topic-Themed Backgrounds** – Each month features a subtle background corresponding to that month's DSA topic to set the mood without distracting from the dates.
- 📌 **Today Indicator** – The current date is highlighted so you never lose track of your daily coding streak.
- 💾 **Persistent Storage** – All your problem-solving notes and logs are saved locally; they survive browser refreshes and are instantly restored when you revisit the calendar.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI framework |
| **TypeScript** | Type safety and better maintainability |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS v4** | Utility-first styling (with custom CSS for swipe animations) |
| **date-fns** | Date manipulation (formatting, comparisons, range checks) |
| **localStorage** | Client-side persistence for problem logs and notes |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Shashwata32/Intern_TUF.git](https://github.com/Shashwata32/Intern_TUF.git)
   cd Intern_TUF

2. **Install dependencies and start server**
npm install
npm run dev
