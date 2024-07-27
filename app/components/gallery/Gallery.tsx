import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import GalleryCard from "./GalleryCard"
import Tag from "./Tag";


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
                <div className="absolute z-20 bg-black w-screen h-full opacity-85" onClick={() => { setIndex(-1) }}>
                    {
                        index !== -1 ? (
                            <div className="bg-black z-30 ml-[5%] mt-[5%] mr-[30%] text-white text-2xl flex flex-col justify-center gap-y-2">
                                <div className="font-bold">
                                    {content[index].title}
                                </div>
                                <div>
                                    {
                                        content[index].description.map((description, idx) => {
                                            return (
                                                <div key={idx} className="text-base">
                                                    - {description}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex flex-row gap-x-[1%]">
                                    {
                                        content[index].tags.map((tag, idx) => {
                                            return (
                                                <Tag key={idx} color="technical" description={tag} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : <></>
                    }
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
            <div className="relative h-[2em] bg-black w-screen bg-gradient-to-b from-slate-900 to-slate-50 opacity-50">
            </div>
        </div>
    )
}