
class V1::Form::Elements::SelectFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @options = @metadata[:options]
  end
end
