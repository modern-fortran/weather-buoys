module mod_arrays

  ! Utility functions that operate on arrays.

  implicit none

  private
  public :: denan, mean

contains

  pure function denan(x)
    ! Given input array x, returns an array
    ! of elements that exclude NaNs.
    use ieee_arithmetic, only: ieee_is_nan
    real, allocatable, intent(in) :: x(:)
    real, allocatable :: denan(:)
    denan = pack(x, .not. ieee_is_nan(x))
  end function denan

  pure real function mean(x)
    ! Returns a mean of x.
    real, allocatable, intent(in) :: x(:)
    mean = sum(x) / size(x)
  end function mean

end module mod_arrays
