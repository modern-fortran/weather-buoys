import buoys, { findNearestBuoys, Buoy } from "noaa-buoys";

function locationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
}

function locationError(error) {
    const code = error.code;
    const message = error.message;

    // read the code and message and decide how you want to handle this!
}

export { locationSuccess, locationError };