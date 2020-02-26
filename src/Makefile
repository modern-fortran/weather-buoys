# weather-buoys Makefile

FC = caf
OBJS = mod_arrays.o mod_io.o mod_parallel.o

all: weather_stats weather_stats_parallel

.SUFFIXES: .f90 .o

# general rule
.f90.o:
	$(FC) -c $<

# programs
weather_stats: weather_stats.f90 $(OBJS)
	$(FC) $< $(OBJS) -o $@

weather_stats_parallel: weather_stats_parallel.f90 $(OBJS)
	$(FC) $< $(OBJS) -o $@

%.o: %.mod

# modules
mod_arrays.o: mod_arrays.f90
mod_io.o: mod_io.f90
mod_parallel.o: mod_parallel.f90

.PHONY:
clean:
	$(RM) *.o *.mod weather_stats weather_stats_parallel
