import React from "react"
import Tag from "./gallery/Tag"
interface ArticleProps {
    title: String,
    section_titles: String[],
    paragraphs: String[][],
    fileName: String,
    date: String,
    tags: String[]
}
export default function Article({ title, section_titles, paragraphs, fileName, date, tags }: ArticleProps) {
    return (
        <main className="mx-[8%] mt-[10%]">
            <div className="flex flex-col gap-y-[0.25vh]">
                <div>
                    dev/{fileName} - {date}
                </div>
                <div className="text-7xl font-bold">
                    {title}
                </div>
                <div className="mb-[1%] flex flex-row gap-x-[1%] items-center">
                    <p>
                        Related tags
                    </p>
                    {
                        /* Remember to add the custom exterior styling prop*/
                        tags.map((tag, idx) => {
                            return (
                                <Tag key={idx} description={tag} color="technical" />
                            )
                        })
                    }
                </div>
                <div className="h-[1px] w-full bg-dark" />
            </div>
            <section className="text-2xl text-opacity-50 flex flex-col mt-1000 mb-1 gap-y-8 py-4 w-[70%]">
                {
                    section_titles.map((title, idx) => {
                        return (
                            <div key={idx} className="flex flex-col gap-y-8">
                                <div className="text-4xl font-bold">
                                    {title}
                                </div>
                                {
                                    paragraphs[idx].map((paragraph) => {
                                        return (
                                            <div key={idx}>
                                                {paragraph}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </section>
        </main>
    )
}