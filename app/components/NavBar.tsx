'use client'
import React, { useState, useEffect, ReactSVG, useRef, MutableRefObject } from "react";
import Link from "next/link";
import Image from "next/image"
import NotifCard from "./NotifCard";
import { usePathname, useRouter } from 'next/navigation'

export default function NavBar() {
    const [{ fg, bg, textSize, h }, setBg] = useState({ fg: "text-white", bg: "bg-main", textSize: "text-lg", h: "h-10" });
    const [scroll, setScroll] = useState(0);
    const [showNotifs, setShowNotifs] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

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
            if (scroll < window.scrollY - 500) {
                setBg({ fg: "text-black", bg: "bg-white", textSize: "text-sm", h: "h-8" });
            } else if (scroll > window.scrollY + 500) {
                setBg({ fg: "text-white", bg: "bg-main", textSize: "text-lg", h: "h-10" });
            }
            setScroll(window.scrollY);
        })
    }, [scroll])

    return (
        <main id="navbar" className={`backdrop-invert z-50 w-1/2 ${h} ${bg} text-black px-16 flex justify-center items-center rounded-full fixed left-1/4 top-4 transition-all duration-500 delay-100 bg-opacity-90 mt-[2.5%]`}>
            {
                pathname !== "/" ? (
                    <button onClick={() => { router.back() }} className="relative right-[25%] w-16">
                        <Image src="/website/backArrow.svg" height={28} width={28} alt="Back arrow button" />
                    </button>
                ) : (
                    <div className=" w-16"></div>
                )
            }
            <div className={`flex flex-row justify-around items-center w-full`}>
                <Link href="/projects" className={`hover:underline ${fg} ${textSize} transition-all delay-100 duration-500`}>Projects</Link>
                <Link href="/about" className={`hover:underline ${fg} ${textSize} transition-all delay-200 duration-500`}>About Me</Link>
                <Link href="https://github.com/ehng359" target="_blank" className={`hover:underline ${fg} ${textSize} transition-all delay-300 duration-500`}>Github</Link>
            </div>
            <div className="relative left-[25%] flex flex-col items-center bg-white w-16 h-8 rounded-full backdrop-invert border-b-2 border-r-2 border-dark backdrop opacity-80">
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