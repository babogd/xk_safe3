package com.micromap.business.oneplatform.common.service.impl;

import com.micromap.business.oneplatform.common.domain.BaseRepository;
import com.micromap.business.oneplatform.common.service.BaseService;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

/**
 * @author limeng 2018/5/18
 */
public abstract class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    protected BaseRepository<T> baseRepository;

    @Override
    public Optional<T> findOne(Long id) {
        return baseRepository.findById(id);
    }

    @Override
    public Optional<T> findOne(Predicate predicate) {
        return baseRepository.findOne(predicate);
    }

    @Override
    public boolean existsById(Long id) {
        return baseRepository.existsById(id);
    }

    @Override
    public boolean exists(Predicate predicate) {
        return baseRepository.exists(predicate);
    }

    @Override
    public long count() {
        return baseRepository.count();
    }

    @Override
    public long count(Predicate predicate) {
        return baseRepository.count(predicate);
    }

    @Override
    public Iterable<T> findAll() {
        return baseRepository.findAll();
    }

    @Override
    public Iterable<T> findAll(Sort sort) {
        return baseRepository.findAll(sort);
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return baseRepository.findAll(pageable);
    }

    @Override
    public Iterable<T> findAll(Predicate predicate) {
        return baseRepository.findAll(predicate);
    }

    @Override
    public Iterable<T> findAll(Predicate predicate, Sort sort) {
        return baseRepository.findAll(predicate, sort);
    }

    @Override
    public Iterable<T> findAll(Predicate predicate, OrderSpecifier[] orderSpecifiers) {
        return baseRepository.findAll(predicate, orderSpecifiers);
    }

    @Override
    public Iterable<T> findAll(OrderSpecifier[] orderSpecifiers) {
        return baseRepository.findAll(orderSpecifiers);
    }

    @Override
    public Page<T> findAll(Predicate predicate, Pageable pageable) {
        return baseRepository.findAll(predicate, pageable);
    }

    @Override
    public <S extends T> Iterable<S> findAll(Example<S> example) {
        return baseRepository.findAll(example);
    }

    @Override
    public <S extends T> Iterable<S> findAll(Example<S> example, Sort sort) {
        return baseRepository.findAll(example, sort);
    }

    @Override
    public <S extends T> Page<S> findAll(Example<S> example, Pageable pageable) {
        return baseRepository.findAll(example, pageable);
    }

    @Override
    public void deleteInBatch(Iterable<T> entities) {
        baseRepository.deleteInBatch(entities);
    }

    @Override
    public void deleteById(Long id) {
        baseRepository.deleteById(id);
    }

    @Override
    public void deleteAllInBatch() {
        baseRepository.deleteAllInBatch();
    }

    @Override
    public void flush() {
        baseRepository.flush();
    }

    @Override
    public <S extends T> Iterable<S> saveAll(Iterable<S> entities) {
        return baseRepository.saveAll(entities);
    }

    @Override
    public <S extends T> S save(S entity) {
        return baseRepository.save(entity);
    }

    @Override
    public <S extends T> S saveAndFlush(S entity) {
        return baseRepository.saveAndFlush(entity);
    }

    @Override
    public Iterable<T> findAllById(Iterable<Long> ids) {
        return baseRepository.findAllById(ids);
    }
}
