package com.serje3.tasklist.dto.requests;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ShareTasksDTO {
    private List<UUID> tasks;
}
