"use client"
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { SetStateAction, useEffect, useRef, useState, Dispatch, KeyboardEvent, DragEventHandler, DragEvent, MouseEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import fileSystem from '../../data/filesystem.json'
interface TerminalProps {
    children?: React.JSX.Element
    closeTerminal: () => void
}

const FS: { [key: string]: { [key: string]: { [key: string]: string } } } = fileSystem;

export default function Terminal({ children, closeTerminal }: TerminalProps) {
    const [command, setCommand]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
    const [logs, setLogs]: [React.JSX.Element[], Dispatch<SetStateAction<React.JSX.Element[]>>] = useState<React.JSX.Element[]>([]);
    const [suggestions, setSuggestions]: [React.JSX.Element[], Dispatch<SetStateAction<React.JSX.Element[]>>] = useState<React.JSX.Element[]>([]);
    const [workingDirectory, setWorkingDirectory]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([]);
    const [isFullScreen, setFullScreen] = useState(false);

    const [x, setX] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [y, setY] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const router = useRouter();

    const supportedCommands: { [key: string]: (args: string[]) => void } = {
        "ls": handleList,
        "cd": handleChangeDirectory,
        "cat": handleCatFile,
    }

    useEffect(() => {
        const children = document.getElementById("terminal-scroll-view")?.children;
        if (children !== undefined && children[children.length - 1] != undefined) {
            children[children.length - 1].scrollIntoView(true);
        }
    }, [logs])

    function handleList(args: string[]) {
        if (args.length > 1) {
            setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ ls {args.join(" ")}</p>, <p key={logs.length + 1}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className={`text-red-500`}>Error with usage of ls: more than one argument was provided</span></p>])
            return;
        }

        let locationDirectory = [...workingDirectory];
        let intendedLocation: string[] = [];
        if (args.length > 0) {
            intendedLocation = args[0].split("/");
            if (intendedLocation[intendedLocation.length - 1] === '') {
                intendedLocation.pop();
            }
            console.log(intendedLocation);
        }
        for (let pathMarker of intendedLocation) {
            if (pathMarker === ".") {
                continue;
            } else if (pathMarker === "..") {
                locationDirectory.pop();
                continue;
            }
            locationDirectory.push(pathMarker);
        }

        let directory: any = FS;
        for (let pathMarker of locationDirectory) {
            if (!(pathMarker in directory)) {
                setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ ls {args.join(" ")}</p>, <p key={logs.length + 1}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className={`text-red-500`}>Error with usage of ls: token {`${pathMarker}`} not found in file system.</span></p>])
                return;
            }
            directory = directory[pathMarker];
        }
        setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ ls {args.join(" ")}</p>, <p key={logs.length + 1} className='flex flex-row gap-x-[5%]'>{Object.getOwnPropertyNames(directory).map((entry, idx) => <p key={idx}>{entry}</p>)}</p>])
    }

    function handleChangeDirectory(args: string[]) {
        if (args.length > 1) {
            setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ cd {args.join(" ")}</p>, <p key={logs.length + 1}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className={`text-red-500`}>Error with usage of cd: more than one argument was provided</span></p>])
            return;
        }

        if (args.length == 0) {
            setWorkingDirectory([]);
            return;
        }

        let locationDirectory = [...workingDirectory];
        let intendedLocation: string[] = [];

        intendedLocation = args[0].split("/");
        if (intendedLocation[intendedLocation.length - 1] === '') {
            intendedLocation.pop();
        }

        // Updating to reach the appropriate directory location.
        for (let entry of intendedLocation) {
            if (entry == ".") {
                continue;
            } else if (entry == "..") {
                locationDirectory.pop();
            } else {
                locationDirectory.push(entry);
            }
        }

        let directory: any = FS;
        for (let entry of locationDirectory) {
            // To change if this doesn't generalize across articles.
            if (!(entry in directory) || directory[entry] === '') {
                setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ cd {args.join(" ")}</p>, <p key={logs.length + 1}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className={`text-red-500`}>Error with usage of cd: token `{entry}` is not a directory.</span></p>])
                return;
            }
            directory = directory[entry];
        }

        setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ cd {args.join(" ")}</p>])
        setWorkingDirectory(locationDirectory);
    }

    function handleCatFile(args: string[]) {
        if (args.length > 1 || args.length == 0) {
            setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ cat {args.join(" ")}</p>, <p key={logs.length + 1}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className={`text-red-500`}>Error with usage of cat: more than 0 or more than one argument was provided</span></p>])
            return;
        }

        let locationDirectory = [...workingDirectory];
        let intendedLocation: string[] = [];

        // Splitting the file path based on the "/" marker (each segment)
        intendedLocation = args[0].split("/");
        if (intendedLocation[intendedLocation.length - 1] === '') {
            intendedLocation.pop();
        }

        // Updating to reach the appropriate directory location.
        for (let entry of intendedLocation) {
            if (entry == ".") {
                continue;
            } else if (entry == "..") {
                locationDirectory.pop();
            } else {
                locationDirectory.push(entry);
            }
        }

        let directory: any = FS;
        let lastSeen: any;
        for (let entry of locationDirectory) {
            // To change if this doesn't generalize across articles.
            if (!(entry in directory)) {
                setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ cd {args.join(" ")}</p>, <p key={logs.length + 1}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className={`text-red-500`}>Error with usage of cat: token `{entry}` is not a directory/file.</span></p>])
                return;
            }

            lastSeen = (typeof directory[entry])
            directory = directory[entry];
        }

        if (lastSeen === 'object') {
            setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ cat {args.join(" ")}</p>, <p key={logs.length + 1}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className={`text-red-500`}>Error with usage of cat: entry is not a file.</span></p>])
            return;
        }
        router.push(`projects/${(intendedLocation[intendedLocation.length - 1]).toLowerCase()}`);
    }

    function handleKeyPress(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            processFunction();
            setCommand("");
            setSuggestions([]);

            const target = e.target as HTMLTextAreaElement
            target.value = "";
            return;
        } else if (e.key === "Tab") {
            e.preventDefault();
            let delimitedCommand = command.split(" ");
            let suggestionsBuffer = []

            if (delimitedCommand.length <= 1) {
                let match = RegExp(`^${delimitedCommand[delimitedCommand.length - 1]}`);
                for (let commandName of Object.getOwnPropertyNames(supportedCommands)) {
                    if (match.test(commandName)) {
                        suggestionsBuffer.push(<p key={commandName}>{commandName}</p>)
                    }
                }
            } else {
                const args = delimitedCommand.slice(-1);

                let locationDirectory = [...workingDirectory];
                let intendedLocation: string[] = args[0].split("/");

                for (let pathMarker of intendedLocation.slice(0, -1)) {
                    if (pathMarker === ".") {
                        continue;
                    } else if (pathMarker === "..") {
                        locationDirectory.pop();
                        continue;
                    }
                    locationDirectory.push(pathMarker);
                }

                let directory: any = FS;
                for (let pathMarker of locationDirectory) {
                    if (!(pathMarker in directory)) {
                        setSuggestions([]);
                        return;
                    }
                    directory = directory[pathMarker];
                }
                let match = RegExp(intendedLocation[intendedLocation.length - 1]);
                let lastEntry = "";
                for (let entry of Object.getOwnPropertyNames(directory)) {
                    if (match.test(entry)) {
                        lastEntry = entry;
                        suggestionsBuffer.push(<p key={entry}>{entry}</p>)
                    }
                }

                if (suggestionsBuffer.length === 1) {
                    intendedLocation[intendedLocation.length - 1] = lastEntry;
                    delimitedCommand[delimitedCommand.length - 1] = intendedLocation.join('/');
                    const target = e.target as HTMLTextAreaElement
                    const newSearch = delimitedCommand.join(" ")

                    target.value = newSearch;
                    setCommand(newSearch)
                }
            }
            setSuggestions(suggestionsBuffer);
            return;
        } else if (e.key === "Backspace") {
            if (e.metaKey) {
                setCommand("");
            } else {
                setCommand(command.slice(0, -1));
            }
            return;
        } else if (e.key.length > 1) {
            return;
        }

        setCommand(command + e.key)
    }

    function processFunction() {
        const delimitedCommand = command.split(" ");
        if (delimitedCommand.length < 1) {
            return;
        }
        const action = delimitedCommand[0];
        const args = delimitedCommand.slice(1);

        if (supportedCommands[action] == null) {
            setLogs([...logs, <p key={logs.length}>visitor@eggland {new Date().toLocaleTimeString()}$ <span className='text-red-500'>Invalid command: {`\`${action}\``} was not recognized.</span></p>])
            return;
        }

        supportedCommands[action](args);
    }

    function dragOnMouseDown(e: DragEvent<HTMLDivElement>) {
        let ghostElem: HTMLElement | null = document.getElementById("ghost");
        if (ghostElem) {
            e.dataTransfer.setDragImage(ghostElem, 0, 0);
        }

        const target = e.target as HTMLDivElement
        const targetBounds = target.getBoundingClientRect();
        console.log(targetBounds)
        // e.clientX/Y is the mouse cursor inside the element
        setOffsetX(e.clientX - targetBounds.left);
        setOffsetY(e.clientY - y);
        e.stopPropagation();
    }

    function drag(e: DragEvent<HTMLDivElement>) {
        if (e.clientX === 0 && e.clientY === 0) {
            return;
        }
        const target = e.target as HTMLDivElement
        setX(Math.max(e.clientX - offsetX, 0))
        setY(Math.max(e.clientY - offsetY, 0))
        e.stopPropagation();
    }

    function dragOnMouseUp(e: MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement
        setX(Math.max(e.clientX - offsetX, 0))
        setY(Math.max(e.clientY - offsetY, 0))
    }

    function toggleFullScreen() {
        setFullScreen(!isFullScreen);
    }

    return (
        <div id="terminal-window" style={{ top: `${isFullScreen ? 0 : y}px`, left: `${isFullScreen ? 0 : x}px` }} className={`absolute flex items-center flex-col rounded-xl z-50`}>
            <div id="ghost" className="absolute" style={{ opacity: "0" }}>.</div>
            <div
                draggable
                onDragStart={dragOnMouseDown} onDragEnd={dragOnMouseUp} onDrag={drag}
                className={`relative flex flex-row gap-x-4 px-4 py-2 ${isFullScreen ? "w-[100vw]" : "w-[70vw]"} rounded-xl bg-[#2d3039] justify-center items-center rounded-b-none`}
            >
                <div className='absolute flex flex-row gap-x-4 left-[2.5%]'>
                    <div className='bg-[#FF605C] rounded-full w-4 h-4 opacity-80 hover:opacity-100' onClick={closeTerminal} />
                    <div className={`${isFullScreen ? "bg-dark" : "bg-[#FFBD44]"} rounded-full w-4 h-4 opacity-80 hover:opacity-100`} />
                    <div className='bg-[#00CA4E] rounded-full w-4 h-4 opacity-80 hover:opacity-100' onClick={toggleFullScreen} />
                </div>
                <div className='text-white flex flex-row gap-x-[5%] justify-center items-center w-[15%]'>
                    <Image src="/website/Folder.svg" height={35} width={35} alt="Profile picture for Edward Ng"></Image>
                    <div>
                        Hello world
                    </div>
                </div>
            </div>
            <div className={`relative ${isFullScreen ? "w-[100vw] h-[86vh]" : "w-[70vw] h-[60vh]"} max-w-full bg-dark flex flex-col justify-between items-center overflow-y-hidden overflow-x-hidden`}>
                <div className='absolute text-white left-[5%] overflow-x-clipped overflow-y-scroll h-full'>
                    <pre className='font-mono text-sm'>
                        <code>
                            {`  
 
  _____   ______   ______   ______   ______   ______   ______   ______   ______   ______   ______   ______   ______ 
/_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/ 
/_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/ 
                                                                                                                                                                                                                                                           
___________    .___                         .__/\\      __________                   __               __              
\\_   _____/  __| _/_  _  _______ _______  __| _)/_____ \\______   \\_______  ____    |__| ____   _____/  |_  ______    
 |    __)_  / __ |\\ \\/ \\/ /\\__  \\\\_  __ \\/ __ |/  ___/  |     ___/\\_  __ \\/  _ \\   |  |/ __ \\_/ ___\\   __\\/  ___/    
 |        \\/ /_/ | \\     /  / __ \\|  | \\/ /_/ |\\___ \\   |    |     |  | \\(  <_> )  |  \\  ___/\\  \\___|  |  \\___ \\     
/_______  /\\____ |  \\/\\_/  (____  /__|  \\____ /____  >  |____|     |__|   \\____/\\__|  |\\___  >\\___  >__| /____  >    
        \\/      \\/              \\/           \\/    \\/                          \\______|    \\/     \\/          \\/     
                                                                                                                    
 ______   ______   ______   ______   ______   ______   ______   ______   ______   ______   ______   ______   ______ 
/_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/ 
/_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  /_____/  
                        `}
                        </code>
                    </pre>
                    <div className='mb-[1%]'>
                        <p>Welcome to my projects page!</p>
                        <p>To access any projects: use `ls` to list the current information in the directory</p>
                        <p>To change directories into a particular year: use `cd &lt;DIRECTORY&gt;` to switch the current directory.</p>
                        <p>to view any projects in detail: use `cat &lt;FILE_NAME&gt;` to view the article.</p>
                    </div>
                    <div id="terminal-scroll-view" className='absolute flex flex-col gap-y-[2%]'>
                        {
                            logs.map((log, idx) => {
                                return (
                                    log
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`relative bg-dark ${isFullScreen ? "w-[100vw]" : "w-[70vw]"}`}>
                <div id="suggestions" className='absolute flex flex-row items-center gap-x-[2%] text-white w-full mx-[5%]'>
                    {
                        suggestions.map((value) => value)
                    }
                </div>
                shhh
            </div>
            <div className={`flex flex-row justify-center items-center gap-x-4 text-white text-l ${isFullScreen ? "w-[100vw]" : "w-[70vw]"} p-4 bg-[#2d3039] rounded-xl rounded-t-none`}>
                <div className='w-fit text-nowrap'>
                    visitor@eggland /{workingDirectory.join('/')} $
                </div>
                <textarea id="terminal-entry" className='flex jusitfy-center items-center w-full h-6 overflow-hidden bg-[#2d3039] resize-none' onKeyDown={handleKeyPress}>
                </textarea>
            </div>
        </div >

    )
}