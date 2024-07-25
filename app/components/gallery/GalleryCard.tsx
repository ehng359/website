import React, { SyntheticEvent, MouseEvent } from "react"

interface GalleryCard {
    index: number,
    title: String,
    image: String,
    setSelected: (idx: number) => void,
    selected: number,
}

export default function GalleryCard({ index, title, image, setSelected, selected }: GalleryCard) {

    function handleMouseMove(e: SyntheticEvent) {
        const maxDegrees = 45;
        const { clientX, clientY } = e as MouseEvent;
        let target = e.target as HTMLElement;
        const { x, y, width, height } = target.getBoundingClientRect();
        const xPtg = 2 * (clientX - x) / width - 1
        const yPtg = 2 * (clientY - y) / height - 1

        target.style.setProperty("--tw-skew-x", String(Math.round(xPtg * 0.25 * maxDegrees)) + "deg")
        target.style.setProperty("--tw-skew-y", String(Math.round(yPtg * 0.25 * maxDegrees)) + "deg")
        target.style.setProperty("--tw-ring-offset-shadow", `${xPtg * 20}px ${yPtg * 20}px`)
    }

    function handleMouseLeave(e: SyntheticEvent) {
        const target = e.target as HTMLElement;
        target.style.setProperty("--tw-skew-x", "0deg")
        target.style.setProperty("--tw-skew-y", "0deg")
        target.style.setProperty("--tw-ring-offset-shadow", `0px 0px`)
    }

    async function handleMouseClick(e: SyntheticEvent) {
        const target = e.target as HTMLElement;
        const { x, y, width, height } = target.getBoundingClientRect();
        target.classList.remove(".duration-75");
        target.classList.add("duration-1000")
        setSelected(index);
    }

    async function resetPosition(e: SyntheticEvent) {
        e.stopPropagation();
        setSelected(-1);
    }

    return (
        <div
            id={`${title}_main`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick}
            className={`flex flex-col justify-between z-${selected < 0 || selected === index ? 20 : 10} w-[15em] h-[21em] bg-main text-white rounded-lg p-4 shadow-[0_10px_1em_0_rgba(0,0,0,0.3)] hover:-top-2 hover:transform transform ${index === selected ? "absolute top-4 scale-125 left-[10%] translate-x-[400%] duration-[1s]" : "relative duration-150"} transition-all`}
        >
            <div className="flex flex-row justify-between">
                <div className="relative text-2xl z-0">
                    {title}
                </div>
                <button onClick={resetPosition} className={`${index !== selected ? "hidden" : ""}`}>
                    X
                </button>
            </div>
            <a href="/website/projects" className="text-main text-lg rounded-lg bg-white w-auto p-1.5">
                Read more
            </a>
        </div >
    )
}