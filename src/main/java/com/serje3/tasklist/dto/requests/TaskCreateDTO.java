package com.serje3.tasklist.dto.requests;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class TaskCreateDTO {
    private String content;
}
