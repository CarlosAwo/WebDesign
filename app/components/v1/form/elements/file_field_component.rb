class V1::Form::Elements::FileFieldComponent < V1::Form::Elements::BaseComponent
  def initialize(*args, **kwargs)
    super

    @hint        = @metadata[:hint]
    @accept      = @metadata[:accept] || "image/*"
    @upload_text = @metadata[:upload_text] || "Choisir"
    @file_url    = @metadata[:file_url]
    @file_name   = @metadata[:file_name]
  end

  def before_render
    extract_file_from_object unless @file_url
  end

  private

  def extract_file_from_object
    return unless @form&.object&.respond_to?(@field_name)

    file = @form.object.public_send(@field_name)

    return unless file.respond_to?(:attached?)
    return unless file.attached?
    return unless file.blob.persisted?

    @file_url  = helpers.rails_blob_path(file, only_path: true)
    @file_name = file.blob.filename.to_s
  end
end
