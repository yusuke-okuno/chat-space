class Api::MessagesController < ApplicationController
  before_action :set_group
  def index
    @messages = @group.messages.includes(:user)
    @new_messages = @messages.where('id > ?', params[:id])
    # binding.pry
    respond_to do |format|
      format.html
      format.json
    end
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end