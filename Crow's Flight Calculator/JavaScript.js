/**
 * 
 * @param {decimal} degrees
 * Any decimal from -90 to 90 for Latitude
 * 
 * Any decimal from -180 to 180 for Longitude
 * 
 * @returns
 * -π/2 to π/2 for Latitude
 * 
 * -π to π for Longitude
 */

function degrees_to_radians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * 
 * @param {decimal} lat1
 * 
 * Latitude of the 1st coordinate
 * 
 * @param {decimal} lon1 Longitude of the 1st coordinate
 * @param {decimal} lat2 Longitude of th 2nd coordinate
 * @param {decimal} lon2 Longitude of the 2nd coordinate
 * @returns Distance between both coordinates
 */

function distanceCalculator(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km

    // Latitude calculations
    var dLat = lat2 - lat1; // Difference in latitude
    var dLatR = degrees_to_radians(lat2 - lat1); // Convert the difference to radians

    // Longitude calculations
    var dLon = lon2 - lon1; // Difference in longitude
    var dLonR = degrees_to_radians(dLon); // Convert the difference to longitude

    // Haversine Formula
    var a =
        (Math.sin(dLatR / 2) ** 2) +
        Math.cos(degrees_to_radians(lat1)) *
        Math.cos(degrees_to_radians(lat2)) *
        (Math.sin(dLonR / 2) ** 2);

    const C = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const D = R * C; // Distance in km

    // Generalize rounding here if necessary
    // return D.toFixed(2); // Round to 2 decimal places

    return D;
}

console.log(distanceCalculator(1.413687, 103.912312, 1.415278, 103.911111), "km");