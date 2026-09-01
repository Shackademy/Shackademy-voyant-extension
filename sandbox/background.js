// background.js — service worker
// Manages the enabled/disabled toggle.
// Scripts are loaded automatically via content_scripts in manifest.json.
// This just toggles the stored state and notifies the content script.

const STORAGE_KEY = "shackademyEnabled";
const VOYANT_DOMAIN = "planwithvoyant.co.uk";

function isVoyantTab(url) {
  try {
    return new URL(url).hostname.endsWith(VOYANT_DOMAIN);
  } catch {
    return false;
  }
}

async function isEnabled() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] === true;
}

async function setEnabled(value) {
  await chrome.storage.local.set({ [STORAGE_KEY]: value });
}

async function updateTitle(enabled) {
  await chrome.action.setTitle({
    title: enabled
      ? "Shackademy help is ON — click to disable"
      : "Shackademy help is OFF — click to enable",
  });
}

// Toolbar click — toggle state and notify content script
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !isVoyantTab(tab.url)) return;

  const enabled = await isEnabled();
  const next = !enabled;
  await setEnabled(next);
  await updateTitle(next);

  // Tell the content script to activate or tear down
  chrome.tabs
    .sendMessage(tab.id, {
      type: next ? "SHACKADEMY_ENABLE" : "SHACKADEMY_DISABLE",
    })
    .catch(() => {});
});

// Restore correct toolbar title on browser startup
chrome.runtime.onStartup.addListener(async () => {
  const enabled = await isEnabled();
  await updateTitle(enabled);
});
