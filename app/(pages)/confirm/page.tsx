"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Confirmpage() {
     const [copied, setCopied] = useState(false);
     const textToCopy = "https://runexo.ai/";

     const handleCopy = async () => {
          try {
               await navigator.clipboard.writeText(textToCopy);
               setCopied(true);
               setTimeout(() => setCopied(false), 2000);
          } catch (err) {
               console.error("Failed to copy: ", err);
          }
     };

     useEffect(() => {
          confetti({
               particleCount: 120,
               spread: 80,
               startVelocity: 60,
               origin: { x: 0.5, y: 0.6 },
               colors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd", "#a7c957", "#00bbf9", "#4361ee"],
          });
     }, []);
     const [position, setPosition] = useState({ x: 0, y: 0 });

     useEffect(() => {
          const moveHandler = (e: MouseEvent) => {
               setPosition({ x: e.clientX, y: e.clientY });
          };
          window.addEventListener("mousemove", moveHandler);

          return () => {
               window.removeEventListener("mousemove", moveHandler);
          };
     }, []);
     return (
          <div className="font-inter py-[120px] min-h-[85vh] flex flex-col  justify-center overflow-hidden dark:bg-black-1000 bg-white relative z-10 ">
               <div
                    className="fixed xl:opacity-100 opacity-0 xl:block hidden top-0 left-0 w-5 h-5 z-[9999] bg-white-1200 backdrop-blur-[10px] rounded-full pointer-events-none mix-blend-difference"
                    style={{
                         transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
                         transition: "transform 0.05s linear",
                    }}
               ></div>
               <div className="absolute top-[-136px] right-[-176px] -z-10">
                    <img src="images/shape.svg" className="dark:invert-[1]" alt="" />
               </div>
               <div className="max-w-[498px] text-center w-full mx-auto md:px-5 px-4">
                    <img src="images/logo.png" className="inline-block mb-6 w-12 h-12 rounded-xl" alt="" />
                    <h2 className="md:text-[40px] text-[32px] md:max-w-[300px] w-full max-w-[300px] mb-2.5 mx-auto dark:text-white text-black-1300 font-medium tracking-[-1.6px] md:leading-12 leading-10">{"Your email has been confirmed"}</h2>
                    <p className="text-gray-1000 text-[15px] font-normal"> {"You've"} successfully secured your spot. Excited? <br></br> Feel free to refer your friends!</p>
                    <div className="relative transition-all ease-in-out duration-500 hover:shadow-4xl mt-6 dark:bg-black-1100 text-[15px] font-normal text-gray-1000 flex items-center justify-between p-2.5 border dark:border-gray-1100 border-gray-1300 bg-gray-1200 rounded-[12px]">
                         {copied ? "Copied URL" : textToCopy}
                         <button onClick={handleCopy}>
                              {copied ? (
                                   <img src="images/tick-icon.svg" alt="Copied" />
                              ) : (
                                   <img src="images/copy-icon.svg" alt="Copy" />
                              )}
                         </button>
                    </div>
               </div>
          </div>
     );
}
