import { effect } from "@preact/signals";
import { appStore } from "./store";

// Runs whenever appStore.darkmode changes, for the lifetime of the tab.
effect(() => {
  const isDark = appStore.darkmode.value;
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.dataset.theme = isDark ? "dark" : "light";
});
