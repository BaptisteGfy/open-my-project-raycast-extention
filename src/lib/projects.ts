import { existsSync, readdirSync } from "fs";
import { join, relative } from "path";

import { PROJECT_MARKERS } from "./project-detection-rules";
import { IGNORED_DIRECTORIES } from "./project-scan-config";
import { Project } from "../types/project";

type ProjectsResult = {
  projects: Project[];
  error?: string;
};

export function getProjects(rootPath: string): ProjectsResult {
  try {
    const projects = exploreDirectory(rootPath, rootPath);
    return { projects };
  } catch (error) {
    return {
      projects: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function exploreDirectory(currentPath: string, rootPath: string): Project[] {
  const entries = readdirSync(currentPath, { withFileTypes: true });

  let projects: Project[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (isIgnoredDirectory(entry.name)) continue;

    const fullPath = join(currentPath, entry.name);

    if (isProjectDirectory(fullPath, entry.name)) {
      projects.push({
        name: entry.name,
        path: fullPath,
        relativePath: relative(rootPath, fullPath),
      });

      continue;
    }

    const nestedProjects = exploreDirectory(fullPath, rootPath);
    projects = projects.concat(nestedProjects);
  }

  return projects;
}

function isIgnoredDirectory(directoryName: string): boolean {
  return IGNORED_DIRECTORIES.includes(directoryName);
}

function isProjectDirectory(directoryPath: string, directoryName: string): boolean {
  if (directoryName.startsWith(".")) return false;

  return PROJECT_MARKERS.some((marker) => existsSync(join(directoryPath, marker)));
}