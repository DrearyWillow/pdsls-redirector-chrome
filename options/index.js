window.onload = async () => {
  const alwaysOpenCheckbox = document.getElementById('always-open')
  const redirectCheckbox = document.getElementById('redirect-or-new')
  const pdsFallbackCheckbox = document.getElementById('pds-fallback')
  const jsonModeCheckbox = document.getElementById('json-mode')
  const replyCountSpinner = document.getElementById('reply-count')
  const parentCountSpinner = document.getElementById('parent-count')
  const jsonAdvanced = document.querySelector('.json-advanced')
  const saveButton = document.querySelector('.save-settings')
  const resetButton = document.querySelector('.reset-defaults')

  jsonModeCheckbox.addEventListener('change', (event) => {
    jsonAdvanced.style.display = event.target.checked ? 'block' : 'none'
  })

  replyCountSpinner.addEventListener('input', () => {
    const max = replyCountSpinner.max
    if (parseInt(replyCountSpinner.value, 10) > max) {
      replyCountSpinner.value = max
    } else {
      replyCountSpinner.value = parseInt(replyCountSpinner.value, 10)
    }
  })

  parentCountSpinner.addEventListener('input', () => {
    const max = parentCountSpinner.max
    if (parseInt(parentCountSpinner.value, 10) > max) {
      parentCountSpinner.value = max
    } else {
      parentCountSpinner.value = parseInt(parentCountSpinner.value, 10)
    }
  })

  // Define default values
  const defaults = {
    alwaysOpen: true,
    openInNewTab: true,
    pdsFallback: true,
    jsonMode: false,
    replyCount: 0,
    parentCount: 0,
  }
  // Load settings from storage and apply them to the form
  try {
    const data = await chrome.storage.sync.get(Object.keys(defaults))
    console.log('Storage data:', data)
    alwaysOpenCheckbox.checked = data.alwaysOpen ?? defaults.alwaysOpen
    redirectCheckbox.checked = data.openInNewTab ?? defaults.openInNewTab
    pdsFallbackCheckbox.checked = data.pdsFallback ?? defaults.pdsFallback
    jsonModeCheckbox.checked = data.jsonMode ?? defaults.jsonMode
    replyCountSpinner.value = data.replyCount ?? defaults.replyCount
    parentCountSpinner.value = data.parentCount ?? defaults.parentCount
  } catch (error) {
    console.error('Error retrieving settings:', error)
  }

  // Save settings to storage when Save button is clicked
  saveButton.addEventListener('click', () => {
    chrome.storage.sync.set({
      alwaysOpen: alwaysOpenCheckbox.checked,
      openInNewTab: redirectCheckbox.checked,
      pdsFallback: pdsFallbackCheckbox.checked,
      jsonMode: jsonModeCheckbox.checked,
      replyCount: replyCountSpinner.value,
      parentCount: parentCountSpinner.value
    }, () => {
      console.log('Settings saved')
    })
  })

  // Reset settings to defaults when Reset button is clicked
  resetButton.addEventListener('click', () => {
    chrome.storage.sync.set(defaults, () => {
      alwaysOpenCheckbox.checked = defaults.alwaysOpen
      redirectCheckbox.checked = defaults.openInNewTab
      pdsFallbackCheckbox.checked = defaults.pdsFallback
      jsonModeCheckbox.checked = defaults.jsonMode
      replyCountSpinner.value = defaults.replyCount
      parentCountSpinner.value = defaults.parentCount
      jsonAdvanced.style.display = jsonModeCheckbox.checked ? 'block' : 'none'
      console.log('Settings reset to defaults')
    })
  })

  jsonAdvanced.style.display = jsonModeCheckbox.checked ? 'block' : 'none'
}