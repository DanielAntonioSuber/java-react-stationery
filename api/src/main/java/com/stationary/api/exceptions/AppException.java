package com.stationary.api.exceptions;

import org.springframework.http.HttpStatus;

public class AppException extends RuntimeException {


    public AppException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    private final HttpStatus httpStatus;
}
