class MapsController < ApplicationController

  def show
    @map = Map.find(params[:id])
    @pot_locs = @map.potential_locations
    @new_pot_loc = PotentialLocation.new
    @address = @map.city
  end

  def my_maps
    @maps = current_user.maps
    @map = Map.new
    @address = @map.city
  end

  def compare

  end

  def create
    @map = Map.new(map_params)
    @map.user = current_user
    if @map.save
      redirect_to map_path(@map), notice: "Map was successfully created."
    else
      render :show, status: :unprocessable_entity
    end

    @new_pot_loc = PotentialLocation.new(pot_locs_params)

    if @new_pot_loc.save
      redirect_to @map, notice: "Potential Location was successfully created."
    else
      render :show, status: :unprocessable_entity
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
    params.require(:map).permit(:city)
  end

  def pot_locs_params
    params.require(:potential_location).permit(:name, :adress)
  end

end
