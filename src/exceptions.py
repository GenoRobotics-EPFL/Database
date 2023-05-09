class GenoroboticsException(Exception):
    """
    Base excxeption
    """


class DeleteFailedException(GenoroboticsException):
    """
    Raised when a row can't be deleted as it would violate
    non-null constraints (i.e. when the id of the row is referenced
    somewhere else)
    """
