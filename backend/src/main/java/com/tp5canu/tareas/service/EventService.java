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
        return eventRepository.findAllByEliminadoFalse();
    }

    public Event getById(Long id) {
        return eventRepository.findByIdAndEliminadoFalse(id);
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public void delete(Long id) {
        Event event = findById(id);
        event.setEliminada(true);
        eventRepository.save(event);
    }

    public Event findById(Long id){
        return eventRepository.findByIdAndEliminadoFalse(id);
    }
}