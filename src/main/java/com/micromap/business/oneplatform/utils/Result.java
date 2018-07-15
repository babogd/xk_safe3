package com.micromap.business.oneplatform.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author LiMeng 2017/8/14
 */
@Data
@AllArgsConstructor
public class Result<T> {
    public enum Type {
        success, fail, error
    }

    private final Type status;
    private final String message;
    private final T data;
    private final int code;
}
