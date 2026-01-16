import { NextResponse } from 'next/server'
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
} from 'docx'

export async function POST(req: Request) {
    const { html } = await req.json()

    /**
     * VERY SIMPLE HTML → DOCX conversion
     * (enough for assignment scope)
     */
    const paragraphs = html
        .replace(/<\/p>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .split('\n')
        .filter(Boolean)
        .map(
            (text: string) =>
                new Paragraph({
                    children: [
                        new TextRun({
                            text,
                            font: 'Times New Roman',
                            size: 28, // 14pt
                        }),
                    ],
                })
        )

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            width: 12240, // A4 width in twips
                            height: 15840, // A4 height in twips
                        },
                        margin: {
                            top: 1440,
                            bottom: 1440,
                            left: 1440,
                            right: 1440,
                        },
                    },
                },
                children: paragraphs,
            },
        ],
    })

    const buffer = await Packer.toBuffer(doc)

    return new NextResponse(buffer as any, {
        headers: {
            'Content-Type':
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': 'attachment; filename=document.docx',
        },
    })
}
