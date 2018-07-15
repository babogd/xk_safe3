package com.micromap.business.oneplatform.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * @author LiMeng 2017/8/19
 */
public class ApiResult<T> extends ResponseEntity<Result<T>> {

    private ApiResult(HttpStatus status, Result<T> result) {
        super(result, status);
    }

    public static <T> ApiResult<T> success() {
        return getResult(HttpStatus.OK, Result.Type.success, "操作成功", null);
    }

    public static <T> ApiResult<T> success(T data) {
        return getResult(HttpStatus.OK, Result.Type.success, "操作成功", data);
    }

    public static <T> ApiResult<T> success(String message) {
        return getResult(HttpStatus.OK, Result.Type.success, message, null);
    }

    public static <T> ApiResult<T> success(String message, T data) {
        return getResult(HttpStatus.OK, Result.Type.success, message, data);
    }

    public static <T> ApiResult<T> fail() {
        return getResult(HttpStatus.OK, Result.Type.fail, "操作失败", null);
    }

    public static <T> ApiResult<T> fail(T data) {
        return getResult(HttpStatus.OK, Result.Type.fail, "操作失败", data);
    }

    public static <T> ApiResult<T> fail(String message) {
        return getResult(HttpStatus.OK, Result.Type.fail, message, null);
    }

    public static <T> ApiResult<T> fail(String message, T data) {
        return getResult(HttpStatus.OK, Result.Type.fail, message, data);
    }

    public static <T> ApiResult<T> error(String message) {
        return getResult(HttpStatus.BAD_REQUEST, Result.Type.error, message, null);
    }

    public static <T> ApiResult<T> error(String message, HttpStatus status) {
        return getResult(status, Result.Type.error, message, null);
    }

    public static <T> ApiResult<T> error(String message, HttpStatus status, T data) {
        return getResult(status, Result.Type.error, message, data);
    }

    private static <T> ApiResult<T> getResult(HttpStatus status, Result.Type type, String message, T data) {
        return new ApiResult<>(status, new Result<>(type, message, data, status.value()));
    }
}
