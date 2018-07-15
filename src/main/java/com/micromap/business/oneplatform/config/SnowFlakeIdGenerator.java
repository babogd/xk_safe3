package com.micromap.business.oneplatform.config;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

/**
 * @author limeng 2018/01/04
 */
public class SnowFlakeIdGenerator implements IdentifierGenerator {

    private IdGenerator worker = new IdGenerator();

    @Override
    public Serializable generate(SharedSessionContractImplementor sessionImplementor, Object o) throws HibernateException {
        return worker.nextId();
    }
}
