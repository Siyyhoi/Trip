"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/Slide/1.jpg",
  "/Slide/2.jpg",
  "/Slide/3.jpg",
  "/Slide/4.jpg",
];

const extendedImages = [
  images[images.length - 1],
  ...images,
  images[0],
];

export default function ImageSlider() {
  const [index, setIndex] = useState(1);
  const [imageWidth, setImageWidth] = useState(600);
  const [gap, setGap] = useState(40);

  // responsive
  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setImageWidth(w * 0.8);
        setGap(16);
      } else if (w < 1024) {
        setImageWidth(480);
        setGap(24);
      } else {
        setImageWidth(600);
        setGap(40);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const STEP = imageWidth + gap;

  // auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // loop
  useEffect(() => {
    if (index === extendedImages.length - 1) {
      setTimeout(() => setIndex(1), 800);
    }
  }, [index]);

  return (
    <div className="w-full py-20 flex justify-center overflow-hidden">
      <div className="relative" style={{ width: imageWidth }}>
        <motion.div
          className="flex items-center"
          style={{ gap }}
          animate={{ x: `-${index * STEP}px` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {extendedImages.map((src, i) => (
            <div
              key={i}
              className="shrink-0 overflow-hidden rounded-3xl"
              style={{
                width: imageWidth,
                aspectRatio: "16 / 9",
              }}
            >
              <motion.img
                src={src}
                className="w-full h-full object-cover rounded-3xl"
                animate={{
                  scale: i === index ? 1 : 0.9,
                  opacity: i === index ? 1 : 0.35,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
