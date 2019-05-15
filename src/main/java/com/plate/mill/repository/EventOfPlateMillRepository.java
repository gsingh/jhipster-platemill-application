package com.plate.mill.repository;

import com.plate.mill.domain.EventOfPlateMill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EventOfPlateMill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventOfPlateMillRepository extends JpaRepository<EventOfPlateMill, Long> {

}
