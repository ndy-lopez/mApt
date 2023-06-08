class PotentialLocationsController < ApplicationController

  def create
    @map = Map.find(params[:map_id])
    @new_pot_loc = PotentialLocation.new(pot_locs_params)
    @new_pot_loc.map = @map
    if @new_pot_loc.save
      redirect_to map_path(@map), notice: "Potential Location was successfully created."
    else
      render 'maps/show', status: :unprocessable_entity
    end

  end

  private

  def pot_locs_params
    params.require(:potential_location).permit(:name, :adress)
  end
end
