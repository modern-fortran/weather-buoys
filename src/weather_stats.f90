program weather_stats

  use mod_arrays, only: denan, mean
  use mod_io, only: read_buoy

  implicit none

  character(len=5), allocatable :: ids(:)
  character(len=20), allocatable :: time(:)
  real, allocatable :: wind_speed(:)
  real, allocatable :: max_wind(:), mean_wind(:)
  integer :: i

  ids = ['42001', '42002', '42003', '42020', '42035',&
    '42036', '42039', '42040', '42055']

  allocate(max_wind(size(ids)), mean_wind(size(ids)))

  do i = 1, size(ids)
    call read_buoy('data/buoy_' // ids(i) //  '.csv', time, wind_speed)
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
