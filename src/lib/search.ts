import { Project } from "../types/project";

function getScore(project: Project, words: string[]): number {
  let score = 0;

  const name = project.name.toLowerCase();
  const path = project.relativePath.toLowerCase();

  for (const word of words) {
    if (name === word) score += 100;
    else if (name.startsWith(word)) score += 50;
    else if (name.includes(word)) score += 20;

    if (path.includes(word)) score += 5;
  }

  return score;
}

export function filterProjects(projects: Project[], searchText: string): Project[] {
  const query = searchText.trim().toLowerCase();
  const words = query.split(" ").filter(Boolean);

  return projects
    .filter((project) => {
      const searchableText = `${project.name} ${project.relativePath}`.toLowerCase();
      return words.every((word) => searchableText.includes(word));
    })
    .map((project) => ({
      project,
      score: getScore(project, words),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.project);
}