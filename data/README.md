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

## Example data

Below are the first 5 lines of the `buoy_42001.csv` file:

```
2005-01-01_00:00:00,  9.4, 1020.9, 24.2, 20.5, 24.6,   2.22,   6.11
2005-01-01_01:00:00,  8.6, 1021.5, 24.0, 20.6, 24.5,   2.41,   6.44
2005-01-01_02:00:00,  7.3, 1021.8, 24.3, 20.9, 24.5,   2.16,   5.97
2005-01-01_03:00:00,  7.6, 1022.0, 24.5, 20.6, 24.5,   2.26,   6.38
2005-01-01_04:00:00,  7.8, 1022.4, 24.6, 20.1, 24.5,   2.03,   5.98
...
```
