package tree.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user",schema = "tree")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler","password"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Basic
    @Column(name = "username")
    private String username;

    @Basic
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "goal")
    private String goal;

    @Basic
    @Column(name = "image_url")
    private String imageUrl;
}
