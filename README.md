# 🕌 Mumin API Documentation - The Knowledge Portal

```text
██████╗  ██████╗  ██████╗███████╗
██╔══██╗██╔═══██╗██╔════╝██╔════╝
██║  ██║██║   ██║██║     ███████╗
██║  ██║██║   ██║██║     ╚════██║
██████╔╝╚██████╔╝╚██████╗███████║
╚═════╝  ╚═════╝  ╚═════╝╚══════╝
```

> **Clarity in Transmission. Excellence in Documentation.**

The **Mumin API Documentation Hub** is a premium, interactive developer portal tailored for the Mumin Hadith ecosystem. Built on **Nextra** (Next.js 14), it is designed to guide developers from their first glance at the API to production-grade integrations, emphasizing speed, interactivity, and authentic Islamic aesthetics.

---

## 📖 Table of Contents

1.  [Vision: Knowledge Transmission (Isnad)](#1-vision-knowledge-transmission-isnad)
2.  [The Nextra Engine](#2-the-nextra-engine)
3.  [Interactive Documentation Architecture](#3-interactive-documentation-architecture)
    - [The Live API Playground](#the-live-api-playground)
    - [The Code Sandbox (React-Live)](#the-code-sandbox-react-live)
4.  [Premium Design System in Docs](#4-premium-design-system-in-docs)
    - [Typography for Scholarship](#typography-for-scholarship)
    - [Islamic Geometric Backdrop Engine](#islamic-geometric-backdrop-engine)
5.  [Content Strategy & MDX Pipeline](#5-content-strategy--mdx-pipeline)
    - [Getting Started Path](#getting-started-path)
    - [Advanced Integration Guides](#advanced-integration-guides)
    - [SDK & Language Reference](#sdk--language-reference)
6.  [Custom MDX Component Library Reference](#6-custom-mdx-component-library-reference)
    - [InteractiveExample](#interactiveexample)
    - [CodePlayground](#codeplayground)
    - [LanguageTabs](#languagetabs)
    - [ApiEndpoint](#apiendpoint)
    - [ResponseExample](#responseexample)
7.  [Developer Experience (DX) Optimizations](#7-developer-experience-dx-optimizations)
    - [Global Search (Algolia/FlexSearch)](#global-search-algoliaflexsearch)
    - [Multi-Language Code Generation](#multi-language-code-generation)
8.  [Setup & Local Development](#8-setup--local-development)
    - [Prerequisites](#prerequisites)
    - [Environment Setup](#environment-setup)
9.  [Writing Documentation (Contributor's Guide)](#9-writing-documentation-contributors-guide)
    - [Standard MDX Layouts](#standard-mdx-layouts)
    - [Using Interactive Components](#using-interactive-components)
10. [SEO & Performance Engineering](#10-seo--performance-engineering)
    - [Meta Tags & OpenGraph Strategy](#meta-tags--opengraph-strategy)
    - [PWA & Offline Capability](#pwa--offline-capability)
11. [Deployment & CI/CD](#11-deployment--cicd)
    - [Vercel & Edge Functions](#vercel--edge-functions)
    - [Automated Link Checking](#automated-link-checking)
12. [Security & API Safety](#12-security--api-safety)
13. [Future Roadmap](#13-future-roadmap)
14. [Troubleshooting](#14-troubleshooting)
15. [Final Word](#15-final-word)

---

## 1. Vision: Knowledge Transmission (Isnad)

Inspired by the concept of **Isnad** (chain of transmission), we ensure that our documentation is a clear and unbreakable bridge between the sacred text and the developer's code. 

Our goals are:
- **Zero-Friction Onboarding**: Get your first Hadith response in < 60 seconds.
- **Visual Serenity**: An interface that matches the sanctity of the content.
- **Empowerment**: Providing all the tools (SDKs, examples, tutorials) to build the next generation of Islamic apps.

---

## 2. The Nextra Engine

We chose **Nextra** because it combines the power of **Next.js 14** with the simplicity of **MDX**. This allows us to write documentation in Markdown while embedding high-performance React components (our Playground) directly in the flow of text.

- **Theme**: Custom built on the `nextra-theme-docs` base.
- **Search**: Built-in FlexSearch index for instant, local search results.
- **SEO**: Automated schema.org metadata generation for every page.

---

## 3. Interactive Documentation Architecture

### The Live API Playground
Unlike static documentation, our playground makes **REAL** calls to the Mumin API. 
- **Parameter Hydration**: Query params and body fields are automatically generated based on the component props.
- **Auth Simulation**: Developers can input their test keys to see live responses.

### The Code Sandbox (React-Live)
Using **React-Live**, we offer a browser-based console. Developers can write their own JavaScript fetch calls and see the output immediately, reducing the need for local testing during exploration.

---

## 4. Premium Design System in Docs

### Typography for Scholarship
- **Serif (Playfair Display)**: Used for H1 and H2 tags to mirror the look of a classical Tazhib (manuscript).
- **Monospace (Fira Code)**: Optimized for code readability with ligatures for common operators (`=>`, `===`).

### Islamic Geometric Backdrop Engine
The background pattern is not an image but a **dynamic canvas**. 
- **Light Theme**: Emerald lines on a soft off-white grid.
- **Dark Theme**: Gold lines on a deep sapphire-emerald gradient.

---

## 5. Content Strategy & MDX Pipeline

Our content is divided into three logical tiers:

1.  **Learning (Tutorials)**: "How do I build X?"
2.  **Reference (API)**: "What does this endpoint return?"
3.  **Governance (Policy)**: Terms of Service, Rate Limits, and Security.

---

## 6. Custom MDX Component Library Reference

### `InteractiveExample`
The workhorse of the docs.
```tsx
<InteractiveExample 
  method="GET" 
  endpoint="/v1/hadiths"
  queryParams={[
    { name: 'lang', default: 'en', type: 'select', options: ['en', 'ru', 'ar'] }
  ]}
/>
```

---

## 7. Developer Experience (DX) Optimizations

### Global Search
We leverage **FlexSearch** for ultra-fast, client-side indexing. Every `.mdx` file is indexed by heading and paragraph context.

### Multi-Language Code Generation
Every endpoint description automatically generates snippets for:
- **Python**: `requests.get(...)`
- **Node.js**: `axios.get(...)`
- **cURL**: `curl -H "Authorization: Bearer ..."`

---

## 8. Setup & Local Development

1.  `npm install`
2.  `npm run dev`
3.  Navigate to `http://localhost:3002`

---

## 9. Writing Documentation (Contributor's Guide)

To maintain our premium standard, all new docs must:
- Use **Playfair Display** for headers.
- Include at least one **InteractiveExample**.
- Follow the **Mumin Style Guide** for tone (Professional, Respectful, Scholarly).

---

## 10. SEO & Performance Engineering

- **Web Vitals**: We aim for 100/100/100/100 on Lighthouse.
- **Sitemap**: Auto-generated via `nextra-sitemap`.
- **OpenGraph**: Custom OG images for every section.

---

## 11. Deployment & CI/CD

Hosted on Vercel with **Edge Middleware** to handle redirects and language localization.

---

## 12. Security & API Safety

The playground is architected to be "Client-Only". Sensitive keys provided by researchers are never stored or logged by the documentation server.

---

## 13. Future Roadmap

- [ ] Automated SDK generation from OpenAPI.
- [ ] Multilingual docs (Arabic, Russian, Bahasa).
- [ ] User-contributed snippet gallery.

---

## 14. Troubleshooting

**"Playground returns 403"**: Ensure you have whitelisted your local development domain in the API Settings or use a valid Production key.

---

## 15. Final Word

Documentation is an act of service. By making knowledge accessible, we fulfill a shared duty.

---

🕌 Mumin Documentation Team
[docs.mumin.ink](https://docs.mumin.ink)
