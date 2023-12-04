package com.serje3.tasklist.services;

import com.serje3.tasklist.entities.SharedTask;
import com.serje3.tasklist.entities.Task;
import com.serje3.tasklist.entities.User;
import com.serje3.tasklist.exceptions.SharedTasksNotFoundException;
import com.serje3.tasklist.exceptions.TasksNotFoundException;
import com.serje3.tasklist.repository.SharedTaskRepository;
import com.serje3.tasklist.repository.TaskRepository;
import com.serje3.tasklist.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final SharedTaskRepository sharedTaskRepository;

    public List<Task> getTasksByUserId(UUID userId) throws TasksNotFoundException {
        return taskRepository.findTasksByUser_IdOrderByCreatedAtDesc(userId).orElseThrow(() ->
                new TasksNotFoundException("Tasks not found by user id"));
    }

    public Task createTask(String content, UUID id) {
        Task newTask = Task.builder()
                .content(content)
                .user(userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found")))
                .build();
        return taskRepository.save(newTask);
    }

    /**
     * Share tasks with a user identified by a unique ID.
     *
     * @param taskIds the list of task IDs to be shared
     * @param userId  the ID of the user who is sharing the tasks
     * @return the ID of the sharing list that contains the tasks
     */
    public UUID shareTasks(List<UUID> taskIds, UUID userId) throws TasksNotFoundException {
        List<Task> tasksFounded = taskRepository.findTasksByIdInAndUser_Id(taskIds, userId).orElseThrow(() ->
                new TasksNotFoundException("Tasks not founded"));
        if (tasksFounded.isEmpty()) {
            throw new TasksNotFoundException("Tasks not founded");
        }
        List<SharedTask> sharedTasks = new ArrayList<>();
        UUID sharedId = UUID.randomUUID();
        tasksFounded.forEach(task -> {
            sharedTasks.add(SharedTask.builder()
                    .sharedId(sharedId)
                    .task(task)
                    .build());
        });
        sharedTaskRepository.saveAll(sharedTasks);
        return sharedId;
    }

    public List<Task> getSharedTasks(UUID sharedId) throws SharedTasksNotFoundException {
        List<SharedTask> sharedTasks = sharedTaskRepository.findSharedTasksBySharedId(sharedId).orElse(new ArrayList<>());

        if (sharedTasks.isEmpty()) {
            throw new SharedTasksNotFoundException("Incorrect shared id");
        }

        List<Task> tasks = new ArrayList<>();
        sharedTasks.forEach(sharedTask -> tasks.add(sharedTask.getTask()));
        tasks.sort(Comparator.comparing(Task::getCreatedAt).reversed());
        return tasks;
    }
}
