import React from "react";
import Article from "@/app/components/Article";
import filesystem from '../../data/filesystem.json'
import content from '../../data/projectArticles.json'

const articles: { [name: string]: { title: String, section_titles: String[], paragraphs: String[][], tags: String[], date: String } } = content;

// // // Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const FS: { [key: string]: { [key: string]: { [key: string]: string } } } = filesystem;
    return await Object.keys(FS).flatMap((year) => {
        return Object.keys(FS[year]).flatMap((season) => {
            return Object.keys(FS[year][season]).map((name) => {
                return { "slug": name.toLowerCase() };
            });
        })
    })
}

export default function Page(query: { [key: string]: { [key: string]: string } }) {
    // const
    const article = articles[query.params["slug"]];
    return (
        <Article
            tags={article["tags"]}
            title={article["title"]}
            section_titles={article["section_titles"]}
            paragraphs={article["paragraphs"]}
            fileName={query.params["slug"] + ".txt"}
            date={article["date"]}>
        </Article>
    )
}