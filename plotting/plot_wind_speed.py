#!/usr/bin/env python

from datetime import datetime
from ndbc import Station
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')


buoyid = 42002

starttime = datetime(2017, 1, 1)
endtime = datetime(2017, 2, 1)

s = Station(buoyid, starttime, endtime)

fig = plt.figure(figsize=(12, 6))
ax = fig.add_subplot(111, xlim=(starttime, endtime), ylim=(0, 20))
ax.tick_params(axis='both', labelsize=16)
plt.plot(s.time, s.wspd, 'k-')
plt.title('Measured wind speed at buoy ' + str(buoyid), fontsize=16)
plt.ylabel('Wind speed [m/s]', fontsize=16)
plt.grid(True)
plt.savefig('wspd_' + str(buoyid) + '.png', dpi=100)
plt.close(fig)
