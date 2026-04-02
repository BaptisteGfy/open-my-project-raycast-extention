import { Project } from "../types/project";

export function filterProjects(projects: Project[], searchText: string): Project[] {
  const query = searchText.trim().toLowerCase();
  const words = query.split(" ").filter(Boolean);

  return projects.filter((project) => {
    const searchableText = `${project.name} ${project.relativePath}`.toLowerCase();

    return words.every((word) => searchableText.includes(word));
  });
}