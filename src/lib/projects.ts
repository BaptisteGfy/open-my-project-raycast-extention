import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { Project } from "../types/project";

const IGNORED_DIRECTORIES = ["node_modules", ".git", "dist", "build"];

export function getProjects(rootPath: string): Project[] {
  return exploreDirectory(rootPath);
}

function isProjectDirectory(directoryPath: string, directoryName: string): boolean {
  if (directoryName.startsWith(".")) return false;

  const hasPackageJson = existsSync(join(directoryPath, "package.json"));
  const hasGitDirectory = existsSync(join(directoryPath, ".git"));

  return hasPackageJson || hasGitDirectory;
}

function exploreDirectory(currentPath: string): Project[] {
  const entries = readdirSync(currentPath, { withFileTypes: true });

  let projects: Project[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (IGNORED_DIRECTORIES.includes(entry.name)) continue;

    const fullPath = join(currentPath, entry.name);

    if (isProjectDirectory(fullPath, entry.name)) {
      projects.push({
        name: entry.name,
        path: fullPath,
      });

      continue;
    }

    const subProjects = exploreDirectory(fullPath);
    projects = projects.concat(subProjects);
  }

  return projects;
}

