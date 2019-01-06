cmake_minimum_required(VERSION 3.3)
project(wxbuoy Fortran)
enable_testing()

list(APPEND CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake/Modules)

find_package(Coarray REQUIRED)

add_library(io src/mod_arrays.f90 src/mod_io.f90)
target_compile_options(io PUBLIC ${Coarray_COMPILE_OPTIONS})
target_link_libraries(io PUBLIC ${Coarray_LIBRARIES})

add_executable(weather_stats src/weather_stats.f90)
target_link_libraries(weather_stats io)

add_executable(weather_stats_parallel src/weather_stats.f90)
target_link_libraries(weather_stats_parallel io)

add_test(NAME WXstats
  COMMAND weather_stats
  WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR})

add_test(NAME WXstatsParallel
  COMMAND ${Coarray_EXECUTABLE} ${Coarray_NUMPROC_FLAG} ${Coarray_MAX_NUMPROCS} ${CMAKE_CURRENT_BINARY_DIR}/weather_stats_parallel
  WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR})
