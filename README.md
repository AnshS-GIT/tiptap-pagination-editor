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

> Note: PDF and DOCX export are implemented via a backend service and are intended to run in environments that support document generation tooling.

---

## Pagination Approach

True pagination during live editing is challenging in rich text editors due to cursor and DOM constraints.

This project uses:
- A **single continuous Tiptap editor instance** to preserve cursor stability
- DOM height measurement (`scrollHeight`) to calculate page count
- Per-page content clipping to visually enforce page boundaries

This approach mirrors how production-grade editors balance **editing stability** with **print-oriented layout fidelity**.

---

## Trade-offs and Limitations

- True page breaks are not enforced at the editor model level. Pagination is simulated visually to avoid cursor instability during typing.
- Page boundaries are calculated using DOM height measurement, which can vary slightly across browsers or font rendering environments.
- Headers, footers, and tables are not included in the core implementation and are treated as optional enhancements.
- PDF and DOCX export rely on a Node.js backend with headless browser support and are not intended to run directly in constrained serverless environments.

These trade-offs were chosen intentionally to prioritize a smooth editing experience and realistic production constraints over forcing strict page segmentation during live editing.

---

## Improvements With More Time

With additional time, the following enhancements could be explored:

- Configurable header and footer support
- Table-aware pagination to prevent row splitting across pages
- More precise layout measurement using font metrics instead of DOM height
- Document templates for different legal use cases
- Richer DOCX export with deeper style mapping

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
