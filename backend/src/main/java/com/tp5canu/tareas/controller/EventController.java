package com.tp5canu.tareas.controller;

import com.tp5canu.tareas.model.Event;
import com.tp5canu.tareas.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins = "http://localhost:5173")  // Habilita CORS desde tu frontend
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAll() {
        return eventService.getAll();
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable Long id) {
        return eventService.getById(id);
    }

    @PostMapping
    public Event save(@RequestBody Event event) {
        return eventService.save(event);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @RequestBody Event eventUpdated) {
        return eventService.getById(id).map(event -> {
            event.setTitulo(eventUpdated.getTitulo());
            event.setDescripcion(eventUpdated.getDescripcion());
            event.setFechaInicio(eventUpdated.getFechaInicio());
            event.setHoraInicio(eventUpdated.getHoraInicio());
            event.setFechaFin(eventUpdated.getFechaFin());
            event.setHoraFin(eventUpdated.getHoraFin());
            event.setCompletada(eventUpdated.isCompletada());
            return eventService.save(event);
        }).orElseThrow();
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        eventService.delete(id);
    }
}