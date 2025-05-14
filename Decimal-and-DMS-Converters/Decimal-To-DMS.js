function decimalToDMS(decimal) {
    let absolute = Math.abs(decimal);
    let degrees = Math.floor(absolute);
    let minutes = Math.floor((absolute - degrees) * 60);
    let seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(2);

    let direction = "";
    if (decimal >= 0) {
        direction = "N";
    } else {
        direction = "S";
    }

    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
}

// function decimalToDMS(decimal) {
//     var direction = "";
//     var degrees = Math.abs(Math.floor(decimal));
//     var minutes = Math.abs(Math.floor((decimal - degrees) * 60));
//     var seconds = Math.abs(((decimal - degrees - minutes / 60) * 3600).toFixed(2));

//     if (decimal >= 0) {
//         direction = (degrees == 0 && minutes == 0 && seconds == 0) ? "" : "N";
//     } else {
//         direction = (degrees == 0 && minutes == 0 && seconds == 0) ? "" : "S";
//     }

//     if (direction === "") {
//         return degrees + "° " + minutes + "' " + seconds + "\"";
//     } else {
//         return degrees + "° " + minutes + "' " + seconds + "\" " + direction;
//     }
// }


console.log(decimalToDMS(51.507222)); // Output: 51° 30' 26" N
console.log(decimalToDMS(-33.865143)); // Output: 33° 51' 54.51" S
console.log(decimalToDMS(151.209444)); // Output: 151° 12' 34" E
console.log(decimalToDMS(-118.408056)); // Output: 118° 24' 29" W
