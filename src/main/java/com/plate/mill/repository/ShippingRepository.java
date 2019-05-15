package com.plate.mill.repository;

import com.plate.mill.domain.Shipping;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Shipping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Long> {

}
