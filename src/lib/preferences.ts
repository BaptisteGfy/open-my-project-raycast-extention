import { getPreferenceValues } from "@raycast/api";

type Preferences = {
  editor: string;
};

export function getPreferences(): Preferences {
  return getPreferenceValues<Preferences>();
}