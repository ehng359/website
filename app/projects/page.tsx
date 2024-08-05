"use client"
import React, { useState } from "react";
import Terminal from "../components/terminal/Terminal";
import Image from "next/image";

import fileSystem from '../data/filesystem.json'

export default function Projects() {
  const [isTerminalOpen, setTerminalState] = useState(true);

  function toggleTerminal() {
    setTerminalState(!isTerminalOpen);
  }

  return (
    <main className="relative mt-[10%] z-40 h-screen w-screen overflow-y-hidden overflow-x-hidden bg-[url('/website/background.png')] bg-[20%] rounded-tl-lg rounded-tr-lg">
      {
        isTerminalOpen ?
          (
            <Terminal closeTerminal={toggleTerminal} />
          ) :
          (
            /*
              This is the docking station component
            */
            <div className="absolute flex justify-center items-center bottom-[5%] left-[50%] p-4 bg-gray-200 bg-opacity-[50%] w-auto h-[8vh] rounded-lg">
              <Image src="/website/TerminalMascot.png" height={80} width={80} alt="Profile picture for Edward Ng" onClick={toggleTerminal} />
            </div>
          )

      }
    </main>
  );
}
