## Data description

Historical buoy data for years 2015 through 2017.
Missing or invalid values are indicated as `nan` (not a number).

Downloaded from the [NOAA NDBC server](http://www.ndbc.noaa.gov)
using the [NDBC Python package](https://github.com/wavebitscientific/ndbc),
See the download script `get_buoy.py`.

## Data formatting

Columns:

1. Datetime string in `%Y-%m-%d_%H:%M:%S` strftime format
2. Wind speed [m/s]
3. Pressure [mbar]
4. Air temperature [deg. C]
5. Dew point [deg. C]
6. Water temperature [deg. C]
7. Significant wave height [m]
8. Mean wave period [s]

Notes:

* Most data is hourly
* Some buoys have weather data at 10-minute increments in recent years
* There are periods of time with gaps in data
