package com.example.travelJournal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "didShare")
public class DidShare {

    @Id
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private TJUser user;

    @Id
    @ManyToOne
    @JoinColumn(name = "postId", nullable = false)
    private SharedPost post;

    public TJUser getUser() {
        return user;
    }

    public void setUser(TJUser user) {
        this.user = user;
    }

    public SharedPost getPost() {
        return post;
    }

    public void setPost(SharedPost post) {
        this.post = post;
    }
}