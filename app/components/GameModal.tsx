"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameUrl: string;
}

export default function GameModal({
  isOpen,
  onClose,
  gameUrl,
}: GameModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  // Clean up iframe and memory on unmount
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = "";
        iframeRef.current = null;
      }
    };
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full h-full max-w-5xl max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl flex flex-col m-4 md:m-0 overflow-hidden z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-all duration-200 shadow-lg"
          aria-label="Close modal"
          title="Press Escape to close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm z-10">
            <div className="text-center">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mb-4" />
              </div>
              <p className="text-slate-300 font-medium">Cargando juego...</p>
            </div>
          </div>
        )}

        {/* Iframe Container */}
        <div className="flex-1 overflow-hidden bg-slate-950">
          <iframe
            ref={iframeRef}
            src={gameUrl}
            title="Juego WebGL"
            className="w-full h-full border-none"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
            loading="lazy"
            onLoad={handleIframeLoad}
          />
        </div>

        {/* Info Footer */}
        <div className="bg-slate-900 border-t border-slate-700 px-6 py-3 flex items-center justify-between">
          <p className="text-slate-400 text-sm">Presiona ESC para cerrar</p>
          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            Abrir en ventana nueva →
          </a>
        </div>
      </div>
    </div>
  );
}
