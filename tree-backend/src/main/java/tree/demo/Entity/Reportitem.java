package tree.demo.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "reportitem",schema = "tree")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler","userId"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "itemId")
public class Reportitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private int itemId;

    @Basic
    @Column(name = "user_id")
    private int userId;

    @Basic
    @Column(name = "item_name")
    private String itemName;

    @Basic
    @Column(name = "start_date")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    private Date startDate;

    @Basic
    @Column(name = "end_date")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    private Date endDate;

    public Reportitem(int userId,String itemName,Date startDate,Date endDate){
        this.userId=userId;
        this.itemName=itemName;
        this.startDate=startDate;
        this.endDate=endDate;
    }

    public Reportitem(int itemId,int userId,String itemName,Date startDate,Date endDate){
        this.itemId=itemId;
        this.userId=userId;
        this.itemName=itemName;
        this.startDate=startDate;
        this.endDate=endDate;
    }
}
