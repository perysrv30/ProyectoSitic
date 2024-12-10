export enum eScreenStatus {
    None,
    Adding,
    Updating,
    ViewDetail,
    Delete
}

export enum eErrorType {
    None,
    NotFound,
    FormatError,
    SqlError,
    ValidationError,
    ConnectionError,
    TimeoutError,
    ConflictError,
    UnkownError
}