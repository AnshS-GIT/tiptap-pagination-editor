# Tiptap Document Editor with Pagination

## Overview
This project is a Tiptap-based document editor designed to simulate real-world legal document drafting.  
It provides **visual pagination**, allowing users to clearly see page boundaries while typing, similar to Google Docs or Microsoft Word.

The editor is optimized for **print accuracy**, ensuring exported documents match what users see during editing.

---

## Features

### Core Functionality
- Rich text editor built with **Tiptap**
- A4 page size with **1-inch margins**
- Real-time visual page breaks
- Live page count
- Stable cursor and smooth editing experience

### Supported Formatting
- Paragraphs
- Headings
- Bold / Italic text
- Bullet and ordered lists

### Export
- **PDF Export** using Node.js + Puppeteer
- **DOCX Export** using Node.js + `docx` library
- Exported documents match editor layout (page size, margins, typography)

---

## Pagination Approach

True pagination during typing is challenging in rich text editors due to cursor and DOM constraints.

This project uses:
- A **single continuous editor instance** for stability
- DOM height measurement (`scrollHeight`) to calculate page count
- CSS background rendering to show page boundaries
- CSS masking to hide content between pages

This mirrors how many production editors balance editing stability with print accuracy.

---

## Export Strategy

### PDF Export
- Editor HTML is sent to a Node.js backend
- Puppeteer generates a PDF using A4 size and 1-inch margins
- Ensures submission-ready formatting (e.g. USCIS documents)

### DOCX Export
- Editor content is converted into Word paragraphs
- Page size and margins are applied to match the editor
- Rich formatting can be extended by mapping Tiptap nodes to Word styles

---

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
