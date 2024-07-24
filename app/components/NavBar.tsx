'use client'
import React, { useState, useEffect, ReactSVG, useRef, MutableRefObject } from "react";
import Link from "next/link";
import Image from "next/image"
import NotifCard from "./NotifCard";

export default function NavBar() {
    const [{ fg, bg, textSize, h }, setBg] = useState({ fg: "text-white", bg: "bg-main", textSize: "text-lg", h: "h-10" });
    const [scroll, setScroll] = useState(0);
    const [showNotifs, setShowNotifs] = useState(false);

    // Run on the initial render only
    useEffect(() => {
        document.getElementById('navbar')?.addEventListener('mouseover', () => {
            setBg({ fg: "text-white", bg: "bg-main", textSize: "text-lg", h: "h-10" })
        })

        document.getElementById('navbar')?.addEventListener('mouseout', () => {
            setBg({ fg: "text-black", bg: "bg-white", textSize: "text-sm", h: "h-6" })
        })
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', (event) => {
            console.log(scroll, window.scrollY)
            if (scroll < window.scrollY - 500) {
                setBg({ fg: "text-black", bg: "bg-white", textSize: "text-sm", h: "h-6" });
            } else if (scroll > window.scrollY + 500) {
                setBg({ fg: "text-white", bg: "bg-main", textSize: "text-lg", h: "h-10" });
            }
            setScroll(window.scrollY);
        })
    }, [scroll])

    return (
        <main id="navbar" className={`z-50 w-1/2 ${h} ${bg} text-black px-16 flex justify-center items-center rounded-full fixed left-1/4 top-4 transition-all duration-500 delay-100 bg-opacity-90`}>
            <div className={`flex flex-row justify-around items-center gap-x-4 w-full`}>
                <Link href="/projects" className={`hover:underline ${fg} ${textSize} transition-all delay-100 duration-500`}>Projects</Link>
                <Link href="/about" className={`hover:underline ${fg} ${textSize} transition-all delay-200 duration-500`}>About Me</Link>
                <Link href="https://github.com/ehng359" target="_blank" className={`hover:underline ${fg} ${textSize} transition-all delay-300 duration-500`}>Github</Link>
            </div>
            <div className="relative left-1/4 flex flex-col items-center">
                <Image src="/website/notification.svg" height={28} width={28} alt="notification icon" onMouseOver={() => { setShowNotifs(true); }} />
                {
                    showNotifs ?
                        <div className="absolute mt-12 p-4 w-96 rounded-lg bg-accent" onMouseLeave={() => { setShowNotifs(false); }}>
                            <NotifCard content={`07/23/24 - Initial rundown at creating projects showcase.`} />
                            <NotifCard content={`07/22/24 - Initial rundown at creating notification bar.`} />
                        </div>
                        :
                        <></>
                }
            </div>
        </main>
    );
}