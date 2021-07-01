package tree.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "image",schema = "tree")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "imageId")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private int imageId;

    @Basic
    @Column(name = "daily_id")
    private int dailyId;

    @Basic
    @Column(name = "image_url")
    private String imageUrl;

    public Image(int dailyId,String imageUrl){
        this.dailyId=dailyId;
        this.imageUrl=imageUrl;
    }
}
