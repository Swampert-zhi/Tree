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
@Table(name = "dailyitem",schema = "tree")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "dailyId")
public class Dailyitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_id")
    private int dailyId;

    @Basic
    @Column(name = "item_id")
    private int itemId;

    @Basic
    @Column(name = "content")
    private String content;

    @Basic
    @Column(name = "more")
    private String more;

    @Basic
    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    private Date date;

    public Dailyitem(int itemId, String content,String more,Date date){
        this.itemId=itemId;
        this.content=content;
        this.more=more;
        this.date=date;
    }
}
