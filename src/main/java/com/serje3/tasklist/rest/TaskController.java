package com.serje3.tasklist.rest;

import com.serje3.tasklist.dto.UserPrincipal;
import com.serje3.tasklist.dto.requests.ShareTasksDTO;
import com.serje3.tasklist.dto.requests.TaskCreateDTO;
import com.serje3.tasklist.entities.Task;
import com.serje3.tasklist.exceptions.SharedTasksNotFoundException;
import com.serje3.tasklist.exceptions.TasksNotFoundException;
import com.serje3.tasklist.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping()
    public ResponseEntity<List<Task>> getTasks(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            return ResponseEntity.ok(taskService.getTasksByUserId(userPrincipal.getId()));
        } catch (TasksNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping()
    public ResponseEntity<Task> createTask(
            @RequestBody TaskCreateDTO taskCreateDTO,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(taskService.createTask(taskCreateDTO.getContent(), userPrincipal.getId()));
    }

    @PostMapping("/share")
    public ResponseEntity<UUID> shareTasks(
            @RequestBody ShareTasksDTO shareTasksDTO,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            return ResponseEntity.ok(taskService.shareTasks(shareTasksDTO.getTasks(), userPrincipal.getId()));
        } catch (TasksNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/share/{sharedId}")
    public ResponseEntity<List<Task>> getSharedTasks(
            @PathVariable("sharedId") UUID sharedId
    ) {
        try {
            return ResponseEntity.ok(taskService.getSharedTasks(sharedId));
        } catch (SharedTasksNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
