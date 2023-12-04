package com.serje3.tasklist.exceptions;

public class TasksException extends Exception{
    public TasksException(String msg) {
        super(msg);
    }

    /**
     * Constructs a {@code UsernameNotFoundException} with the specified message and root
     * cause.
     * @param msg the detail message.
     * @param cause root cause
     */
    public TasksException(String msg, Throwable cause) {
        super(msg, cause);
    }

}
