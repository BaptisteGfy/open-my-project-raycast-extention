import { getPreferenceValues } from "@raycast/api";

type Preferences = {
  editor: string;
  rootFolder: string;
};

export function getPreferences(): Preferences {
  return getPreferenceValues<Preferences>();
}