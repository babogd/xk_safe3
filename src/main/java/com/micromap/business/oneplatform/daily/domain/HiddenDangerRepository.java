package com.micromap.business.oneplatform.daily.domain;

import com.micromap.business.oneplatform.common.domain.BaseRepository;
import com.micromap.business.oneplatform.daily.entity.HiddenDanger;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Repository
public interface HiddenDangerRepository extends BaseRepository<HiddenDanger> {

    @Query(nativeQuery = true, value = "select t.* from C_HD_HIDDENDANGERINFO t ")
    List<HiddenDanger> findAllDanger(@RequestBody HiddenDanger hiddenDanger);

}
