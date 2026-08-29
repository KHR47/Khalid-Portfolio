<div align="center">

# 🌌 Md. Khalid Hasan — Modern Developer Portfolio

An ultra-sleek, responsive, and performance-optimized personal portfolio web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Motion**.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-7cd5df?style=for-the-badge&logo=vercel&logoColor=white)](https://khalid-portfolio-ochre.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Motion](https://img.shields.io/badge/Motion-Framer-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)

[**Explore Live Demo »**](https://khalid-portfolio-ochre.vercel.app/)

</div>

---

## ✨ Features & Highlights

- **🪐 Immersive Space Aesthetic:** Cosmic dark theme featuring deep radial gradients, interactive canvas starfield, and glassmorphic panels.
- **⚡ Reactive Navigation & Scrollspy:** Sticky header with real-time reading progress bar, dynamic section tracking (`#about`, `#education`, `#skills`, `#projects`, `#contact`), and smooth scroll offsets.
- **🎓 Academic Journey & Qualifications:** Structured timeline detailing B.Sc. in CSE at AIUB, HSC at Rajshahi New Govt. Degree College, and SSC at Rajshahi Collegiate School with key competencies.
- **🧲 Micro-Interactions & Physics:** Magnetic buttons with spring physics, character and word reveals, and staggered viewport entrance animations.
- **🛠️ Categorized Skills Matrix:** Interactive badges grouped across Languages, Backend Frameworks, Frontend, Databases, AI/ML, and Tools.
- **💼 Interactive Project Showcase & Case Study Modals:** Filterable grid of 10 engineering projects spanning AI/NLP (BERT & RoBERTa), full-stack platforms, REST APIs, desktop applications, and computer graphics simulations with case-study modals.
- **📬 Full-Stack Contact API:** Integrated contact route supporting **Resend API** for high-deliverability emails, **Nodemailer SMTP** as a fallback, quick inquiry topic pills, and one-click email copying.
- **📱 Fully Responsive:** Adaptive mobile navigation drawer, fluid typography clamps, and tailored layouts for all screen sizes.
- **🔍 SEO & Social Graph:** Configured with OpenGraph, Twitter card metadata, dynamic typography from Google Fonts (`Space Grotesk` + `Manrope`), and SVG icons.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) with React Compiler optimization |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Animation Engine** | [Motion](https://motion.dev/) (`motion/react`) |
| **Styling** | Vanilla CSS Design System with CSS Variables |
| **Typography** | Google Fonts (`Space Grotesk` & `Manrope`) via `next/font` |
| **Email Services** | [Resend](https://resend.com/) & [Nodemailer](https://nodemailer.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```
portfolio-next/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Serverless email dispatch handler
│   ├── favicon.ico
│   ├── globals.css               # Global theme tokens, gradients & resets
│   ├── layout.tsx                # Root layout with SEO and font configurations
│   └── page.tsx                  # Home entry point
├── components/
│   ├── animations/               # Reusable Motion animation primitives
│   │   ├── MagneticButton.tsx    # Magnetic mouse-tracking button
│   │   ├── Reveal.tsx            # In-view scroll entrance wrapper
│   │   ├── StaggerGroup.tsx      # Staggered children container
│   │   ├── Starfield.tsx         # Lightweight canvas starfield animation
│   │   ├── TextReveal.tsx        # Dynamic character/word reveal
│   │   ├── useScrollProgress.ts  # Custom hook for window scroll tracking
│   │   └── index.ts              # Component exports
│   ├── EducationTimeline.tsx     # Academic qualifications and timeline
│   ├── ProjectModal.tsx          # Case study modal dialog
│   └── PortfolioPage.tsx         # Main portfolio layout and interactive state
├── public/                       # Static images, icons, and SVG graphics
├── styles/
│   └── portfolio.css             # Component styling, layouts, and responsive queries
├── .env.example                  # Environment configuration template
├── next.config.ts                # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.18.0` or later
- npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/KHR47/Khalid-Portfolio.git
cd Khalid-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (Optional)
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Populate the values if you wish to test live email delivery:
```env
# Resend (Recommended)
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=hasankhalid16648@gmail.com
RESEND_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"

# SMTP Fallback (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

*(Note: If no email credentials are provided, the contact form automatically logs submissions to the console in local demo mode.)*

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🚢 Deployment on Vercel

1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. In **Project Settings > Environment Variables**, add:
   - `RESEND_API_KEY`: Your API key from [Resend](https://resend.com)
   - `CONTACT_TO_EMAIL`: `hasankhalid16648@gmail.com`
   - `RESEND_FROM_EMAIL`: `Portfolio Contact <onboarding@resend.dev>`
4. Deploy! Next.js App Router and API routes will be configured automatically.

---

## 👤 Author

**Md. Khalid Hasan**
* Final-semester Computer Science & Engineering Student at American International University-Bangladesh (AIUB)
* **GitHub:** [@KHR47](https://github.com/KHR47)
* **LinkedIn:** [linkedin.com/in/khr47](https://www.linkedin.com/in/khr47/)
* **Email:** [hasankhalid16648@gmail.com](mailto:hasankhalid16648@gmail.com)
* **Phone:** +880 1568-966255

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
