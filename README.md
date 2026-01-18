# Tiptap Document Editor with Pagination

## Overview
This project is a **Tiptap-based document editor** designed to simulate real-world **legal document drafting workflows**.

It provides **visual pagination**, allowing users to clearly see page boundaries while typing, similar to Google Docs or Microsoft Word.

The editor prioritizes **editing stability and layout accuracy**, with an export pipeline designed to produce print-ready documents.

---

## Features

### Core Functionality
- Rich text editor built with **Tiptap**
- A4 page size with **1-inch margins**
- Real-time visual page boundaries
- Live page count
- Stable cursor and smooth editing experience
- Content reflows correctly when editing mid-document

---

### Supported Formatting
- Paragraphs
- Headings
- Bold / Italic text
- Bullet and ordered lists

---

### Pagination Behavior
- Pages are rendered visually as fixed-size A4 sheets
- Content flows naturally across pages
- Long paragraphs span pages correctly
- Page count updates dynamically as content changes

---

### Export
- **PDF Export** using Node.js + Puppeteer
- **DOCX Export** using Node.js + `docx` library
- Export pipeline applies the same page size and margins as the editor

> Note: PDF/DOCX export is implemented via a backend service and is designed to run in environments that support document generation tooling.

---

## Pagination Approach

True pagination during live editing is challenging in rich text editors due to cursor and DOM constraints.

This project uses:
- A **single continuous Tiptap editor instance** to preserve cursor stability
- DOM height measurement (`scrollHeight`) to calculate page count
- Per-page content clipping to visually enforce page boundaries

This approach mirrors how production-grade editors balance **editing stability** with **print-oriented layout fidelity**.

---

## Export Strategy

### PDF Export
- Editor HTML is sent to a Node.js backend
- Puppeteer generates a PDF using A4 size and 1-inch margins
- Ensures print-ready formatting suitable for legal documents

### DOCX Export
- Editor content is converted into Word paragraphs
- Page size and margins are applied to match the editor layout
- Formatting can be extended by mapping editor nodes to Word styles

---
-> Note: PDF and DOCX export are implemented using a Node.js backend and are intended to run in environments that support headless browsers. The deployed editor focuses on pagination and layout accuracy.

## Optional Enhancements (Future Work)
- Page numbers
- Header and footer support
- Tables with improved pagination handling

---

## Tech Stack
- **Next.js (App Router)**
- **React**
- **Tiptap**
- **Tailwind CSS**
- **Node.js**
- **Puppeteer**
- **docx**

---

## Running Locally

```bash
npm install
npm run dev
