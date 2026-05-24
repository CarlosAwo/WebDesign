import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "preview", "filename", "button"]
  static values  = { initialUrl: String, initialName: String }

  connect() {
    if (this.initialUrlValue) {
      this.renderInitial(this.initialUrlValue, this.initialNameValue)
    } else {
      this.renderDefault()
    }
  }

  preview() {
    const file = this.inputTarget.files[0]
    if (!file) return

    this.filenameTarget.textContent = file.name
    if (this.hasButtonTarget) this.buttonTarget.textContent = "Remplacer"

    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewTarget.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover" />`
      }
      reader.readAsDataURL(file)
    } else {
      this.previewTarget.innerHTML = this.iconForMime(file.type)
    }
  }

  renderInitial(url, name) {
    const ext = url.split("?")[0].split(".").pop().toLowerCase()
    const imageExts = ["jpg", "jpeg", "png", "gif", "webp"]

    if (imageExts.includes(ext)) {
      this.previewTarget.innerHTML = `<img src="${url}" class="w-full h-full object-cover" />`
    } else {
      this.previewTarget.innerHTML = this.iconForExt(ext)
    }

    if (name) this.filenameTarget.textContent = name
    if (this.hasButtonTarget) this.buttonTarget.textContent = "Remplacer"
  }

  renderDefault() {
    this.previewTarget.innerHTML = `
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#bfcfc0">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>`
  }

  iconForMime(mime) {
    if (mime.includes("pdf"))  return this.#pdfIcon()
    if (mime.includes("text")) return this.#textIcon()
    return this.#genericIcon()
  }

  iconForExt(ext) {
    if (ext === "pdf")                        return this.#pdfIcon()
    if (["txt", "csv"].includes(ext))         return this.#textIcon()
    if (["jpg","jpeg","png","gif","webp"].includes(ext)) return this.#imageIcon()
    return this.#genericIcon()
  }

  #pdfIcon() {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h6l4 4v14H7V3z" stroke="#9ca3af" stroke-width="1.5"/>
      <path d="M13 3v4h4" stroke="#9ca3af" stroke-width="1.5"/>
      <text x="6" y="18" font-size="6" fill="#9ca3af">PDF</text>
    </svg>`
  }

  #textIcon() {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h8l4 4v14H6V3z" stroke="#9ca3af" stroke-width="1.5"/>
      <path d="M8 12h8M8 16h6" stroke="#9ca3af" stroke-width="1.5"/>
    </svg>`
  }

  #imageIcon() {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#9ca3af" stroke-width="1.5"/>
      <circle cx="8.5" cy="8.5" r="1.5" fill="#9ca3af"/>
      <path d="M3 15l5-5 4 4 3-3 6 6" stroke="#9ca3af" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`
  }

  #genericIcon() {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h6l4 4v14H7V3z" stroke="#9ca3af" stroke-width="1.5"/>
    </svg>`
  }
}
