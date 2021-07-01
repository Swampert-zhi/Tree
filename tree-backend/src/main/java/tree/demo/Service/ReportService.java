package tree.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tree.demo.Dao.*;
import tree.demo.Entity.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ReportService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private ReportitemDao reportitemDao;
    @Autowired
    private DailyitemDao dailyitemDao;
    @Autowired
    private ImageDao imageDao;
    @Autowired
    private CommentDao commentDao;

    private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    public Map<String,Object> getItemsByUserId(int userId){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);

        List<Reportitem> reportitemList=reportitemDao.findByUserId(userId);
        map.put("data",reportitemList);
        return map;
    }
    @Transactional(rollbackFor=Exception.class)
    public Map<String,Object> postItemsByUserId(int userId,List<Map<String,Object>> mapList)
            throws ParseException {
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);

        List<Reportitem> reportitemList=new LinkedList<>();
        for(Map<String,Object> itemMap:mapList){
            Date startDate=formatter.parse((String) itemMap.get("startDate"));
            Date endDate=null;
            if(itemMap.get("endDate")!=null)
                endDate=formatter.parse((String) itemMap.get("endDate"));
            Reportitem reportitem=new Reportitem(
                    userId,
                    (String) itemMap.get("itemName"),
                    startDate,
                    endDate
            );
            if((int)itemMap.get("itemId")!=-1){
                reportitem.setItemId((int)itemMap.get("itemId"));
            }
            reportitemList.add(reportitem);
        }

        List<Reportitem> newList=reportitemDao.saveItems(reportitemList);
        map.put("data",newList);
        return map;
    }

    private List<Map<String,Object>> getItemList2mapList(Date date,int userId){
        List<Reportitem> reportitemList=reportitemDao.findByDateAndUserId(date,userId);
        List<Map<String,Object>> itemList=new LinkedList<>();
        for(Reportitem reportitem:reportitemList){
            Map<String,Object> itemMap=new HashMap<>();
            itemMap.put("title",reportitem.getItemName());
            Dailyitem dailyitem=dailyitemDao.findByItemIdAndDate(reportitem.getItemId(),date);
            if(dailyitem==null){
                itemMap.put("ifComplete",false);
            }
            else {
                itemMap.put("ifComplete",true);
                itemMap.put("content",dailyitem.getContent());
            }
            itemList.add(itemMap);
        }
        return itemList;
    }

    public Map<String,Object> getAllReportsByDate(Date date){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);
        List<Map<String,Object>> mapList=new LinkedList<>();

        List<User> userList=userDao.findAllUsers();
        for(User user:userList){
            Map<String,Object> userMap=new HashMap<>();
            userMap.put("userId",user.getUserId());
            userMap.put("username",user.getUsername());
            userMap.put("goal",user.getGoal());
            userMap.put("imageUrl",user.getImageUrl());

            userMap.put("itemList",getItemList2mapList(date,user.getUserId()));

            mapList.add(userMap);
        }
        map.put("data",mapList);
        return map;
    }

    public Map<String,Object> getAllByUsername(String username,Date startDate,int startNum,int endNum){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);
        List<Map<String,Object>> mapList=new LinkedList<>();
        User user=userDao.findUserByUsername(username);
        Date earliestDate=reportitemDao.findEarliestDateByUserId(user.getUserId());
        if(earliestDate!=null){
            long startDateNum=startDate.getTime();
            for(int i=startNum;i<=endNum;i++){
                Date date=new Date(startDateNum-i*24*3600*1000);
                if(date.before(earliestDate))
                    break;
                else {
                    Map<String,Object> dateMap=new HashMap<>();
                    dateMap.put("date",formatter.format(date));

                    dateMap.put("itemList",getItemList2mapList(date,user.getUserId()));
                    mapList.add(dateMap);
                }
            }
        }
        map.put("data",mapList);
        return map;
    }

    public Map<String,Object> getDetails(String username,Date date){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);

        User user=userDao.findUserByUsername(username);
        List<Reportitem> reportitemList=reportitemDao.findByDateAndUserId(date,user.getUserId());
        List<Map<String,Object>> itemList=new LinkedList<>();
        for(Reportitem reportitem:reportitemList){
            Map<String,Object> itemMap=new HashMap<>();
            itemMap.put("itemId",reportitem.getItemId());
            itemMap.put("title",reportitem.getItemName());
            itemMap.put("ownerId",user.getUserId());
            Dailyitem dailyitem=dailyitemDao.findByItemIdAndDate(reportitem.getItemId(),date);
            if(dailyitem==null){
                itemMap.put("ifComplete",false);
            }
            else {
                itemMap.put("dailyId",dailyitem.getDailyId());
                itemMap.put("ifComplete",true);
                itemMap.put("content",dailyitem.getContent());
                itemMap.put("more",dailyitem.getMore());
                Image image=imageDao.findByDailyId(dailyitem.getDailyId());
                if(image!=null)
                    itemMap.put("imageUrl",image.getImageUrl());
                else
                    itemMap.put("imageUrl","");
            }
            itemList.add(itemMap);
        }

        map.put("data",itemList);
        return map;
    }

    @Transactional(rollbackFor=Exception.class)
    public Map<String,Object> updateDailyItem(int dailyId,int itemId, Date date,String content,String more,String imageUrl){
        Map<String,Object> map=new HashMap<>();
        map.put("status",200);

        Dailyitem dailyitem=new Dailyitem(itemId,content,more,date);
        if(dailyId!=-1)
            dailyitem.setDailyId(dailyId);
        else
            dailyitem=dailyitemDao.saveItem(dailyitem);


        if(!imageUrl.equals("")){
            Image newImage=new Image(dailyitem.getDailyId(),imageUrl);
            imageDao.saveImage(newImage);
        }
        dailyitem=dailyitemDao.saveItem(dailyitem);

        Map<String,Object> dataMap=new HashMap<>();
        dataMap.put("dailyId",dailyitem.getDailyId());
        dataMap.put("ifComplete",true);
        dataMap.put("content",dailyitem.getContent());
        dataMap.put("more",dailyitem.getMore());
        dataMap.put("imageUrl",imageUrl);
        map.put("data",dataMap);

        return map;
    }
}
