import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(req: Request) {
    const { html } = await req.json()

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setContent(`
    <html>
      <head>
        <style>
          body {
            margin: 1in;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `)

    const pdf = await page.pdf({
        format: 'A4',
        margin: {
            top: '1in',
            bottom: '1in',
            left: '1in',
            right: '1in',
        },
    })

    await browser.close()

    return new NextResponse(Buffer.from(pdf), {
        headers: { 'Content-Type': 'application/pdf' },
    })
}
