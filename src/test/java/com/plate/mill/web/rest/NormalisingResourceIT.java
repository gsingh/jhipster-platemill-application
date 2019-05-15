package com.plate.mill.web.rest;

import com.plate.mill.PlatemillApp;
import com.plate.mill.domain.Normalising;
import com.plate.mill.repository.NormalisingRepository;
import com.plate.mill.repository.search.NormalisingSearchRepository;
import com.plate.mill.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static com.plate.mill.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.plate.mill.domain.enumeration.Shift;
/**
 * Integration tests for the {@Link NormalisingResource} REST controller.
 */
@SpringBootTest(classes = PlatemillApp.class)
public class NormalisingResourceIT {

    private static final LocalDate DEFAULT_NORMALISING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NORMALISING_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Shift DEFAULT_SHIFT = Shift.A;
    private static final Shift UPDATED_SHIFT = Shift.B;

    private static final Integer DEFAULT_NO_OF_PLATES = 1;
    private static final Integer UPDATED_NO_OF_PLATES = 2;

    private static final Integer DEFAULT_NORMALISED_TONNAGE = 1;
    private static final Integer UPDATED_NORMALISED_TONNAGE = 2;

    @Autowired
    private NormalisingRepository normalisingRepository;

    /**
     * This repository is mocked in the com.plate.mill.repository.search test package.
     *
     * @see com.plate.mill.repository.search.NormalisingSearchRepositoryMockConfiguration
     */
    @Autowired
    private NormalisingSearchRepository mockNormalisingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restNormalisingMockMvc;

