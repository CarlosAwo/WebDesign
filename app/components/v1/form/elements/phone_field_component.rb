
class V1::Form::Elements::PhoneFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super
    @placeholder ||= "90 12 34 56"
  end
end
