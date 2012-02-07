require 'sinatra'
require 'rubygems'
require 'haml'

get '/' do
  haml :nest
end

