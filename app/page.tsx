"use client";
import Link from "next/link";
import Faq from "./components/Faq";
import React, { useEffect, useRef, useState } from "react";
import Counter from "./components/Counter";
type TimeLeft = { hours: number; minutes: number; seconds: number };
interface Props {
  target?: Date | string | number;
}

export default function Home({ target }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;
    let frame: number;
    const animate = () => {
      angle = (angle + 0.5) % 360; // speed control
      if (ref.current) {
        const bg = getComputedStyle(ref.current).getPropertyValue("--radial-bg");
        ref.current.style.background = `conic-gradient(
      from ${angle}deg,
      rgb(38, 92, 252) 0,
      ${bg} 32.5deg,
      ${bg} 327.5deg,
      rgb(38, 92, 252) 360deg
    )`;
      }
      frame = requestAnimationFrame(animate);
    };


    animate();
    return () => cancelAnimationFrame(frame);
  }, []);


  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // store a single stable target timestamp (computed once)
  const targetRef = useRef<number>(
    (() => {
      if (!target) return Date.now() + 24 * 60 * 60 * 1000; // default 24h from mount
      const t =
        typeof target === "number"
          ? target
          : new Date(target as Date | string).getTime();
      return isNaN(t) ? Date.now() + 24 * 60 * 60 * 1000 : t;
    })()
  );

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const distance = targetRef.current - now;

      if (distance <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // total hours (not modulo 24), minutes and seconds from remainder
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    tick(); // set initial value immediately
    const interval = window.setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");
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
    <div className="font-inter overflow-hidden min-h-screen dark:bg-black-1000 bg-white relative z-10 md:pt-20 pt-16">
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
      <div className="max-w-[498px] mx-auto md:px-5 px-4">
        <div className="text-center">
          <img src="images/logo.png" className="inline-block w-12 h-12 rounded-xl" alt="" />
          <div className="dark:bg-black-1100 border-gray-1100/[5%] mt-6 md:mb-[34px] mb-6 w-fit mx-auto rounded-3xl flex items-center px-2 gap-2 border dark:border-white-1000">
            <div className="relative flex items-center justify-center">
              <div className="bg-blue-1000 rounded-full w-2 h-2 block"></div>
              <span className="ripple absolute w-2 h-2 rounded-full"></span>
            </div>
            <h6 className="text-xs font-medium uppercase dark:text-white text-black-1300 leading-6">Available in LATE 2025</h6>
          </div>
          <h2 className="md:text-[40px] text-[32px] md:max-w-[400px] max-w-[300px] mb-2.5 mx-auto dark:text-white text-black-1300 font-medium tracking-[-1.6px] md:leading-12 leading-10">
            <span className="inline-block animate-[slideUp_0.4s_ease-out_forwards]">
              Power your AI.
            </span>
            <span className="inline-block opacity-0 animate-[slideUp_0.4s_ease-out_0.2s_forwards]">
              Wherever you are.
            </span>
          </h2>
          <div className="opacity-0 animate-[slideUp2_0.2s_ease-out_0.1s_forwards]">
            <p className="text-gray-1000 text-[15px] font-normal">Runexo gives you instant access to high-performance GPUs in the cloud. No setup, no limits. Be the first to experience the future of compute.</p>
            <form action="" className="md:mt-8 mt-6 mb-6 p-[1px] relative">
              <div className="bg-gray-1200 relative z-[99] dark:bg-black-1100 rounded-[12px] md:p-0 p-2 pt-0 border dark:border-gray-1100 border-gray-1300">
                <div className="relative z-[99] dark:bg-black-1100  bg-gray-1200 rounded-[12px]">
                  <input
                    type="text"
                    id="email"
                    placeholder=" "
                    className="peer h-12 md:px-3 px-0 w-full text-[15px] font-normal text-gray-1000 
                 dark:bg-black-1100  bg-gray-1200 border-0 rounded-[12px]
                 placeholder-transparent focus:outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 text-gray-1000 text-[15px] font-normal
                 transition-all duration-500 
                 top-1/2 -translate-y-1/2
                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[15px]
                 peer-focus:-top-4 peer-focus:left-0 
                 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:left-0"
                  >
                    Email
                  </label>
                </div>
                <Link href="" className="text-[15px] z-[99] md:w-auto w-full md:absolute md:top-1/2 md:-translate-y-1/2 transition-all ease-in-out duration-500 border-2 border-blue-1000 hover:border-yellow-1000 right-1 font-medium text-white leading-6 bg-blue-1000 rounded-lg inline-block py-1 px-3">Join waitlist</Link>
              </div>
              <div className="opacity-30 absolute overflow-hidden inset-0 flex-none">
                <div
                  ref={ref}
                  className="rounded-[12px] w-full h-full cursor-none radial-gradient"
                >
                  <div className="absolute inset-[1px] rounded-[11px] cursor-none dark:bg-black-1100 bg-gray-1200"></div>
                </div>
              </div>
            </form>
            <div className="flex md:flex-nowrap flex-wrap items-center gap-3 justify-center">
              <div className="flex md:w-auto w-full md:justify-start justify-center">
                <img src="images/avatar-2.png" className="rounded-full object-cover object-center w-7 h-7 border border-black-1000" alt="" />
                <img src="images/avatar-5.png" className="rounded-full object-cover object-center w-7 h-7 border border-black-1000 -ml-1" alt="" />
                <img src="images/avatar-3.png" className="rounded-full object-cover object-center w-7 h-7 border border-black-1000 -ml-1" alt="" />
                <img src="images/avatar-4.png" className="rounded-full object-cover object-center w-7 h-7 border border-black-1000 -ml-1" alt="" />
                <img src="images/avatar-1.jpg" className="rounded-full object-cover object-center w-7 h-7 border border-black-1000 -ml-1" alt="" />
              </div>
              <h6 className="text-sm text-gray-1000">Join <span className="min-w-11 inline-block"> <Counter value={12500} duration={2000}></Counter></span>+ others on the waitlist</h6>
            </div>
            <div className="flex gap-[14px] mt-6 items-center justify-center">
              <div className="min-w-16">
                <h6 className="text-lg font-normal leading-[21px] dark:text-white text-black-1300 mb-2">
                  {pad(timeLeft.hours)}
                </h6>
                <p className="text-[11px] font-normal leading-[11px] text-gray-1000">
                  hours
                </p>
              </div>

              <div className="text-[11px] font-normal leading-[11px] text-gray-1000">:</div>

              <div className="min-w-16">
                <h6 className="text-lg font-normal leading-[21px] dark:text-white text-black-1300 mb-2">
                  {pad(timeLeft.minutes)}
                </h6>
                <p className="text-[11px] font-normal leading-[11px] text-gray-1000">
                  minutes
                </p>
              </div>

              <div className="text-[11px] font-normal leading-[11px] text-gray-1000">:</div>

              <div className="min-w-16">
                <h6 className="text-lg font-normal leading-[21px] dark:text-white text-black-1300 mb-2">
                  {pad(timeLeft.seconds)}
                </h6>
                <p className="text-[11px] font-normal leading-[11px] text-gray-1000">
                  seconds
                </p>
              </div>
            </div>
            <div className="flex mt-7 items-center justify-center gap-1.5">
              <img src="images/calendar-icon.svg" alt="" />
              <h6 className="text-xs font-medium dark:text-white text-black-1300">WAITLIST CLOSING SOON</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 opacity-0 animate-[slideUp2_0.2s_ease-out_0.1s_forwards]">
        <div className="max-w-[720px] mt-10 mx-auto">
          <div className="border dark:border-gray-1100 border-gray-1300 rounded-[10px] overflow-hidden pt-2 px-1 pb-1 dark:bg-gray-1100">
            <div className="flex ml-1 mb-1.5 gap-1">
              <div className="w-2 h-2 bg-gray-1500 rounded-full dark:bg-black-1200 block"></div>
              <div className="w-2 h-2 bg-gray-1500 rounded-full dark:bg-black-1200 block"></div>
              <div className="w-2 h-2 bg-gray-1500 rounded-full dark:bg-black-1200 block"></div>
            </div>
            <div className="-mx-1 md:w-auto w-[840px]">
              <img src="images/image-1.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mt-10 py-6">
          <div className="text-center max-w-[448px] mx-auto">
            <h4 className="text-[28px] dark:text-white text-black-1300 font-medium leading-10">Frequently asked questions</h4>
            <p className="text-gray-1000 text-[15px] font-normal">Everything you need to know about Runexo. Find clear answers to the most common questions below.</p>
            <Faq></Faq>
          </div>
        </div>
      </div>
    </div>
  );
}
