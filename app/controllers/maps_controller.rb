class MapsController < ApplicationController

  def show
    @map = Map.find(params[:id])
    @pot_locs = @map.potential_locations
    @new_pot_loc = PotentialLocation.new
  end

  def my_maps
    @maps = current_user.maps

  end

  def compare

  end

  def new
    @map = Map.new

  end

  def create
    @map = Map.new(map_params)
    @map.user = current_user
    if @map.save
      redirect_to @map, notice: "Map was successfully created."
    else
      render :new, status: :unprocessable_entity
    end

    @pot_locs = PotentialLocation.new(pot_locs_params)

    if @pot_locs.save
      redirect_to @map, notice: "Potential Location was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
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
    params.require(:map).permit(:name, :city)
  end

  def pot_locs_params
    params.require(:potential_location).permit(:name, :adress)
  end

end
