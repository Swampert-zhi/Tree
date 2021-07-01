package tree.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tree.demo.Entity.Reportitem;

import java.util.Date;
import java.util.List;

public interface ReportitemRepository extends JpaRepository<Reportitem,Integer> {
    @Query(nativeQuery = true,value =
            "select * " +
            "from reportitem as r " +
            "where r.start_date<=?1 and ( r.end_date IS NULL or ?1 <= r.end_date) and r.user_id = ?2 ")
    List<Reportitem> findByDateAndUserId(Date date,int userId);

    List<Reportitem> findByUserId(int userId);

    @Query(nativeQuery = true,value =
            "select min(r.start_date) from reportitem as r where r.user_id = ?1 ")
    Date findEarliestDateByUserId(int userId);
}
