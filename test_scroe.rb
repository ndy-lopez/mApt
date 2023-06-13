targeted_walk_distance = 600


Walk_distances_pois = [4564, 600, 345, 890]

Bike_distances_pois = [564, 700, 945, 890]


if Walk_distances_pois.sum < 480
  rating = 10
elsif Walk_distances_pois.sum > 480 && Walk_distances_pois.sum < 720
  rating = 9

end
