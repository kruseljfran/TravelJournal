package com.example.travelJournal.repository;

import com.example.travelJournal.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost_PostId(Long postId);
    List<Comment> findByUser_UserId(Long userId);
}
