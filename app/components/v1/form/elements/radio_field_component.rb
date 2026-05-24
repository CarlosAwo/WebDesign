
class V1::Form::Elements::RadioFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    raw     = @metadata[:options] || []
    @options = raw.is_a?(Hash) ? raw.to_a : raw
    @layout  = @metadata.fetch(:layout, :vertical)
  end
end
