package tree.demo.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tree.demo.Entity.Image;
import tree.demo.Repository.ImageRepository;

@Repository
public class ImageDao {
    @Autowired
    private ImageRepository imageRepository;

    public Image saveImage(Image image){
        return imageRepository.save(image);
    }

    public Image findByDailyId(int dailyId){
        return imageRepository.findByDailyId(dailyId);
    }
}
