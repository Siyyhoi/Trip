"use client";

import { useEffect } from "react";

interface Props {
  district: string;
}

export default function DistrictBg({ district }: Props) {
  const src = `/Bg/${district}.jpg`;

  useEffect(() => {
    const body = document.body;

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      // Override the layout gradient only on body for this page
      body.style.setProperty("background-image",
        `linear-gradient(rgba(0,0,0,0.48), rgba(0,0,0,0.60)), url('${src}')`, "important");
      body.style.setProperty("background-size", "cover", "important");
      body.style.setProperty("background-position", "center top", "important");
      body.style.setProperty("background-attachment", "fixed", "important");
      body.style.setProperty("background-repeat", "no-repeat", "important");
      // Keep the gradient classes working as color fallback
      body.style.setProperty("background-color", "#0f1117", "important");
    };

    return () => {
      // Restore original layout styles on unmount
      body.style.removeProperty("background-image");
      body.style.removeProperty("background-size");
      body.style.removeProperty("background-position");
      body.style.removeProperty("background-attachment");
      body.style.removeProperty("background-repeat");
      body.style.removeProperty("background-color");
    };
  }, [src]);

  return null;
}