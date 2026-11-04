"use client";

import { useRef, useState, type DragEvent, type PointerEvent } from "react";
import { PHOTO_SRC } from "@/data/content";
import { useToast } from "./Toast";

export default function PhotoSlot() {
  const [src, setSrc] = useState<string>(PHOTO_SRC);
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const card = useRef<HTMLElement>(null);
  const toast = useToast();

  const readFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) {
      toast("Pick an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setSrc(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.setProperty("--ry", `${x * 14}deg`);
    card.current.style.setProperty("--rx", `${-y * 14}deg`);
  };

  const onLeave = () => {
    card.current?.style.setProperty("--rx", "0deg");
    card.current?.style.setProperty("--ry", "0deg");
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    readFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="hero-photo">
      <figure ref={card} className="polaroid" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div
          className={`shot ${dragging ? "drag" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="Raphael Sark" />
          ) : (
            <div className="ph">
              <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="200" height="250" fill="#8FA3FF" />
                <circle cx="100" cy="98" r="44" fill="#FFD21F" stroke="#17142B" strokeWidth="5" />
                <path
                  d="M16 250 C16 178 56 152 100 152 C144 152 184 178 184 250 Z"
                  fill="#FF4132"
                  stroke="#17142B"
                  strokeWidth="5"
                />
              </svg>
              <div className="ph-label">Raphael’s photo goes here</div>
            </div>
          )}
        </div>
      </figure>

      
    </div>
  );
}
