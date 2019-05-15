package com.plate.mill.web.rest;

import com.plate.mill.domain.PictureOfEvent;
import com.plate.mill.repository.PictureOfEventRepository;
import com.plate.mill.repository.search.PictureOfEventSearchRepository;
import com.plate.mill.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.plate.mill.domain.PictureOfEvent}.
 */
@RestController
@RequestMapping("/api")
public class PictureOfEventResource {

    private final Logger log = LoggerFactory.getLogger(PictureOfEventResource.class);

    private static final String ENTITY_NAME = "pictureOfEvent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PictureOfEventRepository pictureOfEventRepository;

    private final PictureOfEventSearchRepository pictureOfEventSearchRepository;

    public PictureOfEventResource(PictureOfEventRepository pictureOfEventRepository, PictureOfEventSearchRepository pictureOfEventSearchRepository) {
        this.pictureOfEventRepository = pictureOfEventRepository;
        this.pictureOfEventSearchRepository = pictureOfEventSearchRepository;
    }

    /**
     * {@code POST  /picture-of-events} : Create a new pictureOfEvent.
     *
     * @param pictureOfEvent the pictureOfEvent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pictureOfEvent, or with status {@code 400 (Bad Request)} if the pictureOfEvent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/picture-of-events")
    public ResponseEntity<PictureOfEvent> createPictureOfEvent(@Valid @RequestBody PictureOfEvent pictureOfEvent) throws URISyntaxException {
        log.debug("REST request to save PictureOfEvent : {}", pictureOfEvent);
        if (pictureOfEvent.getId() != null) {
            throw new BadRequestAlertException("A new pictureOfEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PictureOfEvent result = pictureOfEventRepository.save(pictureOfEvent);
        pictureOfEventSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/picture-of-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /picture-of-events} : Updates an existing pictureOfEvent.
     *
     * @param pictureOfEvent the pictureOfEvent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pictureOfEvent,
     * or with status {@code 400 (Bad Request)} if the pictureOfEvent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pictureOfEvent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/picture-of-events")
    public ResponseEntity<PictureOfEvent> updatePictureOfEvent(@Valid @RequestBody PictureOfEvent pictureOfEvent) throws URISyntaxException {
        log.debug("REST request to update PictureOfEvent : {}", pictureOfEvent);
        if (pictureOfEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PictureOfEvent result = pictureOfEventRepository.save(pictureOfEvent);
        pictureOfEventSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pictureOfEvent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /picture-of-events} : get all the pictureOfEvents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pictureOfEvents in body.
     */
    @GetMapping("/picture-of-events")
    public List<PictureOfEvent> getAllPictureOfEvents() {
        log.debug("REST request to get all PictureOfEvents");
        return pictureOfEventRepository.findAll();
    }

    /**
     * {@code GET  /picture-of-events/:id} : get the "id" pictureOfEvent.
     *
     * @param id the id of the pictureOfEvent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pictureOfEvent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/picture-of-events/{id}")
    public ResponseEntity<PictureOfEvent> getPictureOfEvent(@PathVariable Long id) {
        log.debug("REST request to get PictureOfEvent : {}", id);
        Optional<PictureOfEvent> pictureOfEvent = pictureOfEventRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pictureOfEvent);
    }

    /**
     * {@code DELETE  /picture-of-events/:id} : delete the "id" pictureOfEvent.
     *
     * @param id the id of the pictureOfEvent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/picture-of-events/{id}")
    public ResponseEntity<Void> deletePictureOfEvent(@PathVariable Long id) {
        log.debug("REST request to delete PictureOfEvent : {}", id);
        pictureOfEventRepository.deleteById(id);
        pictureOfEventSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/picture-of-events?query=:query} : search for the pictureOfEvent corresponding
     * to the query.
     *
     * @param query the query of the pictureOfEvent search.
     * @return the result of the search.
     */
    @GetMapping("/_search/picture-of-events")
    public List<PictureOfEvent> searchPictureOfEvents(@RequestParam String query) {
        log.debug("REST request to search PictureOfEvents for query {}", query);
        return StreamSupport
            .stream(pictureOfEventSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
