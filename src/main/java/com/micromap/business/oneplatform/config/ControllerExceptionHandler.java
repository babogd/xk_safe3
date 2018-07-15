package com.micromap.business.oneplatform.config;

import com.micromap.business.oneplatform.utils.ApiResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 异常的统一处理
 *
 * @author limeng 2018/01/08
 */
@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        ex.printStackTrace();
        return ApiResult.error("拒绝访问，请检查是否拥有相应权限！", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
        ex.printStackTrace();
        ex.printStackTrace();
        return ApiResult.error("未授权访问，请提供认证凭据或检查凭据的有效性！", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    public ResponseEntity handleUsernameNotFoundException(UsernameNotFoundException ex, WebRequest request) {
        ex.printStackTrace();
        return ApiResult.error("用户信息获取失败！", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    public ResponseEntity handleHttpMessageNotReadableException(HttpMessageNotReadableException ex, WebRequest request) {
        ex.printStackTrace();
        return ApiResult.error("提交的数据格式不正确，请检查！", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity handleMethodArgumentNotValid(MethodArgumentNotValidException ex, WebRequest request) {
        ex.printStackTrace();
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        final List<String> errors = fieldErrors
                .stream()
                .map(fieldError -> fieldError.getField() + fieldError.getDefaultMessage())
                .collect(Collectors.toList());
        return ApiResult.error("提交的数据不符合验证规则，请检查！", HttpStatus.BAD_REQUEST, errors);
    }
}