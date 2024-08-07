import React from "react";
import Article from "@/app/components/Article";
import filesystem from '../../data/filesystem.json'
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

export default function Page(params: any) {
    const title = "";
    const paragraphs = [""]
    const fileName = ""
    const date = ""
    return (
        <Article title={title} paragraphs={paragraphs} fileName={fileName} date={""}>
        </Article>
    )
}