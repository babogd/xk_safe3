package com.micromap.business.oneplatform.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.micromap.business.oneplatform.system.entity.User;

import java.io.IOException;

/**
 * @author limeng 2018/7/5
 */
public class UserIgnoreSerializer extends JsonSerializer<User> {

    @Override
    public void serialize(User user
            , JsonGenerator jsonGenerator
            , SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", user.getId());
        jsonGenerator.writeStringField("userName", user.getUserName());
        jsonGenerator.writeStringField("loginName", user.getLoginName());
        if (user.getDept() != null) {
            jsonGenerator.writeNumberField("deptId", user.getDept().getId());
            jsonGenerator.writeStringField("deptName", user.getDept().getDeptName());
        }
        jsonGenerator.writeEndObject();
    }
}
