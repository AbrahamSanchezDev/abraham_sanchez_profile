export interface GameProject {
  id: string;
  title: string;
  subtitle: string;
  techBadge: string;
  gifUrl: string;
  repoUrl: string;
  challenge: string;
  architecture: string;
  techStack: string[];
  codeSnippetTitle: string;
  codeSnippet: string;
}

import arcadeData from "./games.json";

export const arcadeGames: GameProject[] = arcadeData as GameProject[];
