import { Controller } from "@hotwired/stimulus"

// Handles individual flash messages:
//   - Auto-dismisses after `delay` ms (default 4 s)
//   - Manual close via dismiss() action on the × button
//   - Fades out with a slide-to-right exit before removal
export default class extends Controller {
  static values = {
    delay: { type: Number, default: 2500 }
  }

  connect() {
    this.timer = setTimeout(() => this.dismiss(), this.delayValue)
  }

  disconnect() {
    clearTimeout(this.timer)
  }

  dismiss() {
    clearTimeout(this.timer)
    // this.element.style.transition = "opacity 0.25s ease, transform 0.25s ease"
    // this.element.style.opacity = "0"
    // this.element.style.transform = "translateX(1rem)"
    this.element.classList.add("flash-exit")
    setTimeout(() => this.element.remove(), 250)
  }
}
