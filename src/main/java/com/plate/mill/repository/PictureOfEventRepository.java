package com.plate.mill.repository;

import com.plate.mill.domain.PictureOfEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PictureOfEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PictureOfEventRepository extends JpaRepository<PictureOfEvent, Long> {

}
