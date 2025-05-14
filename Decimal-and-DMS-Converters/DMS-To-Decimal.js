function convertLatitudeDmsToDecimal(dms) {
    const regex = /^(\d+)° (\d+)' (\d+)" ([NS])$/;
    const matches = regex.exec(dms);
    const degrees = parseFloat(matches[1]);
    const minutes = parseFloat(matches[2]);
    const seconds = parseFloat(matches[3]);
    const direction = matches[4];
    let decimal = degrees + (minutes / 60) + (seconds / 3600);
    if (direction === "S") {
        decimal = -decimal;
    }
    return decimal;
}

function convertLongitudeDmsToDecimal(dms) {
    const regex = /^(\d+)° (\d+)' (\d+)" ([EW])$/;
    const matches = regex.exec(dms);
    const degrees = parseFloat(matches[1]);
    const minutes = parseFloat(matches[2]);
    const seconds = parseFloat(matches[3]);
    const direction = matches[4];
    let decimal = degrees + (minutes / 60) + (seconds / 3600);
    if (direction === "W") {
        decimal = -decimal;
    }
    return decimal;
}

function convertDmsToDecimal(dms) {
    const parts = dms.split(" ");
    const latDms = parts.slice(0, 4).join(" ");
    const lonDms = parts.slice(4).join(" ");
    const latDecimal = convertLatitudeDmsToDecimal(latDms);
    const lonDecimal = convertLongitudeDmsToDecimal(lonDms);
    return [latDecimal, lonDecimal];
}

// Latitude coordinates
const latitudeDecimal1 = convertLatitudeDmsToDecimal("45° 30' 0\" N");
console.log(latitudeDecimal1);

const latitudeDecimal2 = convertLatitudeDmsToDecimal("10° 15' 36\" S");
console.log(latitudeDecimal2);

// Longitude coordinates
const longitudeDecimal1 = convertLongitudeDmsToDecimal("100° 30' 0\" E");
console.log(longitudeDecimal1);

const longitudeDecimal2 = convertLongitudeDmsToDecimal("75° 45' 30\" W");
console.log(longitudeDecimal2);

// Northeast coordinates
const neDecimal = convertDmsToDecimal("45° 30' 0\" N 100° 30' 0\" E");
console.log(neDecimal);

// Northwest coordinates
const nwDecimal = convertDmsToDecimal("45° 30' 0\" N 75° 30' 0\" W");
console.log(nwDecimal);

// Southeast coordinates
const seDecimal = convertDmsToDecimal("10° 15' 36\" S 100° 30' 0\" E");
console.log(seDecimal);

// Southwest coordinates
const swDecimal = convertDmsToDecimal("10° 15' 36\" S 75° 45' 30\" W");
console.log(swDecimal);