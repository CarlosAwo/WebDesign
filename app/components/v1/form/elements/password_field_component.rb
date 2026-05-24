
class V1::Form::Elements::PasswordFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @placeholder  = @placeholder || "••••••••"
    @show_toggle  = @metadata.fetch(:toggle, true)
    @timeout      = @metadata.fetch(:timeout, 5)
  end

  def form_input
    "#{super} #{'pr-10' if @show_toggle}"
  end
end
