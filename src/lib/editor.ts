import { exec } from "child_process";

export function openProject(path: string) {
  exec(`code "${path}"`);
}