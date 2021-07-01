package tree.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tree.demo.Entity.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUsername(String username);

    User findByUserId(int userId);
}
