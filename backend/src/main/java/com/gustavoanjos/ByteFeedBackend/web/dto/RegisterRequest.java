package com.gustavoanjos.ByteFeedBackend.web.dto;

public record RegisterRequest(
        String name,
        String handle,
        String email,
        String password
) {}
