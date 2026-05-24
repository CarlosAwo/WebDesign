
class V1::Form::Blocks::FieldComponent < ViewComponent::Base
  def initialize(form:, field_type:, label:, field_name:, metadata: {}, required: false, placeholder: nil, readonly: false)
    @form = form
    @field_type = field_type
    @label = label
    @field_name = field_name
    @metadata = metadata
    @required = required
    @placeholder = placeholder
    @readonly = readonly
  end
end
