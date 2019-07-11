class Api::MessagesController < ApplicationController
  def index
 
    @messages = Message.where('id > ?', params[:id])
    respond_to do |format|
      format.html
      format.json
        #  binding.pry
    end
  end
end