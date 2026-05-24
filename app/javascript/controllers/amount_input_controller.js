import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["display", "hidden"]

  connect() {
    if (this.hiddenTarget.value !== "") {
      this.displayTarget.value = this.#formatThousands(this.hiddenTarget.value)
    }
  }

  input() {
    const input  = this.displayTarget
    const raw    = input.value
    const cursor = input.selectionStart

    // Count invalid chars before cursor to restore position accurately
    const invalidBefore = (raw.slice(0, cursor).match(/[^\d .]/g) || []).length

    // Step 1 — strip everything except digits, space, dot
    let cleaned = raw.replace(/[^\d .]/g, "")

    // Step 2 — keep only the first dot (decimal point)
    const firstDot = cleaned.indexOf(".")
    if (firstDot !== -1) {
      cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "")
    }

    // Update display only if something was stripped (avoids cursor jump on normal typing)
    if (cleaned !== raw) {
      input.value = cleaned
      const newPos = Math.max(0, cursor - invalidBefore)
      input.setSelectionRange(newPos, newPos)
    }

    // Hidden receives clean numeric value: digits + dot, no spaces
    this.hiddenTarget.value = cleaned.replace(/ /g, "")
  }

  #formatThousands(value) {
const [intPart, decPart] = value.split(".")
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return decPart !== undefined ? `${formatted}.${decPart}` : formatted
  }
}
