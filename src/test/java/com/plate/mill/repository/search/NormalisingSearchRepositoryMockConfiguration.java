package com.plate.mill.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link NormalisingSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class NormalisingSearchRepositoryMockConfiguration {

    @MockBean
    private NormalisingSearchRepository mockNormalisingSearchRepository;

}
