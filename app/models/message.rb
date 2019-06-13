class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :messages

  mount_uploader :image, ImageUploader
  
  validates :content, presence: true, unless: :image?
  
end
