class V1::Ui::LightboxComponent < ViewComponent::Base
  def initialize(src:, alt: "", img_class: nil)
    @src       = src
    @alt       = alt
    @img_class = img_class
  end
end
