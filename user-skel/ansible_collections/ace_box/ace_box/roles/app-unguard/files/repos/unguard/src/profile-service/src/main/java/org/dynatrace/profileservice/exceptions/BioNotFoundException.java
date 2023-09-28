package org.dynatrace.profileservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Bio not found")
public class BioNotFoundException extends Exception {
    public BioNotFoundException(String message) {
        super(message);
    }
}
