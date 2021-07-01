import React from "react";
import moment from 'moment';
import "../css/DailyReport.css";
import DailyCard from "./DailyCard";
import {Calendar,Button} from "antd";
import {getReportsByDate} from "../services/ReportService";
import DailyDetail from "./DailyDetail";

class DailyReport extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            date:null,
            iftoday:true,
            today:null,
            showCalendar:false,
            userData:[],
            ifDisplay: false,
            selectUsername:""
        }
    }

    componentWillMount() {
        this.setState({date:moment(new Date(),'YYYY-MM-DD'),today:moment(new Date(),'YYYY-MM-DD')});
    }

    componentDidMount() {
        this.updateData();
    }

    updateData=()=>{
        const callback=(data)=>{
            this.setState({userData:data});
        }
        getReportsByDate(this.state.date.format('YYYY-MM-DD'),callback);
    }

    changeDate=(date,dateString)=>{
        this.setState({date:date},()=>{this.updateData()});
        if(this.state.today.toString()===date.toString()){
            this.setState({iftoday:true});
        }
        else{
            this.setState({iftoday:false});
        }
        this.updateData();
    }
    toYesterday=(e)=>{
        let date=this.state.date.add(-1,'day');
        this.setState({date:date},()=>{this.updateData()});
        if(this.state.date.toString()===this.state.today.toString()){
            this.setState({iftoday:true});
        }
        else{
            this.setState({iftoday:false});
        }
    }

    closeDetail=()=>{
        this.setState({ifDisplay:false},()=>{
            this.updateData();
        })
    }
    openDetail=(selectUsername)=>{
        this.setState({ifDisplay:true,selectUsername:selectUsername})
    }

    toTomorrow=(e)=>{
        let date=this.state.date.add(+1,'day');
        this.setState({date:date},()=>{this.updateData()});
        if(this.state.date.toString()===this.state.today.toString()){
            this.setState({iftoday:true});
        }
        else{
            this.setState({iftoday:false});
        }
    }

    disabledDate=(current)=>{
        if(current>this.state.today)
            return true;
        else
            return false;
    }

    render() {
        if(this.state.userData.length==0)
            return null
        else
            return(
            <div style={{background: "white",height:"100%",width:"100%"}}>
                <div className="report-header">
                    <div className="report-header-text">{this.state.iftoday?"今天是":"我想看"}</div>
                    <div
                        className="date"
                        onMouseDown={(e)=>{this.setState({showCalendar:true})}}
                        onMouseLeave={(e)=>{this.setState({showCalendar:false})}}
                    >
                        <div style={{cursor: "pointer"}}>{this.state.date.format("YYYY-MM-DD")}</div>
                        <div className="date-hover-calendar"
                             style={{height: this.state.showCalendar?350:0}}
                        >
                            <Calendar
                                fullscreen={false}
                                onChange={this.changeDate}
                                value={this.state.date}
                                disabledDate={this.disabledDate}
                            />
                        </div>
                    </div>
                        <Button
                            onClick={this.toYesterday}
                            className="date-picker-button"
                        >上一天</Button>
                        <Button
                            onClick={this.toTomorrow}
                            disabled={this.state.iftoday}
                            className="date-picker-button"
                        >下一天</Button>
                </div>
                <div className="report-wrap">
                    {this.state.userData.map((item,index)=>
                        <DailyCard
                            data={item}
                            key={index}
                            openDetail={this.openDetail}
                        />)}
                    {this.state.ifDisplay?
                        <DailyDetail
                            close={this.closeDetail}
                            ifDisplay={this.state.ifDisplay}
                            username={this.state.selectUsername}
                            date={this.state.date.format("YYYY-MM-DD")}
                        /> :null}
                </div>
            </div>
        );

    }
}

export default DailyReport;
