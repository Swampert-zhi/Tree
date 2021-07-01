package tree.demo.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tree.demo.Entity.Reportitem;
import tree.demo.Repository.ReportitemRepository;

import java.util.Date;
import java.util.List;

@Repository
public class ReportitemDao {
    @Autowired
    private ReportitemRepository reportitemRepository;

    public List<Reportitem> findByDateAndUserId(Date date,int userId){
        return reportitemRepository.findByDateAndUserId(date,userId);
    }

    public List<Reportitem> findByUserId(int userId){
        return reportitemRepository.findByUserId(userId);
    }

    public List<Reportitem> saveItems(List <Reportitem> reportitemList){
        return reportitemRepository.saveAll(reportitemList);
    }

    public Date findEarliestDateByUserId(int userId){
        return reportitemRepository.findEarliestDateByUserId(userId);
    }
}
