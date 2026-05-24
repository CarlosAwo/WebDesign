class V1::Ui::CardComponent < ViewComponent::Base
  def initialize(title: nil, href: nil, description: nil,
                 date: nil, datetime: nil,
                 image_src: nil, image_alt: "")
    @title       = title
    @href        = href
    @description = description
    @date        = date
    @datetime    = datetime || date
    @image_src   = image_src
    @image_alt   = image_alt
  end
end
