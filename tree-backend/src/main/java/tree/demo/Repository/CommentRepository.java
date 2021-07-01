package tree.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tree.demo.Entity.Comment;
import tree.demo.Entity.User;

import java.util.Date;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
    List<Comment> findByOwnerIdAndDate(int ownerId, Date date);

    @Query(nativeQuery = true,value =
            "select distinct c.* " +
                    "from comment as c " +
                    "where  c.if_check=false  and (c.return_id=?1||(c.return_id is null and c.owner_id=?1))")
    List<Comment> findByUserAndIfCheckFalse(int userId);

    @Query(nativeQuery = true,value =
            "select distinct count(c.comment_id) as totalnum " +
                    "from comment as c " +
                    "where  c.if_check=false  and (c.return_id=?1||(c.return_id is null and c.owner_id=?1))")
    int countByUserAndIfCheckFalse(int userId);
}
