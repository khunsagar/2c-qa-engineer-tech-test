# 🧪 Test Execution Guide

## 🔧 Installation

### Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Git**: Latest version

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd 2c-qa-engineer-tech-test
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Install Playwright Browsers
```bash
npx playwright install
```

### Step 4: Start Development Server
```bash
npm run dev
```
Application will be available at: `http://localhost:3000`

---

## Running Tests

### Run All Tests
```bash
npm run test:e2e
```

### Test Types

#### **1. UI Tests**
Test user interface interactions (forms, buttons, navigation)
```bash
npm run test:e2e:ui
```

#### **2. API Tests**
Test REST API endpoints (GET, POST, validation)
```bash
npm run test:e2e:api
```

#### **3. Accessibility Tests**
Test WCAG compliance using Axe-core
```bash
npm run test:e2e:a11y
```

#### **4. End-to-End Tests**
Complete user flows (add book → view details → navigate back)
```bash
npm run test:e2e
```

---

## Running Tests on Different Platforms

### **Desktop Browsers**

#### Chrome (Chromium)
```bash
npm run test:e2e:chromium
```

#### Firefox
```bash
npm run test:e2e:firefox
```

#### Safari (WebKit)
```bash
npm run test:e2e:webkit
```

#### Microsoft Edge
```bash
npm run test:e2e:edge
```

### **Mobile Devices**

#### Android (Pixel 5)
```bash
npm run test:e2e:mobile-android
```

#### iOS (iPhone 12)
```bash
npm run test:e2e:mobile-ios
```

### **Tablet Devices**

#### iPad Air
```bash
npm run test:e2e:tablet
```

---

## Debug Mode

### Run Tests in Headed Mode (Browser Visible)
```bash
npm run test:e2e:headed
```

### Run Tests in Debug Mode with Inspector
```bash
npm run test:e2e:debug
```

---

## 📊 Test Reports


#### **Open Report Automatically**
```bash
npx playwright show-report
```

#### **Manual Navigation**
1. Navigate to `playwright-report/` folder
2. Open `index.html` in your browser

### Report Location ( sample reports added inside e2e as this is undergit ignore due to size)
```
report/
├── index.html          # Main report dashboard
└── data/              # Test execution data
```

