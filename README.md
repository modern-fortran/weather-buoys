# weather-buoys

[![](https://travis-ci.org/modern-fortran/weather-buoys.svg?branch=master)](https://travis-ci.org/modern-fortran/weather-buoys)

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

If you run the program with the dataset included in this repo,
you will get the output similar to this:

```
 Maximum wind speed measured is    40.9000015     at station 42001
 Highest mean wind speed is    6.47883749     at station 42020
 Lowest mean wind speed is    5.43456125     at station 42036
```

### Running the parallel program

Run the program on 2 parallel images:

```
cafrun -n 2 ./weather_stats_parallel
```

The result should be the same as in the serial program,
but will complete somewhat faster, depending on the number 
of cores available and number of images you invoke.
You can run the program on any number of images,
but no more than the number of files in dataset (9).

## Contributors

* [Michael Hirsch](https://github.com/scivision)
