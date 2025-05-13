package com.example.travelJournal.service;

import com.example.travelJournal.dto.CommentCreateDTO;
import com.example.travelJournal.model.Comment;
import com.example.travelJournal.model.SharedPost;
import com.example.travelJournal.model.TJUser;
import com.example.travelJournal.repository.CommentRepository;
import com.example.travelJournal.repository.SharedPostRepository;
import com.example.travelJournal.repository.TJUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPost_PostId(postId);
    }

    public List<Comment> getCommentsByUserId(Long userId) {
        return commentRepository.findByUser_UserId(userId);
    }


    //comment create function
    @Autowired
    private TJUserRepository userRepository;

    @Autowired
    private SharedPostRepository postRepository;

    public Comment createComment(CommentCreateDTO dto) {
        TJUser user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SharedPost post = postRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setPost(post);
        comment.setContent(dto.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }


    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public Comment updateComment(Long id, Comment updatedComment) {
        return commentRepository.findById(id).map(comment -> {
            comment.setContent(updatedComment.getContent());
            return commentRepository.save(comment);
        }).orElseThrow(() -> new RuntimeException("Comment not found"));
    }
}
