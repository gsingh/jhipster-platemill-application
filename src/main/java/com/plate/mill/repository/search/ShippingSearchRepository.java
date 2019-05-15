package com.plate.mill.repository.search;

import com.plate.mill.domain.Shipping;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Shipping} entity.
 */
public interface ShippingSearchRepository extends ElasticsearchRepository<Shipping, Long> {
}
