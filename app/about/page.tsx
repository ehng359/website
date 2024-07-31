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
          <div className="text-7xl font-bold">
            About me
          </div>
          <Tag description={"Info"} color="technical" />
        </div>
        <div className="h-[1px] w-full bg-dark" />
      </div>
      <section className="text-2xl text-opacity-50 flex flex-col mt-1000 mb-1 gap-y-8 py-4 w-[70%]">
        <div className="text-4xl font-bold">
          Hello world!
        </div>
        <div>I am a 4th year <span className="font-bold">Computer Science major at UCLA</span> (Go Bruins!), currently building at <span className="font-bold">@Northrop Grumman.</span></div>
        <div>
          I love building the heart of passion among students at various clubs to create amazing software products as
          <a> Co-President of ACM Design</a> and <a>an LA Blueprint Project Developer Lead.</a> <a className="font-bold">Read more here (coming soon!)</a>.
        </div>
        <div>
          Currently, I am OBSESSED with these hobbies: Taekwondo, Badminton, Rock Climbing, TFT, guitar, and building projects.
        </div>
        <div className="text-4xl font-bold">
          From the beginning...
        </div>
        <div>
          I was born in Jakarta, Indonesia but grew up all my life in Baldwin Park, California, right in the heart of the 626-Area (San-Gabriel Valley). Having grown up
          from an immigrant family, I genuinely learned what it means to work hard to achieve dreams and not let the opportunity slip by. I fell deep in love with learning at
          a young age, whether it relates to physical activities like swimming or traditional arts like oil painting, and I believe myself to be among the luckiest in the world to have such opportunities to do so. Recently,
          I have even picked up the guitar to expand into the musical domain! In addition to being an avid learner, I love teaching individuals, especially in understanding that
          I have been in their shoes many times before and many times after, as a self-professed forever-learner.
        </div>
        <div>
          Today, I typically dive deep into Computer Science, building anything that interests me using any tools at my disposal. I felt drawn to the idea of designing and
          constructing powerful utilities, projects, websites, and literal work of arts with JUST lines of code, mere pieces of logic strewn together dictating movement of information.
          If a picture is worth a thousand words, then I dare-say that is pretty small... only 2 Kb? Thus, any code-base is thereby easily worth several thousand pictures, a true masterpiece of logic,
          built on years of intelligent minds innovating, innovating and reinnovating. Computer Science, to me, is the pure, unadulterated science of solving problems, in perfect cohesion with the
          hardware it interfaces to do so.
        </div>
        <div className="text-4xl font-bold">
          To UCLA.. and beyond!
        </div>
        <div>
          The past 3 years at UCLA has been an absolute blessing, for all the life experiences, the emotional highs and lows, and the opportunity to meet some of my best friends
          and learning along-side them. Moving into my 4th year, I have pure optimism for what is to come; cheers to you and to the future.
        </div>
        <div className="text-4xl font-bold">
          The After-Credits
        </div>
        <div>
          <span className="font-bold">Question: </span>So, Edward, you might ask, what is the purpose of this website?
        </div>
        <div>
          <span className="font-bold"> Answer: </span>I just want to share my journey navigating the ever-elusive depths in the exploration of life, in the highs and lows,
          in worlds both technical and not. A journey, detailing a faint blip in the expanse of the universe. And, I just want to share some of my passions with everyone,
          technical or otherwise!
        </div>
      </section>
    </main >
  );
}
