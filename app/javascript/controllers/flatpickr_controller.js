import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr"

const French = {
  weekdays: {
    shorthand: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    longhand:  ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  },
  months: {
    shorthand: ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
    longhand:  ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  },
  firstDayOfWeek: 1,
  ordinal:         (n) => n > 1 ? "" : "er",
  rangeSeparator:  " au ",
  weekAbbreviation: "Sem",
  scrollTitle:     "Défiler pour changer",
  toggleTitle:     "Basculer AM/PM",
  time_24hr:       true,
}
export default class extends Controller {
  static targets = ["input", "start", "end"]
  static values  = {
    mode:    { type: String,  default: "single" },
    time:    { type: Boolean, default: true },
    seconds: { type: Boolean, default: true },
  }

  connect() {
    const dateFormat = this.#buildDateFormat()

    const options = {
      mode:           this.modeValue,
      dateFormat:     dateFormat,
      enableTime:     this.timeValue,
      enableSeconds:  this.timeValue && this.secondsValue,
      time_24hr:      true,
      showMonths:     1,
      allowInput:     true,
      disableMobile:  true,

      // 👉 clé
      locale: French
    }

    if (this.modeValue === "range") {
      options.onChange = (dates) => {
        const fmt = (d) => this.picker.formatDate(d, this.picker.config.dateFormat)
        this.startTarget.value = dates[0] ? fmt(dates[0]) : ""
        this.endTarget.value   = dates[1] ? fmt(dates[1]) : ""
      }
    }

    this.picker = flatpickr(this.inputTarget, options)
  }

  disconnect() {
    this.picker?.destroy()
  }

  #buildDateFormat() {
    let fmt = "d-m-Y"
    if (this.timeValue)                      fmt += " H:i"
    if (this.timeValue && this.secondsValue) fmt += ":S"
    return fmt
  }
}