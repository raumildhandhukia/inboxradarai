# InboxRadarAI

Welcome to **InboxRadarAI**, a revolutionary SaaS AI application designed to automate your email management process. This documentation will guide you through the features, setup, and usage of the app.

## Overview

InboxRadarAI integrates seamlessly with your Gmail inbox, utilizing advanced Large Language Model (LLM) technology, **Gemini**, to intercept, process, and categorize your emails with precision.

### Key Features

- **Intelligent Email Tagging and Classification**: Automatically tags and classifies emails, allowing for custom label creation and automated labeling.
- **AI Suggestions and Autocomplete**: Assists in drafting emails with AI-powered suggestions and autocomplete functionality.
- **AI Insights**: Provides short summary of email content.
- **Multi-Inbox Support**: Supports managing multiple Gmail inboxes within a single interface.
- **Email-Client**: Capable of recieving, sending and replying to threads. 
- **Subscription Tiers**: Offers both free and pro tiers, integrated with Stripe for payment processing.

## Getting Started

## Technology Stack

- **Frontend**: 
  - Next.js
  - React
  - TypeScript
  - TailwindCSS

- **Backend**:
  - Node.js
  - TypeScript
  - Prisma ORM

- **Database**: 
  - PostgreSQL

- **Authentication**: 
  - Auth.js (OAuth for Google)

- **AI & APIs**:
  - Gemini API
  - Gmail API

- **Payment Integration**: 
  - Stripe

- **DevOps**: 
  - Vercel (for deployment)

### Installation

1. **Setup**
- Clone The Repo
- Setup stripe product. Save new priceId to config/app.ts
- Setup gmail API credentials, gemini API credentials
- Setup postgreSQL database
- Setup Resend 

2. **Set Environment Variables**
```
AUTH_SECRET=
GOOGLE_API_KEY=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_YAHOO_CLIENT_ID=
AUTH_YAHOO_SECRET=
SENDER_GMAIL=
SENDER_GMAIL_APP_PASSWORD=
RESEND_API_KEY=
GENAI_API_KEY=
NEXTAUTH_URL=
NEXT_PUBLIC_APP_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
REPLICATE_API_TOKEN=
CRON_KEY=
```
3. **Install the packages**
```
npm i
```
4. **Run**
```
npm run dev
```
