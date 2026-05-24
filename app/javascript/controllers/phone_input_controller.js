import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["display", "hidden"]

  connect() {
    // Pre-format existing value: digits + spaces preserved, stored clean in hidden
    const raw = this.hiddenTarget.value
    if (raw !== "") {
      this.displayTarget.value = raw
      this.hiddenTarget.value = raw.replace(/ /g, "")
    }
  }

  // Block non-digit, non-space, non-control keys at keydown so the user never
  // sees a rejected character appear then disappear.
  keydown(event) {
    const control = event.ctrlKey || event.metaKey
    const allowed =
      control ||
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "Tab" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "Home" ||
      event.key === "End" ||
      event.key === " " ||
      /^\d$/.test(event.key)

    if (!allowed) event.preventDefault()
  }

  // Sanitize on input (handles paste, autofill, drag-drop)
  input() {
    const input  = this.displayTarget
    const raw    = input.value
    const cursor = input.selectionStart

    // Strip everything except digits and spaces
    const invalidBefore = (raw.slice(0, cursor).match(/[^\d ]/g) || []).length
    const cleaned = raw.replace(/[^\d ]/g, "")

    if (cleaned !== raw) {
      input.value = cleaned
      const newPos = Math.max(0, cursor - invalidBefore)
      input.setSelectionRange(newPos, newPos)
    }

    // Hidden input stores only digits, no spaces
    this.hiddenTarget.value = cleaned.replace(/ /g, "")
  }
}
