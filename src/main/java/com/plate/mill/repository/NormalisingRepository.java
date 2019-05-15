package com.plate.mill.repository;

import com.plate.mill.domain.Normalising;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Normalising entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NormalisingRepository extends JpaRepository<Normalising, Long> {

}
