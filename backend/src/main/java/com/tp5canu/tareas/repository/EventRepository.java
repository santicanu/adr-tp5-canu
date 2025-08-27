package com.tp5canu.tareas.repository;

import com.tp5canu.tareas.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findAllByEliminatedFalse();
    Event findByIdAndEliminatedFalse(Long id);
}