import { Action, ActionPanel, List, openExtensionPreferences } from "@raycast/api";
import { useState } from "react";
import { openProject } from "./lib/editor";
import { getPreferences } from "./lib/preferences";

import { getProjectList } from "./lib/project-list";

function BlockingStateView({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <List>
      <List.EmptyView
        title={title}
        description={description}
        actions={
          <ActionPanel>
            <Action title="Open Preferences" onAction={openExtensionPreferences} />
          </ActionPanel>
        }
      />
    </List>
  );
}

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { rootFolder } = getPreferences();
  const { projects, error } = getProjectList(rootFolder, searchText);

  if (!rootFolder) {
    return (
      <BlockingStateView
        title="No root folder selected"
        description="Please configure a root folder in the extension settings."
      />
    );
  }

  if (error) {
    return (
      <BlockingStateView 
        title="Cannot read folder" 
        description={error} 
      />
    );
  }

  return (
    <List filtering={false} onSearchTextChange={setSearchText}>
      {projects.map((project) => (
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