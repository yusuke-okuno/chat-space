class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  config.generators do |g|
    g.stylesheets false
    g.javascripts false
    g.helper false
    g.test_framework false
  end
end
