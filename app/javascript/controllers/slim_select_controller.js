import { Controller } from "@hotwired/stimulus"
import SlimSelect from "slim-select"

export default class extends Controller {
  static targets = ["select"]

  connect() {
    this.slim = new SlimSelect({
      select: this.selectTarget,
      settings: {
        showSearch:      this.selectTarget.dataset.search !== "false",
        searchPlaceholder: "Rechercher…",
        searchText:      "Aucun résultat",
        placeholderText: this.selectTarget.dataset.placeholder || "Sélectionner…",
      }
    })
  }

  disconnect() {
    this.slim?.destroy()
  }
}
