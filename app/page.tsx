"use client";
import NavBar from "./components/NavBar";
import Image from "next/image";
import React, { useState, useEffect } from "react";


export default function Home() {
  useEffect(() => {
    let options = {
      root: document.getElementById("main"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    let target = document.getElementById("main-first");
    let observer = new IntersectionObserver(() => {
    }, options);

    if (target !== null) {
      observer.observe(target);
    }
  });

  return (
    <main id="main" className="flex flex-col">
      <div id="main-first" className="h-screen flex flex-row space-between items-center justify-around duration-500 transition-all ease-in">
        <Image src="/website/profile.jpeg" height={300} width={300} className="rounded-lg" alt="Profile picture for Edward Ng"></Image>
        <div className="flex flex-col gap-y-2 m-20">
          <div className="text-7xl font-bold">
            Hello 👋, my name is Edward Ng
          </div>
          <div className="text-2xl font-medium relative w-[max-content]
            before:absolute before:inset-0 before:animate-typewriter before:bg-white 
            after:absolute after:inset-0 after:w-[0.15em] after:animate-caret after:bg-black"
          >
            Welcome to my website. I am a 4th-year student <a href="https://www.ucla.edu" target="_blank" className="hover:underline hover:underline-offset-6">@UCLA</a>.<br />
          </div>
        </div>
      </div>
      <div className="relative -mx-32 -mt-16 h-16 w-screen bg-accent">
        Insert banner here
      </div>
      <div className="h-screen bg-grey">
        content covering
      </div>
      <div className="h-screen bg-grey">
        content covering
      </div>
    </main>
  );
}
