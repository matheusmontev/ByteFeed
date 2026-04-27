package com.gustavoanjos.ByteFeedBackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_name", nullable = false)
    private String authorName;

    @Column(name = "author_handle", nullable = false)
    private String authorHandle;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(length = 1024)
    private String avatar;

    @Column(nullable = false)
    private Integer comments = 0;

    @Column(nullable = false)
    private Integer retweets = 0;

    @Column(nullable = false)
    private Integer likes = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}
