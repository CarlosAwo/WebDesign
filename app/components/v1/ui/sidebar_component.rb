class V1::Ui::SidebarComponent < ViewComponent::Base
  NAV_ITEMS = [
    { label: "Tableau de bord", href: "#",          icon: :home },
    { label: "Formulaires",     href: "#",          icon: :document, active: true },
    { label: "Utilisateurs",    href: "#",          icon: :users },
    { label: "Rapports",        href: "#",          icon: :chart },
    { label: "Paramètres",      href: "#",          icon: :cog }
  ].freeze

  def initialize(user_name: "Carlos Awo", user_initials: "CA", user_role: "Administrateur")
    @user_name     = user_name
    @user_initials = user_initials
    @user_role     = user_role
    @nav_items     = NAV_ITEMS
  end
end
