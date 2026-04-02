import { Project } from "../types/project";

export function getProjects(): Project[] {
  return [
    {
      name: "js-learn",
      path: "/Users/baptiste/Dev/js-learn",
    },
    {
      name: "template-react",
      path: "/Users/baptiste/Dev/react/template-react",
    },
    {
      name: "todo",
      path: "/Users/baptiste/Dev/js/todo",
    },
  ];
}