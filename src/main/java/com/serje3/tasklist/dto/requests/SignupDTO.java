package com.serje3.tasklist.dto.requests;

import lombok.Data;

@Data
public class SignupDTO {
    private String username;
    private String password1;
    private String password2;
}
