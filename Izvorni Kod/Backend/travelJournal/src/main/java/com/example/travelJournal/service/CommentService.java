package com.example.travelJournal.service;

import com.example.travelJournal.dto.CommentCreateDTO;
import com.example.travelJournal.dto.CommentDTO;
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
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TJUserRepository userRepository;

    @Autowired
    private SharedPostRepository postRepository;

    public List<CommentDTO> getAllComments() {
        return commentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public List<CommentDTO> getCommentsByPostId(Long postId) {
        return commentRepository.findByPost_PostId(postId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CommentDTO> getCommentsByUserId(Long userId) {
        return commentRepository.findByUser_UserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CommentDTO createComment(CommentCreateDTO dto) {
        TJUser user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SharedPost post = postRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setPost(post);
        comment.setContent(dto.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        return convertToDTO(savedComment);
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

    public boolean canUserDeleteComment(Long commentId, Long userId) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isEmpty()) {
            return false;
        }

        Comment comment = commentOpt.get();

        if (comment.getUser().getUserId().equals(userId)) {
            return true;
        }

        if (comment.getPost().getUser().getUserId().equals(userId)) {
            return true;
        }

        return false;
    }

    private CommentDTO convertToDTO(Comment comment) {
        return new CommentDTO(
                comment.getCommentId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getUser().getUserId(),
                comment.getUser().getUsername(),
                comment.getPost().getPostId()
        );
    }
}
