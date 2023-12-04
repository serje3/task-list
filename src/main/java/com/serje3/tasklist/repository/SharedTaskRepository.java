package com.serje3.tasklist.repository;

import com.serje3.tasklist.entities.SharedTask;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SharedTaskRepository extends CrudRepository<SharedTask, UUID> {
    Optional<List<SharedTask>> findSharedTasksBySharedId(UUID sharedId);
}
