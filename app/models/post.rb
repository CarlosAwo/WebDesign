class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  accepts_nested_attributes_for :comments, allow_destroy: true, reject_if: :all_blank

  STATUSES = %w[draft published archived].freeze

  validates :title, presence: true
end
