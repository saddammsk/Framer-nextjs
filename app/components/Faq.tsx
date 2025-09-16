"use client";
import React, { useState } from "react";

interface FaqItem {
     question: string;
     answer: string;
}

function Faq() {
     const [openIndexes, setOpenIndexes] = useState<number[]>([]);

     const items: FaqItem[] = [
          {
               question: "What is Runexo?",
               answer:
                    "Runexo is a next-generation cloud GPU platform that gives you instant access to enterprise-grade compute power. Whether you’re training AI models, generating content, rendering, or running complex simulations, Runexo makes it possible in just a few clicks — no hardware to buy, no setup headaches.",
          },
          {
               question: "Why choose Runexo over buying GPUs?",
               answer:
                    "High-performance GPUs are expensive and hard to scale. Runexo removes that barrier. You pay only for what you use, scale on demand, and always have access to the latest GPU technology without worrying about maintenance, upgrades, or downtime.",
          },
          {
               question: "When is Runexo launching?",
               answer:
                    "Runexo is launching soon. Early users on the waitlist will receive priority access, exclusive perks, and bonus credits at launch.",
          },
          {
               question: "How much does it cost?",
               answer:
                    "Pricing starts from $0.99/hour for entry-level GPUs, with enterprise GPUs like the A100 and H100 available at competitive hourly rates. You only pay for what you use.",
          },
          {
               question: "How do I join?",
               answer:
                    "Simply enter your email on our waitlist form. You’ll be notified as soon as your invite is ready.",
          },
     ];

     const toggleItem = (index: number) => {
          if (openIndexes.includes(index)) {
               setOpenIndexes(openIndexes.filter((i) => i !== index));
          } else {
               setOpenIndexes([...openIndexes, index]);
          }
     };

     return (
          <div className="mt-8">
               {items.map((item: FaqItem, index: number) => (
                    <div
                         key={index}
                         className="dark:bg-black-1100 bg-gray-1400 mb-2 py-3 px-4 shadow-3xl rounded-[12px]"
                    >
                         <button
                              type="button"
                              onClick={() => toggleItem(index)}
                              className="flex items-center text-start justify-between w-full text-[15px] font-normal dark:text-white text-black-1300"
                         >
                              {item.question}
                              <img
                                   src="images/plus.svg"
                                   alt=""
                                   className={`ml-2 transition-transform duration-300 ${openIndexes.includes(index) ? "rotate-45" : ""
                                        }`}
                              />
                         </button>

                         <div
                              className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndexes.includes(index)
                                   ? "max-h-[500px] opacity-100 mt-2"
                                   : "max-h-0 opacity-0"
                                   }`}
                         >
                              <p className="text-[15px] text-start max-w-[400px] font-normal text-gray-1000">
                                   {item.answer}
                              </p>
                         </div>
                    </div>
               ))}
          </div>
     );
}

export default Faq;
