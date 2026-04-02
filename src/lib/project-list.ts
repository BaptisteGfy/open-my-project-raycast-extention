import { Project } from "../types/project";
import { getProjects } from "./projects";
import { filterProjects } from "./search";

type ProjectListResult = {
  projects: Project[];
  error?: string;
};

export function getProjectList(rootPath: string, searchText: string): ProjectListResult {
  const { projects, error } = getProjects(rootPath);

  if (error) {
    return {
      projects: [],
      error,
    };
  }

  return {
    projects: filterProjects(projects, searchText),
  };
}