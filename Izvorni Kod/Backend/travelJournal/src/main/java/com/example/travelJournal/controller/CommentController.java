package com.example.travelJournal.controller;

import com.example.travelJournal.dto.CommentCreateDTO;
import com.example.travelJournal.model.Comment;
import com.example.travelJournal.model.TJUser;
import com.example.travelJournal.service.CommentService;
import com.example.travelJournal.service.TJUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private TJUserService userService;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @GetMapping("/user/{userId}")
    public List<Comment> getCommentsByUserId(@PathVariable Long userId) {
        return commentService.getCommentsByUserId(userId);
    }

    @PostMapping
    public Comment createComment(@RequestBody CommentCreateDTO dto) {
        return commentService.createComment(dto);
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long id,
            HttpSession session,
            @RequestParam(required = false) Long userId) {

        try {
            // Try to get user from session first
            TJUser currentUser = (TJUser) session.getAttribute("user");

            // If not in session, try to get from request parameter (for Postman testing)
            if (currentUser == null && userId != null) {
                currentUser = userService.getUserById(userId)
                        .orElse(null);
            }

            // If still no user, return unauthorized
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User not authenticated. Please provide userId parameter for testing.");
            }

            boolean canDelete = commentService.canUserDeleteComment(id, currentUser.getUserId());
            if (!canDelete) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You don't have permission to delete this comment");
            }

            commentService.deleteComment(id);
            return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "message", "Comment deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Error deleting comment: " + e.getMessage()
                    ));
        }
    }
}
