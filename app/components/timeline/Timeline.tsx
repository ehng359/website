import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react';
interface TimelineProps {

}

export default function Timeline({ }: TimelineProps) {
    const ref = useRef(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });
    const [hookedYPostion, setHookedYPosition] = useState(0);
    useMotionValueEvent(scrollY, "change", (latest) => {
        setHookedYPosition(latest);
    })

    console.log(hookedYPostion)

    return (
        <div className='m-4 w-screen flex justify-center'>
            <div className='w-[80%] h-[80vh] bg-dark rounded-xl'>
                <div className='relative flex flex-row gap-x-4 w-full p-4 rounded-xl bg-[#2d3039]'>
                    <div className='bg-[#FF605C] rounded-full w-6 h-6' />
                    <div className='bg-[#FFBD44] rounded-full w-6 h-6' />
                    <div className='bg-[#00CA4E] rounded-full w-6 h-6' />
                </div>
                test
            </div>
            {/* <div className='bg-dark w-screen py-8 px-3 mx-4 overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{
                        translateX: hookedYPostion
                    }}
                    className='relative text-5xl p-4 right-full mb-[80%] snap-center text-white'
                >
                    How did I get here?
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{
                        translateX: hookedYPostion
                    }}
                    className='relative text-5xl p-4 right-[180%] snap-center text-white'
                >
                    Well, let&apos;s go through the timeline.
                </motion.div>
                <div className='h-screen'>

                </div>
            </div> */}
        </div>

    )
}