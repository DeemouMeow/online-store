export default class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static badRequest(message) {
        return new ApiError(404, message);
    }

    static internal() {
        return new ApiError(500, "Internal error");
    }
}