package com.plate.mill.repository.search;

import com.plate.mill.domain.EventOfPlateMill;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EventOfPlateMill} entity.
 */
public interface EventOfPlateMillSearchRepository extends ElasticsearchRepository<EventOfPlateMill, Long> {
}
