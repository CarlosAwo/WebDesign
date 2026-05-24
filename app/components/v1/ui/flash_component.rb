class V1::Ui::FlashComponent < ViewComponent::Base
  TYPE_CLASS = {
    notice:  "flash-success",
    success: "flash-success",
    alert:   "flash-error",
    error:   "flash-error",
    warning: "flash-warning",
    info:    "flash-info"
  }.freeze

  def initialize(type:, message:, delay: 4000)
    @type    = type.to_sym
    @message = message
    @delay   = delay
  end

  def flash_class
    TYPE_CLASS.fetch(@type, "flash-info")
  end
end
