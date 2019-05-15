package com.plate.mill.repository.search;

import com.plate.mill.domain.Normalising;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Normalising} entity.
 */
public interface NormalisingSearchRepository extends ElasticsearchRepository<Normalising, Long> {
}
