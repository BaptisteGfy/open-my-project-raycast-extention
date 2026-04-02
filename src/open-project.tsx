import { Action, ActionPanel, List } from "@raycast/api";
import { getProjects } from "./lib/projects";
import { openProject } from "./lib/editor";

// commande Raycast et interface principale (App.tsx)
export default function Command() {
  const projects = getProjects();
  
  return (
    <List>
      {projects.map((project) => (
        <List.Item 
          key={project.path} 
          title={project.name} 
          accessories={[{text: project.path}]} 
          actions={
            <ActionPanel>
              <Action 
                title="Open Project" 
                onAction={() => openProject(project.path)}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
