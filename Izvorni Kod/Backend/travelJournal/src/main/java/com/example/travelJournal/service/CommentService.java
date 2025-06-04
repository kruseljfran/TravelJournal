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

    @Autowired
    private TJUserRepository userRepository;

    @Autowired
    private SharedPostRepository postRepository;

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

    /**
     * Check if a user can delete a comment
     * User can delete if:
     * 1. They are the author of the comment, OR
     * 2. They are the author of the post that the comment is on
     */
    public boolean canUserDeleteComment(Long commentId, Long userId) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isEmpty()) {
            return false;
        }

        Comment comment = commentOpt.get();

        // User can delete their own comment
        if (comment.getUser().getUserId().equals(userId)) {
            return true;
        }

        // User can delete any comment on their own post
        if (comment.getPost().getUser().getUserId().equals(userId)) {
            return true;
        }

        return false;
    }
}
