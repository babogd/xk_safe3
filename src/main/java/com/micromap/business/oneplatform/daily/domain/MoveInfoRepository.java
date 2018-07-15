package com.micromap.business.oneplatform.daily.domain;

import com.micromap.business.oneplatform.common.domain.BaseRepository;
import com.micromap.business.oneplatform.daily.entity.HiddenDanger;
import com.micromap.business.oneplatform.daily.entity.MoveInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Repository
public interface MoveInfoRepository extends BaseRepository<MoveInfo> {


}
