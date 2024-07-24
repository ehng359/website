import React, { Dispatch, SetStateAction, useEffect, useState, SyntheticEvent, MouseEvent } from "react"

interface GalleryCard {
    title: String,
    image: String,
}

export default function GalleryCard({ title, image }: GalleryCard) {
    function handleMouseMove(e: SyntheticEvent) {
        const maxDegrees = 45;
        const { clientX, clientY } = e as MouseEvent;
        let target = e.target as HTMLElement;
        const { x, y, width, height } = target.getBoundingClientRect();
        const xPtg = 2 * (clientX - x) / width - 1
        console.log(String(Math.round(xPtg * maxDegrees)))

        const yPtg = 2 * (clientY - y) / height - 1
        console.log(String(Math.round(yPtg * maxDegrees)))

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

    return (
        <div id={`${title}_main`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`relative z-10 w-[15em] h-[21em] bg-main text-white rounded-lg p-4 shadow-[0_10px_1em_0_rgba(0,0,0,0.3)] top-0 hover:-top-2 hover:transform transition-all`}>
            <div className="relative text-2xl z-0">
                {title}
            </div>
        </div>
    )
}