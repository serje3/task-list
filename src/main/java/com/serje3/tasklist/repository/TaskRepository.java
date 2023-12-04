package com.serje3.tasklist.repository;

import com.serje3.tasklist.entities.Task;
import com.serje3.tasklist.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends CrudRepository<Task, UUID> {
    Optional<List<Task>> findTasksByUser_IdOrderByCreatedAtDesc(UUID userId);

    Optional<List<Task>> findTasksByIdInAndUser_Id(List<UUID> ids, UUID userId);
}
