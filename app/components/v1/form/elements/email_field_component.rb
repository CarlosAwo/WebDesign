class V1::Form::Elements::EmailFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @placeholder = @placeholder || "email@example.com"
  end
end
