package com.serje3.tasklist.exceptions;

public class TasksNotFoundException extends TasksException{
    public TasksNotFoundException(String msg) {
        super(msg);
    }

    public TasksNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
