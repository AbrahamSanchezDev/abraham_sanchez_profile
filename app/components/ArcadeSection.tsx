"use client";

import { useState } from "react";
import { Play, Code, Zap } from "lucide-react";
import GameModal from "./GameModal";
import { arcadeGames } from "@/app/data/games";

export default function ArcadeSection() {
  const [selectedId, setSelectedId] = useState(arcadeGames[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGameUrl, setActiveGameUrl] = useState("");
  const selectedGame = arcadeGames.find((g) => g.id === selectedId);

  const highlightArchitectureTerms = (text: string) => {
    const keywords = [
      "Object pooling",
      "State machine",
      "Observer pattern",
      "Singleton",
      "Factory pattern",
      "Model-View-Controller",
      "Dependency injection",
      "Strategy pattern",
      "Input buffering",
      "Event-driven",
      "Physics engine",
    ];
    let result = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      result = result.replace(
        regex,
        `<span class="text-cyan-400 font-semibold">${keyword}</span>`,
      );
    });
    return result;
  };

  return (
    <section className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-cyan-400" />
            <h2 className="text-4xl font-bold text-white">Arcade Gallery</h2>
          </div>
          <p className="text-slate-400 text-lg">
            Minimalist games built with optimized architecture and clean code
            patterns
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Games Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {arcadeGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => setSelectedId(game.id)}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer text-left ${
                    selectedId === game.id
                      ? "ring-2 ring-cyan-400 glow-cyan-lg"
                      : "ring-1 ring-slate-700 hover:ring-cyan-400/50"
                  }`}
                >
                  {/* Card Container */}
                  <div className="bg-slate-900 h-full flex flex-col">
                    {/* Tech Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-block px-3 py-1 bg-cyan-400/20 text-cyan-300 text-xs font-semibold rounded-full backdrop-blur-sm border border-cyan-400/30">
                        {game.techBadge}
                      </span>
                    </div>

                    {/* GIF/Video Container */}
                    <div className="relative w-full h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Play className="w-12 h-12 text-cyan-400/40 mx-auto mb-2" />
                          <p className="text-slate-500 text-xs">{game.title}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col">
                      <h3 className="font-bold text-white text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 flex-1">
                        {game.subtitle}
                      </p>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-slate-700">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveGameUrl(
                              game.id === "drift-shooter"
                                ? "TU_URL_DE_PRUEBA_AQUÍ"
                                : "/games/" + game.id,
                            );
                            setIsModalOpen(true);
                          }}
                          className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Play className="w-4 h-4" />
                          Jugar
                        </button>
                        <a
                          href={game.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 px-4 py-2 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Code className="w-4 h-4" />
                          Ver Código
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Technical Sheet */}
          {selectedGame && (
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Card Container */}
                <div className="bg-slate-900 rounded-2xl p-6 ring-1 ring-slate-700 border-t border-cyan-400/20">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Ficha Técnica
                  </h3>

                  {/* El Reto */}
                  <div className="mb-6 pb-6 border-b border-slate-700">
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                      El Reto
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedGame.challenge}
                    </p>
                  </div>

                  {/* Arquitectura */}
                  <div className="mb-6 pb-6 border-b border-slate-700">
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                      Arquitectura
                    </h4>
                    <p
                      className="text-slate-300 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: highlightArchitectureTerms(
                          selectedGame.architecture,
                        ),
                      }}
                    />
                  </div>

                  {/* Stack Tecnológico */}
                  <div className="mb-6 pb-6 border-b border-slate-700">
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                      Stack Tecnológico
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedGame.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-3 py-1 bg-slate-800 text-cyan-300 text-xs font-medium rounded-full border border-slate-600 hover:border-cyan-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Micro-Sistemas (Code Snippet) */}
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                      Micro-Sistemas
                    </h4>
                    <div className="bg-slate-950 rounded-lg p-4 border border-slate-700 overflow-hidden">
                      <p className="text-xs font-semibold text-slate-400 mb-3">
                        {selectedGame.codeSnippetTitle}
                      </p>
                      <pre className="text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto max-h-48 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-950">
                        <code>{selectedGame.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Repository Button */}
                <a
                  href={selectedGame.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-cyan-400 font-semibold rounded-lg transition-all duration-300 text-center border border-slate-600 hover:border-cyan-400/50"
                >
                  Ver Repositorio
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <GameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameUrl={activeGameUrl}
      />
    </section>
  );
}
