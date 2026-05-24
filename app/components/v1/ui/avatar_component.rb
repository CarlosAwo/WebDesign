class V1::Ui::AvatarComponent < ViewComponent::Base
  SIZES = {
    xs: { wrap: "h-6 w-6",   text: "text-[10px]", dot: "h-1.5 w-1.5" },
    sm: { wrap: "h-8 w-8",   text: "text-xs",     dot: "h-2 w-2"     },
    md: { wrap: "h-10 w-10", text: "text-sm",      dot: "h-2.5 w-2.5" },
    lg: { wrap: "h-12 w-12", text: "text-base",    dot: "h-3 w-3"     },
    xl: { wrap: "h-16 w-16", text: "text-xl",      dot: "h-3.5 w-3.5" }
  }.freeze

  STATUS_COLORS = {
    online:  "bg-success-500",
    offline: "bg-neutral-400",
    away:    "bg-warning-500",
    busy:    "bg-danger-500"
  }.freeze

  INITIALS_PALETTES = [
    "bg-primary-100 text-primary-700",
    "bg-accent-100  text-accent-700",
    "bg-info-100    text-info-700",
    "bg-danger-100  text-danger-700",
    "bg-neutral-200 text-neutral-700"
  ].freeze

  def initialize(src: nil, initials: nil, size: :md, status: nil, shape: :circle)
    @src      = src
    @initials = initials&.upcase&.slice(0, 2)
    @size     = size.to_sym
    @status   = status&.to_sym
    @shape    = shape.to_sym
  end

  def wrap_class
    cfg        = SIZES.fetch(@size, SIZES[:md])
    shape_cls  = @shape == :rounded ? "rounded-xl" : "rounded-full"
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden #{cfg[:wrap]} #{shape_cls}"
  end

  def text_class = SIZES.fetch(@size, SIZES[:md])[:text]
  def dot_class  = SIZES.fetch(@size, SIZES[:md])[:dot]

  def initials_palette
    return INITIALS_PALETTES.last unless @initials
    INITIALS_PALETTES[@initials.sum % INITIALS_PALETTES.length]
  end

  def status_color = STATUS_COLORS.fetch(@status, "bg-neutral-400")
end
