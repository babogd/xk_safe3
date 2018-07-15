package com.micromap.business.oneplatform.config;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * @author limeng 2018/5/21
 */
@Converter
public class StringToDateConverter implements AttributeConverter<Instant, String> {
    @Override
    public String convertToDatabaseColumn(Instant attribute) {
        return DateTimeFormatter.ofPattern("yyyyMMddHHmmss")
                .format(attribute.atZone(ZoneId.systemDefault()));
    }

    @Override
    public Instant convertToEntityAttribute(String dbData) {
        return DateTimeFormatter.ofPattern("yyyyMMddHHmmss")
                .withZone(ZoneId.systemDefault())
                .parse(dbData, Instant::from);
    }
}
