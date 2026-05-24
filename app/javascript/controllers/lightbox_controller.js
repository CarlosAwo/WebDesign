import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "image"]
  static values  = { url: String }

  connect() {
    this._buildOverlay()
  }

  _buildOverlay() {
    const overlay = document.createElement("div")
    overlay.className = "lightbox-overlay"
    overlay.setAttribute("aria-label", "Agrandir l'image")
    overlay.innerHTML = `
      <svg class="lightbox-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 8v6M8 11h6"/>
      </svg>
    `
    overlay.addEventListener("click", (e) => {
      e.stopPropagation()
      this.open()
    })
    this.containerTarget.appendChild(overlay)
  }

  open() {
    const modal = document.createElement("div")
    modal.className = "lightbox-modal"
    modal.setAttribute("role", "dialog")
    modal.setAttribute("aria-modal", "true")

    const img = document.createElement("img")
    img.src = this.imageTarget.src
    img.alt = this.imageTarget.alt
    img.className = "lightbox-modal-img"

    const closeBtn = document.createElement("button")
    closeBtn.className = "lightbox-close"
    closeBtn.setAttribute("aria-label", "Fermer")
    closeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    `
    closeBtn.addEventListener("click", () => this._close(modal))
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this._close(modal)
    })

    this._handleKeydown = (e) => {
      if (e.key === "Escape") this._close(modal)
    }
    document.addEventListener("keydown", this._handleKeydown)

    modal.appendChild(closeBtn)
    modal.appendChild(img)
    document.body.appendChild(modal)
    this._modal = modal
  }

  _close(modal) {
    modal.remove()
    document.removeEventListener("keydown", this._handleKeydown)
    this._modal = null
  }

  disconnect() {
    this._modal?.remove()
    if (this._handleKeydown) document.removeEventListener("keydown", this._handleKeydown)
  }
}
