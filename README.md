# Playwright SauceDemo UI Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.43.0-green?style=flat-square&logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![Jenkins](https://img.shields.io/badge/Jenkins-2.559-red?style=flat-square&logo=jenkins)
![Allure](https://img.shields.io/badge/Allure-Report-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

An end-to-end UI Test Automation Framework built with **Playwright (JavaScript)** following the **Page Object Model (POM)** design pattern. The framework covers login validation and full checkout flow on [SauceDemo](https://www.saucedemo.com), with CI/CD integration via **Jenkins** and rich test reporting via **Allure**.

---

## 📁 Project Structure

```
playwright-saucedemo-ui/
├── config/
│   └── config.js            # Central config — reads all values from .env
├── pages/
│   ├── BasePage.js          # Common Playwright action wrappers (extended by all pages)
│   ├── LoginPage.js         # Login page locators and actions
│   ├── InventoryPage.js     # Products page locators and actions
│   └── CheckoutPage.js      # Cart and checkout page locators and actions
├── tests/
│   ├── login.spec.js        # Login validation test suite (TC01–TC03)
│   └── checkout.spec.js     # End-to-end checkout test suite (TC04–TC06)
├── test-data/
│   └── users.json           # All test data — expected messages, checkout info
├── .env                     # Environment variables — never committed to GitHub
├── .gitignore
├── playwright.config.js     # Playwright configuration — browsers, timeouts, reporters
├── Jenkinsfile              # Declarative Jenkins pipeline
└── package.json
```

---

## 🧪 Test Coverage

| Test ID | Suite | Description |
|---------|-------|-------------|
| TC01 | Login | Valid user successfully logs in and lands on Products page |
| TC02 | Login | Locked out user sees correct error message |
| TC03 | Login | Empty credentials submission shows error |
| TC04 | Checkout | Adding first item updates cart badge to 1 |
| TC05 | Checkout | Navigating to cart shows correct page title |
| TC06 | Checkout | Full E2E checkout flow completes with order confirmation |

---

## 🏗️ Framework Design Principles

- **Zero Hardcoding** — all credentials in `.env`, all test data in `users.json`, all config in `config.js`
- **Page Object Model** — each page has its own class with locators and actions clearly separated
- **BasePage** — common Playwright actions (`click`, `fill`, `getText`, `waitForElement`) centralized to avoid duplication
- **Data-driven** — test data and expected messages are externalized from test files
- **CI/CD Ready** — Jenkins injects credentials at runtime; no secrets ever touch GitHub
- **Stable Locators** — `data-test` attributes used throughout for maximum selector stability

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- [Java](https://adoptium.net/) v21 (required for Allure report generation)
- [Git](https://git-scm.com/)

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Prethumnan/playwright-saucedemo-ui.git
cd playwright-saucedemo-ui
```

### 2. Install dependencies

```bash
npm ci
npx playwright install chromium --with-deps
```

### 3. Create `.env` file at the project root

```env
BASE_URL=https://www.saucedemo.com
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
LOCKED_USERNAME=locked_out_user
LOCKED_PASSWORD=secret_sauce
```

### 4. Run tests

```bash
# Run all tests
npm test

# Run tests and open Allure report
npm run test:allure
```

---

## 📊 Allure Report

The framework uses **Allure** for rich, interactive test reporting.

```bash
# Run tests + generate + open report in one command
npm run test:allure

# Or step by step
npx playwright test
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🔧 NPM Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all Playwright tests |
| `npm run test:allure` | Run tests, generate and open Allure report |
| `npm run allure:generate` | Generate Allure report from existing results |
| `npm run allure:open` | Open the generated Allure report in browser |

---

## 🔁 CI/CD Pipeline — Jenkins

The project includes a **declarative Jenkinsfile** with the following pipeline stages:

```
Checkout → Install Dependencies → Run Tests → Generate Allure Report → Publish Report
```

### Jenkins Setup

1. Install plugins: **NodeJS**, **HTML Publisher**
2. Go to **Manage Jenkins → Tools** → add NodeJS 18 installation named `NodeJS-18`
3. Go to **Manage Jenkins → Credentials** → add the following as **Secret text**:

| Credential ID | Value |
|---|---|
| `BASE_URL` | `https://www.saucedemo.com` |
| `VALID_USERNAME` | `standard_user` |
| `VALID_PASSWORD` | `secret_sauce` |
| `LOCKED_USERNAME` | `locked_out_user` |
| `LOCKED_PASSWORD` | `secret_sauce` |

4. Create a **Pipeline** job → set definition to **Pipeline script from SCM** → point to this repo
5. Click **Build Now**

> **Note:** Jenkins injects credentials as environment variables at runtime. The same `config.js` works locally (via `.env`) and in Jenkins (via injected credentials) without any code changes.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright | Browser automation |
| JavaScript (ES6) | Programming language |
| Page Object Model | Framework design pattern |
| dotenv | Environment variable management |
| Allure | Test reporting |
| Jenkins | CI/CD pipeline |
| Git + GitHub | Version control |

---

## 👤 Author

**Prethumnan J**  
QA Automation Engineer  
[LinkedIn](https://linkedin.com/in/prethumnan) · [GitHub](https://github.com/Prethumnan)
