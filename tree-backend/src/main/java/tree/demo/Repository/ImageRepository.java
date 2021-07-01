package tree.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tree.demo.Entity.Image;

public interface ImageRepository extends JpaRepository<Image,Integer> {
    Image findByDailyId(int dailyId);
}
