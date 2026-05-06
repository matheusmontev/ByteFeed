package com.gustavoanjos.ByteFeedBackend.web.dto;

public record LoginRequest(
        String email,
        String password
) {}
