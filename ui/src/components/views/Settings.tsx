import { appStore } from "../../store.ts";
import type { Signal } from "@preact/signals";
import { version } from "../../../package.json";

const Settings = ({ closeClick }: { closeClick: any }) => {
  const displayRotate = appStore.displayRotate.value;
  const darkmodeOverride = appStore.darkmodeOverride.value;
  const displayRotateInterval = appStore.displayRotateInterval.value;

  const handler = (signal: Signal<boolean>) => (evt: any) => {
    signal.value = evt.target.checked;
  };

  const intervalHandler = (evt: any) => {
    if (evt.target.value !== "") {
      appStore.displayRotateInterval.value = parseInt(evt.target.value);
    }
  };

  return (
    <div class="flex items-center justify-center bg-gray-50 px-4 py-2 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800">
        <div class="space-y-6 rounded-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="dark-mode-toggle"
                onChange={handler(appStore.darkmodeOverride)}
                checked={darkmodeOverride}
                name="dark-mode-toggle"
                type="checkbox"
                onClick={handler(appStore.darkmodeOverride)}
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
              <label
                for="dark-mode-toggle"
                class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Dark Mode
              </label>
            </div>
          </div>
          <hr />
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="rotate-option"
                onChange={handler(appStore.displayRotate)}
                checked={displayRotate}
                name="rotate-option"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
              <label
                for="rotate-option"
                class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Rotate flight list and map
              </label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="dark-mode-toggle"
                onChange={intervalHandler}
                value={displayRotateInterval}
                name="dark-mode-toggle"
                type="number"
                class="w-12 rounded border pl-1"
              />
              <label
                for="dark-mode-toggle"
                class="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Rotate view interval (seconds)
              </label>
            </div>
          </div>
          <hr />
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="px-1 rounded-none text-left italic text-xs">
                Flight Tracker version {version}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-end">
            <button
              onClick={closeClick}
              class="ft-button px-2 rounded-sm font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
