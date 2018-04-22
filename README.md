# weather-buoys

Processing weather buoy data in parallel.

## Getting started

### Dependencies

This repo assumes you are working with GNU Fortran compiler
and an OpenCoarrays wrappers `caf` and `cafrun`.
If you are working with other coarray-enabled compiler
such as Intel or Cray compilers, edit the `FC` variable
in the Makefile.

### Getting the code

```
git clone https://github.com/modern-fortran/weather-buoys
```

### Compiling the programs

```
cd weather-buoys
make
```

### Running the serial program

```
./weather_stats
```

### Running the parallel program

Run the program on 2 parallel images:

```
cafrun -n 2 ./weather_stats_parallel
```

You can run the program on any number of images.
