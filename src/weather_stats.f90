program weather_stats

  use mod_arrays, only: denan, mean
  use mod_io, only: read_buoy

  implicit none

  character(len=5), allocatable :: ids(:)
  character(len=20), allocatable :: time(:)
! Add args here
  character(len=*), parameter :: VERSION = '1.0'
  character(len=32)           :: arg

  real, allocatable :: wind_speed(:)
  real, allocatable :: max_wind(:), mean_wind(:)
  integer :: i

!  ids = ['42001', '42002', '42003', '42020', '42035']
! Set our array of buoys to just one for now as part of the demo. We can add more with api

  ids = ['42001']
  do i = 1, command_argument_count()
    call get_command_argument(i, arg)
    ids = [ids, arg]
  end do

  allocate(max_wind(size(ids)), mean_wind(size(ids)))

  do i = 1, size(ids)
    call read_buoy('data/buoy_' // ids(i) //  '.csv', time, wind_speed)
    print *, 'buoy ', ids(i)
    wind_speed = denan(wind_speed)
    max_wind(i) = maxval(wind_speed)
    mean_wind(i) = mean(wind_speed)
  end do

  print *, 'Maximum wind speed measured is ', maxval(max_wind),&
     'at station ', ids(maxloc(max_wind))
  print *, 'Highest mean wind speed is ', maxval(mean_wind),&
     'at station ', ids(maxloc(mean_wind))
  print *, 'Lowest mean wind speed is ', minval(mean_wind),&
     'at station ', ids(minloc(mean_wind))

end program weather_stats
