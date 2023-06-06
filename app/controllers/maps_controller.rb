class MapsController < ApplicationController

  def show
    @map = Map.find(params[:id])
  end

  def my_maps
    @maps = current_user.maps
    @point_of_interests = Point_of_interests.map_id
  end

  def new

  end

  def create

  end

  def edit

  end

  def destroy

  end


end
