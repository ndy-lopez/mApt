class PotentialLocationsController < ApplicationController

  def create
    @map = Map.find(params[:map_id])
    @new_pot_loc = PotentialLocation.new(pot_locs_params)
    @pot_locs = @map.potential_locations
    @new_pot_loc.map = @map
    if @new_pot_loc.save
      redirect_to map_path(@map), notice: "Potential Location was successfully created."
    else
      render 'maps/show', status: :unprocessable_entity
    end

  end

  def destroy
    @pot_loc = PotentialLocation.find(params[:id])
    @pot_loc.destroy
    redirect_to map_path, notice: "Potential Location was successfully removed."
  end

  private

  def pot_locs_params
    params.require(:potential_location).permit(:address, :latitude, :longitude, :google_place_id)
  end
end
