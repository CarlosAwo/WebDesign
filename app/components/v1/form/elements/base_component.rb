
class V1::Form::Elements::BaseComponent < ViewComponent::Base
  attr_reader :form

  def initialize(form:, field_name:, required: false, placeholder: nil, metadata: {}, readonly: false)
    @form = form
    @placeholder = placeholder
    @field_name = field_name
    @metadata = metadata
    @required = required
    @readonly = readonly
  end

  def error_message
    return unless @form && @field_name && object_form?
    @form.object.errors[@field_name].first
  end

  def has_error?
    error_message.present?
  end

  def before_render
    @value = if object_form? && @form.object.respond_to?(@field_name)
      @form.object.send(@field_name)
    else
      helpers.params[@field_name]
    end
  end

  def object_form?
    @form.object.present?
  end

  # ── Form element styles ────────────────────────────────────────
  # Ces méthodes remplacent les classes CSS externes (.form-input,
  # .form-hint, etc.) afin que les composants soient auto-suffisants.

  def form_input
    "w-full bg-white border border-neutral-200 rounded-lg px-[13px] py-[9px] " \
    "text-sm text-neutral-900 font-sans outline-none " \
    "transition-[border-color,box-shadow] " \
    "focus:border-primary-600 focus:ring-0 " \
    "focus:shadow-[0_0_0_3px_rgba(22,130,73,0.1)] " \
    "placeholder:text-neutral-400"
  end

  def form_hint
    "text-xs text-neutral-400 mt-1"
  end

  def form_input_error
    "border-danger-500"
  end

  def form_input_error_message
    "mt-1 text-xs text-danger-600"
  end

  def form_readonly
    "bg-neutral-50 border-neutral-300 text-neutral-600 cursor-default select-all"
  end

  def form_disabled
    "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-75"
  end

  def form_input_addon
    "inline-flex items-center px-3 border border-neutral-200 bg-neutral-50 " \
    "text-sm text-neutral-900 font-medium select-none whitespace-nowrap"
  end

  def form_input_addon_left
    "#{form_input_addon} rounded-l-lg border-r-0"
  end

  def form_input_addon_right
    "#{form_input_addon} rounded-r-lg border-l-0"
  end
end
