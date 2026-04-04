import {
  Action,
  ActionPanel,
  List,
  openExtensionPreferences,
} from '@raycast/api';
import { useEffect, useState } from 'react';
import { openProject } from './lib/editor';
import { getPreferences } from './lib/preferences';
import { getProjects } from './lib/projects';
import { filterProjects } from './lib/search';
import { Project } from './types/project';

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

export default function Command() {
  const [searchText, setSearchText] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { rootFolder } = getPreferences();

  if (!rootFolder) {
    return (
      <BlockingStateView
        title="No root folder selected"
        description="Please configure a root folder in the extension settings."
      />
    );
  }

  useEffect(() => {
    setIsLoading(true);
    const result = getProjects(rootFolder);

    setProjects(result.projects);
    setError(result.error);
    setIsLoading(false);
  }, [rootFolder]);

  if (error) {
    return <BlockingStateView title="Cannot read folder" description={error} />;
  }

  const filteredProjects = filterProjects(projects, searchText);

  return (
    <List
      isLoading={isLoading}
      filtering={false}
      onSearchTextChange={setSearchText}
    >
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
