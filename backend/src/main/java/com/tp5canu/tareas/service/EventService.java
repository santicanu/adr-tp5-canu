package com.tp5canu.tareas.service;

import com.tp5canu.tareas.model.Event;
import com.tp5canu.tareas.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAll() {
        return eventRepository.findAllByEliminatedFalse();
    }

    public Event getById(Long id) {
        return eventRepository.findByIdAndEliminatedFalse(id);
    }

    public Event save(Event event) {
        event.setEliminated(false);
        return eventRepository.save(event);
    }

    public Event update(Long id, Event eventUpdated) {
        Event existingEvent = getById(id);
        
        // Update the fields
        existingEvent.setTitle(eventUpdated.getTitle());
        existingEvent.setDescription(eventUpdated.getDescription());
        existingEvent.setStartDate(eventUpdated.getStartDate());
        existingEvent.setStartTime(eventUpdated.getStartTime());
        existingEvent.setEndDate(eventUpdated.getEndDate());
        existingEvent.setEndTime(eventUpdated.getEndTime());
        existingEvent.setStatus(eventUpdated.getStatus());
        
        // Save and return the updated event
        return save(existingEvent);
    }

    public void delete(Long id) {
        Event event = findById(id);
        event.setEliminated(true);
        eventRepository.save(event);
    }

    public Event findById(Long id){
        return eventRepository.findByIdAndEliminatedFalse(id);
    }
}