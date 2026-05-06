package com.gustavoanjos.ByteFeedBackend.web.dto;

public record AuthResponse(
        String token,
        String name,
        String handle,
        String avatarUrl
) {}
