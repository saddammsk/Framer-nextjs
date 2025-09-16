"use client";
import { useEffect, useState } from "react";

type CounterProps = {
     value: number;
     duration?: number;
};

export default function Counter({ value, duration = 1500 }: CounterProps) {
     const [count, setCount] = useState(0);

     useEffect(() => {
          let start = 1000;
          const stepTime = Math.abs(Math.floor(duration / value));
          const timer = setInterval(() => {
               start += 100;
               setCount((prev) => {
                    if (prev + 100 >= value) {
                         clearInterval(timer);
                         return value;
                    }
                    return prev + 100;
               });
          }, stepTime);
          return () => clearInterval(timer);
     }, [value, duration]);

     return <span>{count.toLocaleString()}</span>;
}
