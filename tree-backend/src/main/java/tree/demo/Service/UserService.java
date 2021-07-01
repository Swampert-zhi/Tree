package tree.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tree.demo.Dao.ImageDao;
import tree.demo.Dao.UserDao;
import tree.demo.Entity.User;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private ImageDao imageDao;

    public Map<String,Object> login(String username, String password){
        Map<String,Object> map=new HashMap<>();
        User user=userDao.findUserByUsername(username);
        if(user==null){
            map.put("status",403);
            map.put("message","用户不存在");

        }
        else if(user.getPassword().equals(password)){
            Map<String,Object> dataMap=new HashMap<>();
            dataMap.put("userId",user.getUserId());

            map.put("status",200);
            map.put("data",dataMap);
        }
        else{
            map.put("status",403);
            map.put("message","密码错误");
        }
        return map;
    }

    public Map<String,Object> checkUsername(String username){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);
        User user=userDao.findUserByUsername(username);
        map.put("data",user==null);
        return map;
    }

    public Map<String,Object> addUser(String username,String password){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);

        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setGoal("");
        user=userDao.saveUser(user);
        map.put("data",user.getUserId());
        return map;
    }

    public Map<String,Object> getUserInfo(int userId){
        User user=userDao.findUserByUserId(userId);
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);

        Map<String,Object> userMap=new HashMap<>();
        userMap.put("userId",user.getUserId());
        userMap.put("username",user.getUsername());
        userMap.put("goal",user.getGoal());
        userMap.put("imageUrl",user.getImageUrl());

        map.put("data",userMap);
        return map;
    }

    @Transactional(rollbackFor=Exception.class)
    public Map<String,Object> updateUserInfo(int userId,String username,String goal,String imageUrl){
        User user=userDao.findUserByUserId(userId);
        user.setGoal(goal);

        if(!imageUrl.equals("")){
            user.setImageUrl(imageUrl);
        }
        userDao.saveUser(user);

        return getUserInfo(userId);
    }
}
