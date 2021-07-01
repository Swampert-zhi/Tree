package tree.demo.Entity;

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
@Table(name = "comment",schema = "tree")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "commentId")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @Basic
    @Column(name = "date")
    private Date date;

    @Basic
    @Column(name = "text")
    private String text;

    @Basic
    @Column(name="if_check")
    private boolean ifCheck;

    @Basic
    @Column(name = "owner_id")
    private int ownerId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "return_id")
    private User returnUser;

    public Comment(Date date,String text,int ownerId,User user){
        this.date=date;
        this.text=text;
        this.ownerId=ownerId;
        this.user=user;
        this.ifCheck=false;
    }
}
