class MapsController < ApplicationController

  def show
    @map = Map.find(params[:id])
  end

  def my_maps
    @maps = current_user.maps

  end

  def compare

  end

  def new

  end

  def create

  end

  def edit

  end

  def destroy

  end

  private

  def set_map
    @map = Map.find(params[:id])
  end

  def map_params
    params.require(:map).permit(:name)
  end

end
