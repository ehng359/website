"use client"
import { motion } from "framer-motion";
import React from "react";
import Tag from "../components/gallery/Tag";
export default function About() {
  return (
    <main className="mx-[8%] mt-[10%]">
      <div>
        <div>
          dev/hello_world.txt - 2024/07/26
        </div>
        <div className="mb-[1%] flex flex-row justify-between">
          <div className="text-7xl">
            About me
          </div>
          <Tag description={"Info"} color="technical" />
        </div>
        <div className="h-[1px] w-full bg-dark" />
      </div>
      <section className="text-2xl text-opacity-50 flex flex-col mt-1000 mb-1 gap-y-2 py-4 w-[70%]">
        <div>Hello world!</div>
        <div>I am a 4th year Computer Science major at UCLA, currently building at <a>@Northrop Grumman.</a></div>
        <div>I love building the heart of passion among students at various clubs to create amazing software products as <a>Co-President of ACM Design</a> and <a>an LA Blueprint Project Developer Lead.</a></div>
        <div>Hobbies: Taekwondo, Badminton, Rock Climbing, TFT, building projects :D</div>
      </section>
    </main >
  );
}
