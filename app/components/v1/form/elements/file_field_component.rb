class V1::Form::Elements::FileFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super

    @hint        = @metadata[:hint]
    @accept      = @metadata[:accept] || ""
    @upload_text = @metadata[:upload_text] || "Choisir"

    # Priorité aux valeurs explicites
    @file_url  = @metadata[:file_url].presence
    @file_name = @metadata[:file_name].presence

    return if @file_url.present? && @file_name.present?

    extract_file_from_object
  end

  private

  def extract_file_from_object
    object = form.object

    return unless object.present?
    return unless @field_name.present?
    return unless object.respond_to?(@field_name)

    file = object.public_send(@field_name)

    return unless file.respond_to?(:attached?)
    return unless file.attached?
    return unless file.blob.persisted? # ← guard ajouté

    @file_url ||= Rails.application.routes.url_helpers.rails_blob_path(
      file,
      only_path: true
    )

    @file_name ||= file.filename.to_s
  end
end
