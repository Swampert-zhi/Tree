package tree.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tree.demo.Entity.Dailyitem;

import java.util.Date;

public interface DailyItemRepository extends JpaRepository<Dailyitem,Integer> {
    Dailyitem findByItemIdAndDate(int itemId, Date date);


}
