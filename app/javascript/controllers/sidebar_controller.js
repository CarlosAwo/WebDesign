import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["label", "navItem", "navPadding", "chevron", "toggleRow", "profile", "profileMin"]

  connect() {
    const collapsed = localStorage.getItem("sidebar-collapsed") === "true"
    this.#syncContentMargin(collapsed)
    if (collapsed) this.#apply(true)
  }

  toggle() {
    this.#apply(this.element.dataset.sidebarCollapsed !== "true")
  }

  #apply(collapse) {
    this.element.dataset.sidebarCollapsed = String(collapse)
    this.#syncContentMargin(collapse)

    if (collapse) {
      this.element.classList.replace("w-64", "w-16")

      this.labelTargets.forEach(el => el.classList.add("hidden"))

      this.navItemTargets.forEach(el => {
        el.classList.remove("gap-3", "px-3")
        el.classList.add("justify-center", "px-0")
      })

      this.navPaddingTargets.forEach(el => {
        el.classList.remove("px-4")
        el.classList.add("px-2")
      })

      this.chevronTargets.forEach(el => el.classList.add("rotate-180"))

      this.toggleRowTargets.forEach(el => {
        el.classList.remove("justify-between")
        el.classList.add("justify-center")
      })

      if (this.hasProfileTarget)    this.profileTarget.classList.add("hidden")
      if (this.hasProfileMinTarget) this.profileMinTarget.classList.remove("hidden")

    } else {
      this.element.classList.replace("w-16", "w-64")

      this.labelTargets.forEach(el => el.classList.remove("hidden"))

      this.navItemTargets.forEach(el => {
        el.classList.add("gap-3", "px-3")
        el.classList.remove("justify-center", "px-0")
      })

      this.navPaddingTargets.forEach(el => {
        el.classList.add("px-4")
        el.classList.remove("px-2")
      })

      this.chevronTargets.forEach(el => el.classList.remove("rotate-180"))

      this.toggleRowTargets.forEach(el => {
        el.classList.add("justify-between")
        el.classList.remove("justify-center")
      })

      if (this.hasProfileTarget)    this.profileTarget.classList.remove("hidden")
      if (this.hasProfileMinTarget) this.profileMinTarget.classList.add("hidden")
    }

    localStorage.setItem("sidebar-collapsed", String(collapse))
  }

  #syncContentMargin(collapsed) {
    const margin = collapsed ? "4rem" : "16rem"
    document.getElementById("dashboard-main")  ?.style.setProperty("margin-left", margin)
    document.getElementById("dashboard-footer")?.style.setProperty("margin-left", margin)
  }
}
