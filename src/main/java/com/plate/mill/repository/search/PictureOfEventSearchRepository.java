package com.plate.mill.repository.search;

import com.plate.mill.domain.PictureOfEvent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link PictureOfEvent} entity.
 */
public interface PictureOfEventSearchRepository extends ElasticsearchRepository<PictureOfEvent, Long> {
}
