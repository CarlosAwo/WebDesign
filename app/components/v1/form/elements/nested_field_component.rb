
class V1::Form::Elements::NestedFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(form:, field_name:, required: false, placeholder: nil, metadata: {}, readonly: false)
    super
    @association  = field_name
    @model        = field_name.to_s.classify.constantize
    @fields       = metadata.fetch(:fields, {})
    @add_label    = metadata.fetch(:add_label, "Ajouter")
    @remove_label = metadata.fetch(:remove_label, "Supprimer")
    @max          = metadata.fetch(:max, 0)
  end

  def has_many_association?
    return false unless object_form?
    r = @form.object.class.reflect_on_association(@model.name.underscore.to_sym)
    r ||= @form.object.class.reflect_on_association(@model.name.underscore.pluralize.to_sym)
    r.present? && r.macro == :has_many
  end

  def has_one_association?
    return false unless object_form?
    r = @form.object.class.reflect_on_association(@model.name.underscore.to_sym)
    r.present? && r.macro == :has_one
  end

  def max_reached?
    return false if @max == 0 || !object_form?
    @form.object.send(@association).size >= @max
  end
end
