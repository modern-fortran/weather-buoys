module mod_io

  ! A helper module for parsing buoy data in csv format.

  implicit none

  private
  public :: read_buoy

contains

  integer function num_records(filename)
    ! Return the number of records (lines) of a text file.
    character(len=*), intent(in) :: filename
    integer :: fileunit
    open(newunit=fileunit, file=filename)
    num_records = 0
    do
      read(unit=fileunit, fmt=*, end=1)
      num_records = num_records + 1
    end do
    1 continue
    close(unit=fileunit)
  end function num_records

  subroutine read_buoy(filename, time, wind_speed)
    ! Read time and wind speed data from a data file
    ! and store them into arrays.
    character(len=*), intent(in) :: filename
    character(len=20), allocatable, intent(in out) :: time(:)
    real, allocatable, intent(in out) :: wind_speed(:)
    integer :: fileunit
    integer :: n, nm
    if (allocated(time)) deallocate(time)
    if (allocated(wind_speed)) deallocate(wind_speed)
    nm = num_records(filename)
    allocate(time(nm), wind_speed(nm))
    open(newunit=fileunit, file=filename)
    do n = 1, nm
      read(unit=fileunit, fmt=*, end=1) time(n), wind_speed(n)
    end do
    1 continue
    close(unit=fileunit)
  end subroutine read_buoy

end module mod_io
