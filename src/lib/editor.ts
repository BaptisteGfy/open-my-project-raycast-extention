import { exec } from "child_process";
import { getPreferences } from "./preferences";

export function openProject(path: string) {
  const { editor } = getPreferences()
    exec(`${editor} "${path}"`);
}