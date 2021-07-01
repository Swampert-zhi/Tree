package tree.demo.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tree.demo.Entity.User;
import tree.demo.Repository.UserRepository;

import java.util.List;

@Repository
public class UserDao {
    @Autowired
    private UserRepository userRepository;

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User findUserByUserId(int userId){
        return userRepository.findByUserId(userId);
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public User saveUser(User user){
        return userRepository.saveAndFlush(user);
    }
}
