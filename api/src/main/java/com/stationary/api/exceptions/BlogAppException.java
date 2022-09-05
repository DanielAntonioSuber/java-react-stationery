package com.stationary.api.exceptions;

import org.springframework.http.HttpStatus;

public class BlogAppException extends RuntimeException {


    public BlogAppException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    private final HttpStatus httpStatus;
}
