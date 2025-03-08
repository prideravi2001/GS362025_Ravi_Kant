# [GS362025_Ravi_Kant]('https://gs-362025-ravi-kant-8pt6q08os-ravikants-projects.vercel.app/')

## Vercel Link - `https://gs-362025-ravi-kant-8pt6q08os-ravikants-projects.vercel.app/`


## 📌 Instructions to Run and Test the Code

### 1️⃣ Install Dependencies

Ensure you have Node.js installed. Then, install the required dependencies:

```bash
npm install
```

### 2️⃣ Run the Development Server

Start the React application:

```bash
npm run dev
```

### 3️⃣ Open in Browser

Go to `http://localhost:5174/` to view the **Planning Table**.

### 4️⃣ Test Features

- **Column Sorting & Resizing**: Click on column headers.
- **Conditional Formatting**: Observe color-coded `GM Percent` values.
- **Header Merging**: `Feb → Week → Sales Metrics` should be grouped correctly.
- **Row Spanning**: `Store` column should span rows where applicable.

---

## ✅ Elements Done Well

###  **Rouing**

### 🏆 **Header Merging & Nested Columns**

- Successfully implemented **multi-level headers** using `marryChildren: true`.
- Grouped `Feb` → `Week 01` → `Sales Metrics` effectively.
- Ensures better data organization and readability.

### 🎨 **Conditional Formatting (GM % Highlighting)**

- Used **custom class functions** to color cells dynamically:
  - **Green (High GM%)** → Profitable products.
  - **Yellow (Medium GM%)** → Needs attention.
  - **Red (Low GM%)** → Underperforming products.
- This enhances **visual clarity** for better decision-making.

### 🔄 **Row Spanning for Stores**

- Merged rows dynamically for **better readability**.
- Uses an efficient function to determine **when to span rows**.
- Reduces redundancy and **improves data visualization**.

---

## ⏳ Improvements with 4 More Hours

###  ***LogIn Functinality***

### 🚀 **Dynamic API Integration**

- Replace **static JSON data** with an API call.
- Fetch live data using `useEffect` and `fetch`/`axios`.
- Ensures real-time data updates for planning.

### 📊 **Export & Printing Features**

- Add **CSV Export & Print Functionality** using AG-Grid features.
<!-- - Helps users **download reports** for further analysis. -->

### 🖌 **Enhanced Styling & UX**

- Improve **mobile responsiveness** using Tailwind CSS.
- Add **tooltips & hover effects** for better user experience.
- Customize AG-Grid theme for a cleaner UI.

---

Thank you for reviewing my solution! 🚀 Let me know if you'd like any enhancements.


