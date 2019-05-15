package com.plate.mill.repository.search;

import com.plate.mill.domain.ShiftManager;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ShiftManager} entity.
 */
public interface ShiftManagerSearchRepository extends ElasticsearchRepository<ShiftManager, Long> {
}
