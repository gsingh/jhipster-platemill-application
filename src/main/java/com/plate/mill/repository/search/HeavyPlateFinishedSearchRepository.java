package com.plate.mill.repository.search;

import com.plate.mill.domain.HeavyPlateFinished;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link HeavyPlateFinished} entity.
 */
public interface HeavyPlateFinishedSearchRepository extends ElasticsearchRepository<HeavyPlateFinished, Long> {
}
