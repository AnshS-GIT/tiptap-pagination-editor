'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'

const PAGE_HEIGHT = 1122
const PAGE_WIDTH = 794
const PAGE_PADDING = 96
const PAGE_GAP = 24

const USABLE_PAGE_HEIGHT = PAGE_HEIGHT - PAGE_PADDING * 2

export default function Editor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Start typing...</p>',
        immediatelyRender: false,
    })

    const wrapperRef = useRef<HTMLDivElement>(null)
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        if (!editor) return

        const updatePages = () => {
            const wrapper = wrapperRef.current
            if (!wrapper) return

            const pm = wrapper.querySelector('.ProseMirror')
            if (!(pm instanceof HTMLElement)) return

            const height = pm.scrollHeight
            setPageCount(Math.max(1, Math.ceil(height / USABLE_PAGE_HEIGHT)))
        }

        updatePages()
        editor.on('update', updatePages)

        return () => {
            editor.off('update', updatePages)
        }
    }, [editor])

    if (!editor) return null

    const exportPDF = async () => {
        const html = editor.getHTML()

        const res = await fetch('/api/export/pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html }),
        })

        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        window.open(url)
    }

    const exportDOCX = async () => {
        const html = editor.getHTML()

        const res = await fetch('/api/export/docx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html }),
        })

        const blob = await res.blob()
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = 'document.docx'
        a.click()
    }

    const totalHeight =
        pageCount * PAGE_HEIGHT + (pageCount - 1) * PAGE_GAP

    const createPageBackground = () => `
    repeating-linear-gradient(
      to bottom,
      white 0px,
      white ${PAGE_HEIGHT}px,
      transparent ${PAGE_HEIGHT}px,
      transparent ${PAGE_HEIGHT + PAGE_GAP}px
    )
  `

    const createContentMask = () => `
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 ${USABLE_PAGE_HEIGHT}px,
      transparent ${USABLE_PAGE_HEIGHT}px,
      transparent ${USABLE_PAGE_HEIGHT + PAGE_PADDING * 2 + PAGE_GAP}px
    )
  `

    return (
        <div className="bg-gray-100 min-h-screen py-8 flex flex-col items-center">

            <div className="mb-4 flex gap-3">
                <button
                    onClick={exportPDF}
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded shadow"
                >
                    Export PDF
                </button>

                <button
                    onClick={exportDOCX}
                    className="bg-green-600 text-white text-sm px-4 py-2 rounded shadow"
                >
                    Export DOCX
                </button>
            </div>

            <div
                className="relative"
                style={{
                    width: PAGE_WIDTH,
                    minHeight: totalHeight,
                    padding: PAGE_PADDING,
                    backgroundImage: createPageBackground(),
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                    border: '1px solid #e5e7eb',
                }}
            >
                <div
                    ref={wrapperRef}
                    style={{
                        position: 'relative',
                        maskImage: createContentMask(),
                        WebkitMaskImage: createContentMask(),
                    }}
                >
                    <EditorContent editor={editor} />
                </div>
            </div>

            <div className="fixed bottom-4 right-4 bg-white px-3 py-1 text-sm text-black border border-gray-200 shadow">
                Pages: {pageCount}
            </div>
        </div>
    )

}
