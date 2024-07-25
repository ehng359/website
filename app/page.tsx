"use client";
import NavBar from "./components/NavBar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Gallery, GalleryProps } from "./components/gallery/Gallery";
import GalleryCard from "./components/gallery/GalleryCard";
import { motion, animate } from "framer-motion";

import projectsData from '../app/data/projects.json'

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

  const variants = {
    hover: {
      y: [0, 10, 5, 0, 5 - 10, 0],
      transition: {
        repeat: Infinity,
        duration: 10,
      }
    }
  }

  return (
    <main id="main" className="flex flex-col items-center justify-center mx-32">
      <div id="main-first" className="h-screen flex flex-row space-between items-center justify-around duration-500 transition-all ease-in">
        <Image src="/website/profile.jpeg" height={300} width={300} className="rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] shadow-black" alt="Profile picture for Edward Ng"></Image>
        <motion.div
          animate="hover"
          variants={variants}
          className="flex flex-col gap-y-8 m-20 border-4 border-main p-16 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] shadow-black rounded-2xl">
          <div className="text-6xl font-bold">
            Hello 👋, my name is Edward Ng
          </div>
          <div className="text-2xl font-medium relative w-[max-content]
            before:absolute before:inset-0 before:animate-typewriter before:bg-white 
            after:absolute after:inset-0 after:w-[0.15em] after:animate-caret after:bg-black"
          >
            Welcome to my website. I am a 4th-year student <a href="https://www.ucla.edu" target="_blank" className="hover:underline hover:underline-offset-6">@UCLA</a>.<br />
          </div>
          <input placeholder="What's new with Edward Ng? (blog)" className="text-2xl w-auto h-2 border-4 border-spacing-4 p-6 border-main rounded-2xl">
          </input>
        </motion.div>
      </div>
      <div className="relative -mx-32 -mt-16 h-16 w-2/3 bg-accent rounded-3xl">
      </div>
      <div className="h-screen bg-grey m-8">
        <div className="text-2xl p-4">
          Here are some cool things that I have done.
        </div>
        <Gallery data={projectsData} />
      </div>
      <div className="h-screen bg-grey">
        content covering
      </div>
    </main >
  );
}
