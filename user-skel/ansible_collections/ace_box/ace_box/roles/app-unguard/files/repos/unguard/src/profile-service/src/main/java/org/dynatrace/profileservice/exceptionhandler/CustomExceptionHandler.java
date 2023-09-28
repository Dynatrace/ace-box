package org.dynatrace.profileservice.exceptionhandler;

import org.dynatrace.profileservice.exceptions.BioNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(HttpServletRequest request, Exception e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(
            new ErrorResponse(
                status,
                e.getMessage(),
                request.getRequestURI()
            ),
            status
        );
    }

    @ExceptionHandler(BioNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleBioNotFoundException(HttpServletRequest request, Exception e) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        return new ResponseEntity<>(
            new ErrorResponse(
                status,
                e.getMessage(),
                request.getRequestURI()
            ),
            status
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpServletRequest request, HttpMessageNotReadableException e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(
            new ErrorResponse(
                status,
                e.getMessage(),
                request.getRequestURI()
            ),
            status
        );
    }

    // fallback method
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleExceptions(HttpServletRequest request, Exception e) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(
            new ErrorResponse(
                status,
                e.getMessage(),
                request.getRequestURI()
            ),
            status
        );
    }
}
