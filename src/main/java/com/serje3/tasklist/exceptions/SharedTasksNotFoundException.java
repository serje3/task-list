package com.serje3.tasklist.exceptions;

public class SharedTasksNotFoundException extends TasksException {
    public SharedTasksNotFoundException(String msg) {
        super(msg);
    }

    public SharedTasksNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
