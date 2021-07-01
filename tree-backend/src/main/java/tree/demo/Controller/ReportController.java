package tree.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tree.demo.Service.ReportService;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    @GetMapping("/getItemsByUserId")
    public Map<String,Object> getItemsByUserId(
            @RequestParam("userId") int userId
    ){
        return reportService.getItemsByUserId(userId);
    }

    @PostMapping("/postItemsByUserId")
    public Map<String,Object> postItemsByUserId(
            @RequestParam("userId") int userId,
            @RequestBody List<Map<String,Object>> data
    ) throws ParseException {
        return reportService.postItemsByUserId(userId,data);
    }

    @GetMapping("/getReportsByDate")
    public Map<String,Object> getReportsByDate(
            @RequestParam("date") String dateString
            ) throws ParseException {
        Date date=formatter.parse(dateString);
        return reportService.getAllReportsByDate(date);
    }

    @GetMapping("/getAllByUsername")
    public Map<String,Object> getAllByUsername(
            @RequestParam("username") String username,
            @RequestParam("startDate") String dateString,
            @RequestParam("startNum") int startNum,
            @RequestParam("endNum") int endNum
    ) throws ParseException {
        Date date=formatter.parse(dateString);
        return reportService.getAllByUsername(username,date,startNum,endNum);
    }

    @GetMapping("/getDetails")
    public Map<String,Object> getDetails(
            @RequestParam("username") String username,
            @RequestParam("date") String dateString
    ) throws ParseException {
        Date date=formatter.parse(dateString);
        return reportService.getDetails(username,date);
    }

    @PostMapping("/updateDailyItem")
    public Map<String,Object> updateDailyItem(
            @RequestParam("dailyId") int dailyId,
            @RequestParam("itemId") int itemId,
            @RequestParam("date") String dateString,
            @RequestParam("content") String content,
            @RequestParam("more") String more,
            @RequestParam("imageUrl") String imageUrl
    ) throws ParseException {
        Date date=formatter.parse(dateString);
        return reportService.updateDailyItem(dailyId, itemId, date, content, more, imageUrl);
    }

}
