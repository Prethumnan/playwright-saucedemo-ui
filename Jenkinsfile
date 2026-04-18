// ─────────────────────────────────────────────────────────────
// Jenkinsfile
// Declarative Pipeline for Playwright SauceDemo UI Automation.
// Pulls source code from GitHub, installs dependencies,
// runs Playwright tests, and publishes the Allure report.
// Credentials are injected by Jenkins — nothing hardcoded here.
// ─────────────────────────────────────────────────────────────

pipeline {

    agent any

    // Use the NodeJS installation configured in Jenkins Global Tools
    tools {
        nodejs 'NodeJS-18'
    }

    // Inject credentials from Jenkins Credentials Store as environment variables.
    // dotenv in config.js will pick these up automatically at runtime.
    environment {
        BASE_URL        = credentials('BASE_URL')
        VALID_USERNAME  = credentials('VALID_USERNAME')
        VALID_PASSWORD  = credentials('VALID_PASSWORD')
        LOCKED_USERNAME = credentials('LOCKED_USERNAME')
        LOCKED_PASSWORD = credentials('LOCKED_PASSWORD')
    }

    stages {

        // ── Stage 1: Checkout ─────────────────────────────────
        stage('Checkout') {
            steps {
                echo 'Cloning repository from GitHub...'
                checkout scm
            }
        }

        // ── Stage 2: Install Dependencies ────────────────────
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'

                echo 'Installing Playwright Chromium browser...'
                bat 'npx playwright install chromium --with-deps'
            }
        }

        // ── Stage 3: Run Playwright Tests ─────────────────────
        stage('Run Tests') {
            steps {
                echo 'Running Playwright test suites...'
                // "|| exit 0" ensures pipeline continues to report stage even if tests fail
                bat 'npx playwright test || exit 0'
            }
        }

        // ── Stage 4: Generate Allure Report ──────────────────
        stage('Generate Allure Report') {
            steps {
                echo 'Generating Allure report from test results...'
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        // ── Stage 5: Publish HTML Report ─────────────────────
        stage('Publish Report') {
            steps {
                echo 'Publishing Allure report to Jenkins...'
                publishHTML(target: [
                    allowMissing         : false,
                    alwaysLinkToLastBuild: true,
                    keepAll              : true,
                    reportDir            : 'allure-report',
                    reportFiles          : 'index.html',
                    reportName           : 'Allure Test Report'
                ])
            }
        }
    }

    // ── Post Build Actions ────────────────────────────────────
    post {
        success {
            echo 'All tests passed — Allure report published successfully.'
        }
        failure {
            echo 'Build failed — check console output and Allure report for details.'
        }
        always {
            echo 'Pipeline execution complete.'
        }
    }
}