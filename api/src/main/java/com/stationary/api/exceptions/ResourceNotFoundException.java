package com.stationary.api.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resourceName, String fieldname, String fieldvalue) {
        super(String.format("%s No found with: %s : '%s'", resourceName, fieldname, fieldvalue));
        this.resourceName = resourceName;
    }

    public String getResourceName() {
        return resourceName;
    }

    private final String resourceName;
}
