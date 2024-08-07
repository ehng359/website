import React from "react"
interface ArticleProps {
    title: String,
    paragraphs: String[],
    fileName: String,
    date: String,
}
export default function Article({ title, paragraphs, fileName }: ArticleProps) {
    return (
        <main>
            Testing default article setup.
        </main>
    )
}