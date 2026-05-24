
class V1::Form::Elements::DateFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @mode            = @metadata.fetch(:mode, "single")
    @enable_time     = @metadata.fetch(:time, false)
    @enable_seconds  = @metadata.fetch(:seconds, false)
  end

  def form_input
    "#{super} pr-10 w-full"
  end

  def placeholder
    base = "JJ-MM-AAAA"
    return base unless @enable_time
    @enable_seconds ? "#{base} HH:MM:SS" : "#{base} HH:MM"
  end

  def range_placeholder
    base = placeholder
    "#{base} à #{base}"
  end
end
