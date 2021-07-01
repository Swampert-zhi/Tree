package tree.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tree.demo.Service.CommentService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    @GetMapping("getComments")
    public Map<String,Object> getComments(
            @RequestParam("userId") int userId,
            @RequestParam("ownerName") String ownerName,
            @RequestParam("date") String dateString) throws ParseException {
        Date date=formatter.parse(dateString);
        return commentService.getComments(userId,ownerName,date);
    }

    @PostMapping("addComment")
    public Map<String,Object> addComment(
            @RequestParam("userId") int userId,
            @RequestParam("returnId") int returnId,
            @RequestParam("text") String text,
            @RequestParam("ownerName") String ownerName,
            @RequestParam("date") String dateString) throws ParseException {
        Date date=formatter.parse(dateString);
        return commentService.addComment(userId,returnId,text,ownerName,date);
    }

    @GetMapping("getNoCheckNum")
    public Map<String,Object> getNoCheckNum(
            @RequestParam("userId") int userId
    ){
        return commentService.getNoCheckNum(userId);
    }

    @GetMapping("getNoCheckComments")
    public Map<String,Object> getNoCheckComments(
            @RequestParam("userId") int userId
    ){
        return commentService.getNoCheckComments(userId);
    }
}
