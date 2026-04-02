import { readdirSync } from "fs";
import { join } from "path";
import { Project } from "../types/project";

export function getProjects(rootPath: string): Project[] {
  return exploreDirectory(rootPath);
}

function exploreDirectory(currentPath: string): Project[] {
  const entries = readdirSync(currentPath, { withFileTypes: true });

  let projects: Project[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const fullPath = join(currentPath, entry.name);

    projects.push({
      name: entry.name,
      path: fullPath,
    });

    const subProjects = exploreDirectory(fullPath);

    projects = projects.concat(subProjects);
  }

  return projects;
}