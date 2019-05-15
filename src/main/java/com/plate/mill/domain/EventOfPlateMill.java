package com.plate.mill.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A EventOfPlateMill.
 */
@Entity
@Table(name = "event_of_plate_mill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "eventofplatemill")
public class EventOfPlateMill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @NotNull
    @Column(name = "event_name", nullable = false)
    private String eventName;

    @OneToMany(mappedBy = "eventPM")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PictureOfEvent> pictureOfEvents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public EventOfPlateMill eventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventName() {
        return eventName;
    }

    public EventOfPlateMill eventName(String eventName) {
        this.eventName = eventName;
        return this;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Set<PictureOfEvent> getPictureOfEvents() {
        return pictureOfEvents;
    }

    public EventOfPlateMill pictureOfEvents(Set<PictureOfEvent> pictureOfEvents) {
        this.pictureOfEvents = pictureOfEvents;
        return this;
    }

    public EventOfPlateMill addPictureOfEvent(PictureOfEvent pictureOfEvent) {
        this.pictureOfEvents.add(pictureOfEvent);
        pictureOfEvent.setEventPM(this);
        return this;
    }

    public EventOfPlateMill removePictureOfEvent(PictureOfEvent pictureOfEvent) {
        this.pictureOfEvents.remove(pictureOfEvent);
        pictureOfEvent.setEventPM(null);
        return this;
    }

    public void setPictureOfEvents(Set<PictureOfEvent> pictureOfEvents) {
        this.pictureOfEvents = pictureOfEvents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EventOfPlateMill)) {
            return false;
        }
        return id != null && id.equals(((EventOfPlateMill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EventOfPlateMill{" +
            "id=" + getId() +
            ", eventDate='" + getEventDate() + "'" +
            ", eventName='" + getEventName() + "'" +
            "}";
    }
}
