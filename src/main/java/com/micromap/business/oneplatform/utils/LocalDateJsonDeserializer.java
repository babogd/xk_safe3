package com.micromap.business.oneplatform.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
 
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
 
public class LocalDateJsonDeserializer extends JsonDeserializer<LocalDate> {
 
	@Override
	public LocalDate deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {


        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String dateStr = jp.getText();
        try {
            return LocalDate.parse(dateStr,df);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
	}
 
}