'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
    const [{ fg, bg, textSize, position }, setBg] = useState({ fg: "text-white", bg: "bg-main", textSize: "text-lg", position: "mt-1" });
    const [scroll, setScroll] = useState(0);
    // Run on the initial render only
    useEffect(() => {
        document.getElementById('navbar')?.addEventListener('mouseover', () => {
            setBg({ fg: "text-white", bg: "bg-main", textSize: "text-lg", position: "" })
        })

        document.getElementById('navbar')?.addEventListener('mouseout', () => {
            setBg({ fg: "text-black", bg: "bg-white", textSize: "text-sm", position: "-mt-5" })
        })
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', (event) => {
            console.log(scroll, window.scrollY)
            if (scroll < window.scrollY - 500) {
                setBg({ fg: "text-black", bg: "bg-white", textSize: "text-sm", position: "-mt-5" });
            } else if (scroll > window.scrollY + 500) {
                setBg({ fg: "text-white", bg: "bg-main", textSize: "text-lg", position: "" });
            }
            setScroll(window.scrollY);
        })
    }, [scroll])


    console.log(bg);

    return (
        <main id="navbar" className={`w-1/2 h-12 ${bg} text-black px-16 flex justify-center items-center rounded-full fixed left-1/4 top-4 transition-all duration-500 delay-100`}>
            <div className={`flex flex-row justify-around items-center gap-x-4 w-full`}>
                <Link href="/projects" className={`hover:underline ${fg} ${textSize} ${position} transition-all delay-100 duration-500`}>Projects</Link>
                <Link href="/about" className={`hover:underline ${fg} ${textSize} ${position} transition-all delay-200 duration-500`}>About Me</Link>
                <Link href="https://github.com/ehng359" target="_blank" className={`hover:underline ${fg} ${textSize} ${position} transition-all delay-300 duration-500`}>Github</Link>
            </div>
        </main>
    );
}