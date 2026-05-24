
class V1::Form::Elements::CheckboxFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @description     = @metadata[:description]
    @checked_value   = @metadata.fetch(:checked_value, "1")
    @unchecked_value = @metadata.fetch(:unchecked_value, "0")
  end
end
