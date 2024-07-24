import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import GalleryCard from "./GalleryCard"


export interface GalleryProps {
    data: {
        title: String,
        description: String,
        image: String
    }[]
}

export function Gallery({ data }: GalleryProps) {
    const [content, setContent] = useState<{
        title: String,
        description: String,
        image: String
    }[]>([]);
    const [index, setIndex] = useState<Number>(0)

    useEffect(() => {
        setContent(data);
    }, [data])

    return (
        <div className="flex flex-row justify-around">
            <div className="flex flex-row gap-x-8">
                {
                    content.map(
                        ({ title, image }, idx) =>
                            <GalleryCard key={idx} title={title} image={image}></GalleryCard>
                    )
                }
            </div>
        </div>
    )
}