package com.micromap.business.oneplatform.common.entity;

import com.mitchellbosecke.pebble.extension.Function;
import com.mitchellbosecke.pebble.template.EvaluationContext;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.validation.BindingResult;

public abstract class BaseResultFunction implements Function {
    protected static final String PARAM_FIELD_NAME = "fieldName";
    protected static final String PARAM_FORM_NAME = "formName";
    private final List<String> argumentNames = new ArrayList();

    protected BaseResultFunction(String... argumentsName) {
        Collections.addAll(this.argumentNames, argumentsName);
    }

    public List<String> getArgumentNames() {
        return this.argumentNames;
    }

    protected Object getBindingResult(String formName, EvaluationContext context) {
        String attribute = formName;
        return context.getScopeChain().get(attribute);
    }
}