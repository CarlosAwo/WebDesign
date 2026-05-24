import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "newRecordTemplate", "addButton"]
  static values  = { max: { type: Number, default: 0 } }

  connect() {
    if (this.activeRecords.length === 0) this.#addNewRecord()
    this.#syncAddButton()
  }

  addNewRecord(e) {
    e.preventDefault()
    if (this.maxValue > 0 && this.activeRecords.length >= this.maxValue) return
    this.#addNewRecord()
    this.#syncAddButton()
  }

  removeRecord(e) {
    e.target.checked = true
    e.target.closest(".nestedRecord").classList.add("hidden")
    this.#syncAddButton()
  }

  get activeRecords() {
    return Array.from(
      this.containerTarget.querySelectorAll(".nestedRecord")
    ).filter(el => !el.classList.contains("hidden"))
  }

  #addNewRecord() {
    const timestamp = new Date().getTime()
    const html = this.newRecordTemplateTarget.textContent.replace(/NEW_RECORD/g, timestamp)
    const node = new DOMParser().parseFromString(html, "text/html").body.firstChild
    this.containerTarget.appendChild(node)
  }

  #syncAddButton() {
    if (!this.hasAddButtonTarget) return
    const reached = this.maxValue > 0 && this.activeRecords.length >= this.maxValue
    this.addButtonTarget.classList.toggle("hidden", reached)
  }
}
