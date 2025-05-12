import math

def degrees_to_radians(degrees: float) -> float:
    """
    Convert degrees to radians.

    :param degrees: A decimal from -90 to 90 for latitude or -180 to 180 for longitude.
    :return: Radians in the range of -π/2 to π/2 for latitude, -π to π for longitude.
    """
    return degrees * (math.pi / 180)


def distance_calculator(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the distance between two coordinates using the Haversine formula.

    :param lat1: Latitude of the first coordinate
    :param lon1: Longitude of the first coordinate
    :param lat2: Latitude of the second coordinate
    :param lon2: Longitude of the second coordinate
    :return: Distance in kilometers between both coordinates
    """
    R = 6371 # Radius of the Earth in kilometers

    dLatR = degrees_to_radians(lat2 - lat1)
    dLonR = degrees_to_radians(lon2 - lon1)

    a = (
        (math.sin(dLatR / 2) ** 2) +
        math.cos(degrees_to_radians(lat1)) *
        math.cos(degrees_to_radians(lat2)) *
        (math.sin(dLonR / 2) ** 2)
    )

    C = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    D = R * C

    # Generalize rounding here if necessary:
    # return round(D, 2) # Round to 2 decimal places

    return D

print(distance_calculator(1.413687, 103.912312, 1.415278, 103.911111), "km")