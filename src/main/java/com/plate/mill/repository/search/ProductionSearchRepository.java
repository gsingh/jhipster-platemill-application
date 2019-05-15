package com.plate.mill.repository.search;

import com.plate.mill.domain.Production;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Production} entity.
 */
public interface ProductionSearchRepository extends ElasticsearchRepository<Production, Long> {
}
