package tree.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tree.demo.Dao.CommentDao;
import tree.demo.Dao.UserDao;
import tree.demo.Entity.Comment;
import tree.demo.Entity.User;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CommentService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private CommentDao commentDao;

    private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    @Transactional(rollbackFor = Exception.class)
    public Map<String,Object> getComments(int userId, String ownerName, Date date){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);
        User user=userDao.findUserByUserId(userId),owner=userDao.findUserByUsername(ownerName);
        String username=user.getUsername();
        List<Comment> commentList=commentDao.findByOwnerIdAndDate(owner.getUserId(),date);
        List<Map<String,Object>> mapList=new LinkedList<>();
        for(Comment comment:commentList){
            Map<String,Object> commentMap=new HashMap<>();
            commentMap.put("commentId",comment.getCommentId());
            commentMap.put("username",comment.getUser().getUsername());
            commentMap.put("userId",comment.getUser().getUserId());
            if(!comment.isIfCheck()){
                if(comment.getReturnUser()==null){
                    if(username.equals(ownerName)){
                        comment.setIfCheck(true);
                        commentDao.saveComment(comment);
                    }
                }
                else {
                    if(username.equals(comment.getReturnUser().getUsername())){
                        comment.setIfCheck(true);
                        commentDao.saveComment(comment);
                    }
                }
            }
            if(comment.getReturnUser()!=null)
                commentMap.put("returnTo",comment.getReturnUser().getUsername());
            commentMap.put("text",comment.getText());
            mapList.add(commentMap);
        }
        map.put("data",mapList);
        return map;
    }

    @Transactional(rollbackFor = Exception.class)
    public Map<String,Object> addComment(int userId,int returnId,String text,String ownerName,Date date){
        User user=userDao.findUserByUserId(userId),owner=userDao.findUserByUsername(ownerName);
        Comment comment=new Comment(date,text,owner.getUserId(),user);
        if(returnId>0){
            User returnUser=userDao.findUserByUserId(returnId);
            comment.setReturnUser(returnUser);
        }
        commentDao.saveComment(comment);
        return this.getComments(userId,ownerName,date);
    }

    public Map<String,Object> getNoCheckNum(int userId){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);
        map.put("data",commentDao.countNoCheckComments(userId));
        return map;
    }

    public Map<String,Object> getNoCheckComments(int userId){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);
        List<Comment> commentList=commentDao.getNoCheckComments(userId);
        List<Map<String,Object>> mapList=new LinkedList<>();
        for(Comment comment:commentList){
            Map<String,Object> commentMap=new HashMap<>();
            commentMap.put("commentId",comment.getCommentId());
            commentMap.put("date",formatter.format(comment.getDate()));
            User owner=userDao.findUserByUserId(comment.getOwnerId());
            commentMap.put("ownerName",owner.getUsername());
            commentMap.put("username",comment.getUser().getUsername());
            commentMap.put("text",comment.getText());
            mapList.add(commentMap);
        }
        map.put("data",mapList);
        return map;
    }
}
