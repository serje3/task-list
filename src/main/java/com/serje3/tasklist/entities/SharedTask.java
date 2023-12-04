package com.serje3.tasklist.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "tasks_shared")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedTask {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "shared_id")
    private UUID sharedId;

    @ManyToOne
    @JoinColumn(name = "task_id")
    @JsonBackReference
    private Task task;
}
