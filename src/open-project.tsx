import { Action, ActionPanel, List, openExtensionPreferences } from "@raycast/api";
import { useState } from "react";
import { getProjects } from "./lib/projects";
import { openProject } from "./lib/editor";
import { getPreferences } from "./lib/preferences";
import { filterProjects } from "./lib/search";

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
              <Action title="Open Preferences" onAction={openExtensionPreferences} />
            </ActionPanel>
          }
        />
      </List>
    );
  }

  const { projects, error } = getProjects(rootFolder);

  if (error) {
    return (
      <List>
        <List.EmptyView
          title="Cannot read folder"
          description={error}
          actions={
            <ActionPanel>
              <Action title="Open Preferences" onAction={openExtensionPreferences} />
            </ActionPanel>
          }
        />
      </List>
    );
  }

  const filteredProjects = filterProjects(projects, searchText);

  return (
    <List filtering={false} onSearchTextChange={setSearchText}>
      {filteredProjects.map((project) => (
        <List.Item
          key={project.path}
          title={project.name}
          accessories={[{ text: project.relativePath }]}
          actions={
            <ActionPanel>
              <Action title="Open in Editor" onAction={() => openProject(project.path)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}