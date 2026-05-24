class V1::Form::Elements::TextareaFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @rows = @metadata[:rows] || 5
    @hint = @metadata[:hint]
  end
end
