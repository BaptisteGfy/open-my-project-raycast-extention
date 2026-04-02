import { Action, ActionPanel, List, openExtensionPreferences } from "@raycast/api";
import { useState } from "react";
import { getProjects } from "./lib/projects";
import { openProject } from "./lib/editor";
import { getPreferences } from "./lib/preferences";

// commande Raycast et interface principale (App.tsx)
export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { rootFolder } = getPreferences();

  if (!rootFolder) {
    return (
      <List>
        <List.EmptyView
          title="No root folder selected"
          description="Please configure a root folder in the extension settings."
          actions={
            <ActionPanel>
              <Action
                title="Open Preferences"
                onAction={openExtensionPreferences}
              />
            </ActionPanel>
          }
        />
      </List>
    );
  }

  const projects = getProjects(rootFolder);

  const filteredProjects = projects.filter((project) => {
    const query = searchText.trim().toLowerCase();
    const words = query.split(" ").filter(Boolean);
    const searchableText = `${project.name} ${project.relativePath}`.toLowerCase();

    return words.every((word) => searchableText.includes(word));
  });


  return (
    <List filtering={false} onSearchTextChange={setSearchText}>
      {filteredProjects.map((project) => (
        <List.Item
          key={project.path}
          title={project.name}
          accessories={[{ text: project.relativePath }]}
          actions={
            <ActionPanel>
              <Action 
                title="Open in Editor" 
                onAction={() => openProject(project.path)} 
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}