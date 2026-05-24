import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "eyeOff", "eyeOn"]
  static values  = { timeout: { type: Number, default: 5 } }

  #timer = null

  connect() {
    this.inputTarget.addEventListener("input", this.#onInput)
  }

  disconnect() {
    this.#clearTimer()
    this.inputTarget.removeEventListener("input", this.#onInput)
  }

  toggle() {
    const visible = this.inputTarget.type === "text"
    this.#setVisible(!visible)
  }

  // ── private ──────────────────────────────────────────────

  #setVisible(show) {
    this.inputTarget.type = show ? "text" : "password"
    this.eyeOffTarget.classList.toggle("hidden",  show)
    this.eyeOnTarget.classList.toggle("hidden",  !show)
    show ? this.#startTimer() : this.#clearTimer()
  }

  // Arrow function to keep `this` when used as event listener
  #onInput = () => {
    if (this.inputTarget.type === "text") this.#startTimer()
  }

  #startTimer() {
    this.#clearTimer()
    this.#timer = setTimeout(() => this.#setVisible(false), this.timeoutValue * 1000)
  }

  #clearTimer() {
    clearTimeout(this.#timer)
    this.#timer = null
  }
}
