package com.plate.mill.repository;

import com.plate.mill.domain.HeavyPlateFinished;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HeavyPlateFinished entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HeavyPlateFinishedRepository extends JpaRepository<HeavyPlateFinished, Long> {

}
