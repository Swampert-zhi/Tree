package tree.demo.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tree.demo.Entity.Dailyitem;
import tree.demo.Repository.DailyItemRepository;

import java.util.Date;

@Repository
public class DailyitemDao {
    @Autowired
    private DailyItemRepository dailyItemRepository;

    public Dailyitem findByItemIdAndDate(int itemId, Date date){
        return dailyItemRepository.findByItemIdAndDate(itemId,date);
    }

    public Dailyitem saveItem(Dailyitem dailyitem){
        return dailyItemRepository.saveAndFlush(dailyitem);
    }
}
