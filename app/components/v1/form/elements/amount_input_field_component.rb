
class V1::Form::Elements::AmountInputFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @currency          = @metadata[:currency]
    @currency_position = @metadata.fetch(:currency_position, :right)
    @hint              = @metadata[:hint]
  end

  def form_input
    radius_override = if @currency
      @currency_position.to_sym == :left ? "rounded-l-none" : "rounded-r-none"
    end
    "#{super} flex-1 #{radius_override}"
  end
end
