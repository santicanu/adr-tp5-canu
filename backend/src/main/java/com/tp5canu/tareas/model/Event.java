package com.tp5canu.tareas.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descripcion;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private LocalTime horaInicio;

    private LocalTime horaFin;

    private boolean completada;

    private boolean eliminada;
}
