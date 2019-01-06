#!/usr/bin/env python

from ndbc import Station
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap
import matplotlib
matplotlib.use('Agg')


buoys = [42001, 42002, 42003, 42020, 42035, 42036, 42039, 42040, 42055]

map = Basemap(resolution='f')
map.drawcoastlines(linewidth=0.25)
map.drawcountries(linewidth=0.25)
map.fillcontinents(color='grey')

for buoyid in buoys:
    s = Station(buoyid)
    plt.plot(s.lon, s.lat, 'r.', ms=12)
    plt.text(s.lon - 0.2, s.lat - 0.3, str(buoyid),
             color='r', va='top', ha='left')

plt.xlim(-98, -80)
plt.ylim(18, 32)
plt.savefig('gom_buoy_map.png', dpi=100)
plt.close()
