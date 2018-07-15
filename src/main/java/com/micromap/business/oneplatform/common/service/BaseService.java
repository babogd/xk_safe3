package com.micromap.business.oneplatform.common.service;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

public interface BaseService<T> {

    Optional<T> findOne(Long id);

    Optional<T> findOne(Predicate var1);

    boolean existsById(Long id);

    boolean exists(Predicate var1);

    long count();

    long count(Predicate var1);

    Iterable<T> findAllById(Iterable<Long> ids);

    Iterable<T> findAll();

    Iterable<T> findAll(Sort sort);

    Page<T> findAll(Pageable pageable);

    Iterable<T> findAll(Predicate var1);

    Iterable<T> findAll(Predicate var1, Sort var2);

    Iterable<T> findAll(Predicate var1, OrderSpecifier... var2);

    Iterable<T> findAll(OrderSpecifier... var1);

    <S extends T> Iterable<S> findAll(Example<S> example);

    <S extends T> Iterable<S> findAll(Example<S> example, Sort sort);

    <S extends T> Page<S> findAll(Example<S> example, Pageable pageable);

    Page<T> findAll(Predicate var1, Pageable var2);

    <S extends T> S saveAndFlush(S entity);

    <S extends T> S save(S entity);

    <S extends T> Iterable<S> saveAll(Iterable<S> entities);

    void deleteInBatch(Iterable<T> entities);

    void deleteById(Long id);

    void deleteAllInBatch();

    void flush();

}
