import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import GalleryCard from "./GalleryCard"


export interface GalleryProps {
    data: {
        title: String,
        description: String[],
        image: String,
        tags: String[],
    }[]
}

export function Gallery({ data }: GalleryProps) {
    const [content, setContent] = useState<{
        title: String,
        description: String[],
        image: String,
        tags: String[],
    }[]>([]);
    const [index, setIndex] = useState<number>(-1)

    useEffect(() => {
        setContent(data);
    }, [data])

    function setSelected(idx: number) {
        setIndex(idx);
    }

    return (
        <div>
            <div className="relative h-[1em] bg-black w-screen bg-gradient-to-t from-slate-900 to-slate-50 opacity-50">
            </div>
            <div className="relative flex flex-row justify-around items-center">
                <div className="absolute z-20 bg-black w-screen h-full opacity-75" onClick={() => { setIndex(-1) }}>
                </div>
                <div className="flex flex-row gap-x-8 bg-transparent pt-4 pb-4">
                    {
                        content.map(
                            ({ title, image }, idx) =>
                                <GalleryCard key={idx} index={idx} title={title} image={image} selected={index} setSelected={setSelected}></GalleryCard>
                        )
                    }
                </div>
            </div>
            <div className="relative h-[8em] bg-black w-screen bg-gradient-to-b from-slate-900 to-slate-50 opacity-50">
            </div>
        </div>
    )
}