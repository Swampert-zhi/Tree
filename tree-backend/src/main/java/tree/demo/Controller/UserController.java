package tree.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tree.demo.Service.UserService;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String,Object> login(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ){
        return userService.login(username,password);
    }

    @PostMapping("/addUser")
    public Map<String,Object> addUser(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ){
        return userService.addUser(username,password);
    }

    @GetMapping("/checkUsername")
    public Map<String,Object> checkUsername(
            @RequestParam("username") String username
    ){
        return userService.checkUsername(username);
    }

    @GetMapping("/getUserInfo")
    public Map<String,Object> getUserInfo(
            @RequestParam("userId") int userId
    ){
        return userService.getUserInfo(userId);
    }

    @PostMapping("/updateUserInfo")
    public Map<String,Object> updateUserInfo(
            @RequestParam("userId") int userId,
            @RequestParam("username") String username,
            @RequestParam("goal") String goal,
            @RequestParam("imageUrl") String imageUrl
    ){
        return userService.updateUserInfo(userId,username,goal,imageUrl);
    }
}
