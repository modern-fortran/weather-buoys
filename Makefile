# weather-buoys Makefile

.PHONY: all clean

all: weather_stats weather_stats_parallel

weather_stats:
	$(MAKE) --directory=src $@
	cp src/$@ .

weather_stats_parallel:
	$(MAKE) --directory=src $@
	cp src/$@ .

clean:
	$(MAKE) --directory=src $@
	$(RM) weather_stats*
