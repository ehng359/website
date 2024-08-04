"use client"
import React, { useState } from "react";
import Terminal from "../components/terminal/Terminal";
export default function Projects() {
  const [isTerminalOpen, setTerminalState] = useState(true);

  function toggleTerminal() {
    setTerminalState(!isTerminalOpen);
  }

  return (
    <main className="relative mt-[10%] z-50 h-screen w-screen overflow-y-hidden overflow-x-hidden bg-[url('/website/background.png')] bg-[20%] rounded-tl-lg rounded-tr-lg">
      {
        isTerminalOpen ?
          (
            <Terminal closeTerminal={toggleTerminal} />
          ) :
          (
            <></>
          )
      }
    </main>
  );
}
