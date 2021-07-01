package tree.demo.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tree.demo.Entity.Comment;
import tree.demo.Entity.User;
import tree.demo.Repository.CommentRepository;

import java.util.Date;
import java.util.List;

@Repository
public class CommentDao {
    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> findByOwnerIdAndDate(int ownerId, Date date){
        return commentRepository.findByOwnerIdAndDate(ownerId,date);
    }

    public Comment saveComment(Comment comment){
        return commentRepository.saveAndFlush(comment);
    }

    public List<Comment> getNoCheckComments(int userId){
        return commentRepository.findByUserAndIfCheckFalse(userId);
    }
    public int countNoCheckComments(int userId){
        return commentRepository.countByUserAndIfCheckFalse(userId);
    }
}