    private Normalising normalising;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NormalisingResource normalisingResource = new NormalisingResource(normalisingRepository, mockNormalisingSearchRepository);
        this.restNormalisingMockMvc = MockMvcBuilders.standaloneSetup(normalisingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Normalising createEntity(EntityManager em) {
        Normalising normalising = new Normalising()
            .normalisingDate(DEFAULT_NORMALISING_DATE)
            .shift(DEFAULT_SHIFT)
            .noOfPlates(DEFAULT_NO_OF_PLATES)
            .normalisedTonnage(DEFAULT_NORMALISED_TONNAGE);
        return normalising;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Normalising createUpdatedEntity(EntityManager em) {
        Normalising normalising = new Normalising()
            .normalisingDate(UPDATED_NORMALISING_DATE)
            .shift(UPDATED_SHIFT)
            .noOfPlates(UPDATED_NO_OF_PLATES)
            .normalisedTonnage(UPDATED_NORMALISED_TONNAGE);
        return normalising;
    }

    @BeforeEach
    public void initTest() {
        normalising = createEntity(em);
    }

    @Test
    @Transactional
    public void createNormalising() throws Exception {
        int databaseSizeBeforeCreate = normalisingRepository.findAll().size();

        // Create the Normalising
        restNormalisingMockMvc.perform(post("/api/normalisings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normalising)))
            .andExpect(status().isCreated());

        // Validate the Normalising in the database
        List<Normalising> normalisingList = normalisingRepository.findAll();
        assertThat(normalisingList).hasSize(databaseSizeBeforeCreate + 1);
        Normalising testNormalising = normalisingList.get(normalisingList.size() - 1);
        assertThat(testNormalising.getNormalisingDate()).isEqualTo(DEFAULT_NORMALISING_DATE);
        assertThat(testNormalising.getShift()).isEqualTo(DEFAULT_SHIFT);
        assertThat(testNormalising.getNoOfPlates()).isEqualTo(DEFAULT_NO_OF_PLATES);
        assertThat(testNormalising.getNormalisedTonnage()).isEqualTo(DEFAULT_NORMALISED_TONNAGE);

        // Validate the Normalising in Elasticsearch
        verify(mockNormalisingSearchRepository, times(1)).save(testNormalising);
    }

    @Test
    @Transactional
    public void createNormalisingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = normalisingRepository.findAll().size();

        // Create the Normalising with an existing ID
        normalising.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNormalisingMockMvc.perform(post("/api/normalisings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normalising)))
            .andExpect(status().isBadRequest());

        // Validate the Normalising in the database
        List<Normalising> normalisingList = normalisingRepository.findAll();
        assertThat(normalisingList).hasSize(databaseSizeBeforeCreate);

        // Validate the Normalising in Elasticsearch
        verify(mockNormalisingSearchRepository, times(0)).save(normalising);
    }


    @Test
    @Transactional
    public void checkNormalisingDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = normalisingRepository.findAll().size();
        // set the field null
        normalising.setNormalisingDate(null);

        // Create the Normalising, which fails.

        restNormalisingMockMvc.perform(post("/api/normalisings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normalising)))
            .andExpect(status().isBadRequest());

        List<Normalising> normalisingList = normalisingRepository.findAll();
        assertThat(normalisingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkShiftIsRequired() throws Exception {
        int databaseSizeBeforeTest = normalisingRepository.findAll().size();
        // set the field null
        normalising.setShift(null);

        // Create the Normalising, which fails.

        restNormalisingMockMvc.perform(post("/api/normalisings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normalising)))
            .andExpect(status().isBadRequest());

        List<Normalising> normalisingList = normalisingRepository.findAll();
        assertThat(normalisingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNormalisings() throws Exception {
        // Initialize the database
        normalisingRepository.saveAndFlush(normalising);

        // Get all the normalisingList
        restNormalisingMockMvc.perform(get("/api/normalisings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(normalising.getId().intValue())))
            .andExpect(jsonPath("$.[*].normalisingDate").value(hasItem(DEFAULT_NORMALISING_DATE.toString())))
            .andExpect(jsonPath("$.[*].shift").value(hasItem(DEFAULT_SHIFT.toString())))
            .andExpect(jsonPath("$.[*].noOfPlates").value(hasItem(DEFAULT_NO_OF_PLATES)))
            .andExpect(jsonPath("$.[*].normalisedTonnage").value(hasItem(DEFAULT_NORMALISED_TONNAGE)));
    }
    
    @Test
    @Transactional
    public void getNormalising() throws Exception {
        // Initialize the database
        normalisingRepository.saveAndFlush(normalising);

        // Get the normalising
        restNormalisingMockMvc.perform(get("/api/normalisings/{id}", normalising.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(normalising.getId().intValue()))
            .andExpect(jsonPath("$.normalisingDate").value(DEFAULT_NORMALISING_DATE.toString()))
            .andExpect(jsonPath("$.shift").value(DEFAULT_SHIFT.toString()))
            .andExpect(jsonPath("$.noOfPlates").value(DEFAULT_NO_OF_PLATES))
            .andExpect(jsonPath("$.normalisedTonnage").value(DEFAULT_NORMALISED_TONNAGE));
    }

    @Test
    @Transactional
    public void getNonExistingNormalising() throws Exception {
        // Get the normalising
        restNormalisingMockMvc.perform(get("/api/normalisings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNormalising() throws Exception {
        // Initialize the database
        normalisingRepository.saveAndFlush(normalising);

        int databaseSizeBeforeUpdate = normalisingRepository.findAll().size();

        // Update the normalising
        Normalising updatedNormalising = normalisingRepository.findById(normalising.getId()).get();
        // Disconnect from session so that the updates on updatedNormalising are not directly saved in db
        em.detach(updatedNormalising);
        updatedNormalising
            .normalisingDate(UPDATED_NORMALISING_DATE)
            .shift(UPDATED_SHIFT)
            .noOfPlates(UPDATED_NO_OF_PLATES)
            .normalisedTonnage(UPDATED_NORMALISED_TONNAGE);

        restNormalisingMockMvc.perform(put("/api/normalisings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNormalising)))
            .andExpect(status().isOk());

        // Validate the Normalising in the database
        List<Normalising> normalisingList = normalisingRepository.findAll();
        assertThat(normalisingList).hasSize(databaseSizeBeforeUpdate);
        Normalising testNormalising = normalisingList.get(normalisingList.size() - 1);
        assertThat(testNormalising.getNormalisingDate()).isEqualTo(UPDATED_NORMALISING_DATE);
        assertThat(testNormalising.getShift()).isEqualTo(UPDATED_SHIFT);
        assertThat(testNormalising.getNoOfPlates()).isEqualTo(UPDATED_NO_OF_PLATES);
        assertThat(testNormalising.getNormalisedTonnage()).isEqualTo(UPDATED_NORMALISED_TONNAGE);

        // Validate the Normalising in Elasticsearch
        verify(mockNormalisingSearchRepository, times(1)).save(testNormalising);
    }

    @Test
    @Transactional
    public void updateNonExistingNormalising() throws Exception {
        int databaseSizeBeforeUpdate = normalisingRepository.findAll().size();

        // Create the Normalising

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNormalisingMockMvc.perform(put("/api/normalisings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normalising)))
            .andExpect(status().isBadRequest());

        // Validate the Normalising in the database
        List<Normalising> normalisingList = normalisingRepository.findAll();
        assertThat(normalisingList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Normalising in Elasticsearch
        verify(mockNormalisingSearchRepository, times(0)).save(normalising);
    }

    @Test
    @Transactional
    public void deleteNormalising() throws Exception {
        // Initialize the database
        normalisingRepository.saveAndFlush(normalising);

        int databaseSizeBeforeDelete = normalisingRepository.findAll().size();

        // Delete the normalising
        restNormalisingMockMvc.perform(delete("/api/normalisings/{id}", normalising.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Normalising> normalisingList = normalisingRepository.findAll();
        assertThat(normalisingList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Normalising in Elasticsearch
        verify(mockNormalisingSearchRepository, times(1)).deleteById(normalising.getId());
    }

    @Test
    @Transactional
    public void searchNormalising() throws Exception {
        // Initialize the database
        normalisingRepository.saveAndFlush(normalising);
        when(mockNormalisingSearchRepository.search(queryStringQuery("id:" + normalising.getId())))
            .thenReturn(Collections.singletonList(normalising));
        // Search the normalising
        restNormalisingMockMvc.perform(get("/api/_search/normalisings?query=id:" + normalising.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(normalising.getId().intValue())))
            .andExpect(jsonPath("$.[*].normalisingDate").value(hasItem(DEFAULT_NORMALISING_DATE.toString())))
            .andExpect(jsonPath("$.[*].shift").value(hasItem(DEFAULT_SHIFT.toString())))
            .andExpect(jsonPath("$.[*].noOfPlates").value(hasItem(DEFAULT_NO_OF_PLATES)))
            .andExpect(jsonPath("$.[*].normalisedTonnage").value(hasItem(DEFAULT_NORMALISED_TONNAGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Normalising.class);
        Normalising normalising1 = new Normalising();
        normalising1.setId(1L);
        Normalising normalising2 = new Normalising();
        normalising2.setId(normalising1.getId());
        assertThat(normalising1).isEqualTo(normalising2);
        normalising2.setId(2L);
        assertThat(normalising1).isNotEqualTo(normalising2);
        normalising1.setId(null);
        assertThat(normalising1).isNotEqualTo(normalising2);
    }
}
