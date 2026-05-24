class V1::Ui::SidebarComponent < ViewComponent::Base
  NAV_ITEMS = [
    { label: "Composants",   href: "/v1",       icon: :home },
    { label: "Posts",        href: "/v1/posts", icon: :document },
    { label: "Utilisateurs", href: "#",         icon: :users },
    { label: "Rapports",     href: "#",         icon: :chart },
    { label: "Paramètres",   href: "#",         icon: :cog }
  ].freeze

  def initialize(user_name: "Carlos Awo", user_initials: "CA", user_role: "Administrateur")
    @user_name     = user_name
    @user_initials = user_initials
    @user_role     = user_role
  end

  def before_render
    current = helpers.request.path
    @nav_items = NAV_ITEMS.map do |item|
      active = item[:href] != "#" &&
               current.start_with?(item[:href]) &&
               !(item[:href] == "/v1" && current.start_with?("/v1/"))
      item.merge(active: active)
    end
  end
end
