import React from 'react';
import '../css/MyTimeline.css';
import moment from 'moment';
import {Empty} from "antd";
import Leaf from "./Leaf";
import ListItem from "./ListItem";
import DailyDetail from "./DailyDetail";
import {getAllByUsername} from "../services/ReportService";

const data=[
    {title:"吃梨",content:"吃了一斤梨吃了一斤梨吃了一斤梨吃了一斤梨吃了一斤梨吃了一斤梨吃了一斤梨"},
    {title:"运动",content:"我想运动"},
    {title:"运动",content:"我想运动"},
    {title:"运动",content:"我想运动"},
    {title:"运动",content:"我想运动"},
    {title:"运动",content:"我想运动"},
    {title:"运动",content:"我想运动"},
    {title:"运动",content:"我想运动"},
]

const rowHeight=280;

class TimelineItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            randomPos:0
        }
    }

    componentDidMount() {
        this.setState({
            randomPos:100*Math.random()
        })
    }

    render() {
        const {date,itemList}=this.props.data;
        return (
            <div className="timeline-item-wrap">
                <div className="timeline-item-tail"></div>
                <div className="timeline-item-card">
                    <div
                        className="timeline-item-card-content"
                        onClick={(e)=>{this.props.openDetail(date)}}
                    >
                        <ul className="card-content-ul">
                            {itemList.map((item,index)=>
                                <li key={index} style={{color:"black"}}>
                                    <ListItem title={item.title} content={item.content} ifComplete={item.ifComplete}/>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="timeline-item-point"></div>
                <div className="timeline-item-date">{date}</div>
                <div className="leaf-wrap" style={{top:"85%",left:`${this.state.randomPos}%`}}>
                    <Leaf ratio={this.props.ratio}/>
                </div>
            </div>
        );
    }
}

class TimelineRow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ifFlip:false,
            ratio:0,
            leaf1RandomPos:0,
            leaf2RandomPos:0
        }
    }
    componentWillMount() {
        if(this.props.row%2==1)
            this.setState({ifFlip:true});
    }

    componentDidMount() {
        let node=document.getElementsByClassName('timeline-body')[0];
        node.addEventListener('scroll',this.handleScroll)
        if(this.props.row==0){
            this.calculate(0,node.clientHeight)
        }
        this.setState({
            leaf1RandomPos:30-30*Math.random(),
            leaf2RandomPos:40+30*Math.random()
        })
    }

    handleScroll=(e)=>{
        if(e.target.scrollTop<(rowHeight*0.8+this.props.row*rowHeight)&&(220+this.props.row*rowHeight)<(e.target.scrollTop+e.target.clientHeight))
            this.calculate(e.target.scrollTop,e.target.clientHeight);
    }

    calculate=(scrollTop,clientHeight)=>{
        let ratio=1-(220+this.props.row*rowHeight-scrollTop)/clientHeight;
        this.setState({ratio:ratio});
    }

    renderItem=()=>{
        let length=this.props.data.length;
        return this.props.data.map((item,index)=>
            <TimelineItem
                key={index}
                data={item}
                ratio={Math.min(1,this.state.ratio/(0.4+0.6*(index+1)/length))}
                openDetail={this.props.openDetail}
            />)
    }

    render() {
        return (
            <div className="timeline-row-wrap"
                 style={this.state.ifFlip?{flexDirection:"row-reverse"}:{}}>
                <div className="timeline-row-placeholder"/>
                <div className="timeline-row-connectpre" style={this.state.ifFlip?{transform:"rotateY(180deg)"}:{}}>
                    <div className="timeline-row-connectpre-line"/>
                    <div className="timeline-row-connectpre-radius"/>
                    <div className="leaf-wrap" style={{left:"20%",top:`${this.state.leaf1RandomPos}%`}}>
                        <Leaf ratio={Math.min(1,this.state.ratio/0.2)}/>
                    </div>
                    <div className="leaf-wrap" style={{left:"20%",top:`${this.state.leaf2RandomPos}%`}}>
                        <Leaf ratio={Math.min(1,this.state.ratio/0.4)}/>
                    </div>
                </div>
                {this.renderItem()}
                <div className="timeline-row-connectnext" style={this.state.ifFlip?{transform:"rotateY(180deg)"}:{}}>
                    <div className="timeline-row-connectnext-radius"/>
                </div>
                <div className="timeline-row-placeholder"/>
            </div>
        )
    }
}



class MyTimeline extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            displayModal:false,
            dateData:[],
            today:new moment(),
            nextQueryDate:new moment(),
            ifLastpage:false,
            username:'',
            checkDate:'',
            loading:true
        }
    }
    componentDidMount() {
        let timelineWrap=document.getElementsByClassName('timeline-wrap')[0];
        timelineWrap.style=`--rowHeight:${rowHeight}`;
        this.setState({username:this.props.match.params.username},()=>{
            getAllByUsername(this.state.username, this.state.nextQueryDate.format('YYYY-MM-DD'), 0, 15, this.addData)
        });

        this.timelineBody.addEventListener('scroll', this.handleScroll)
    }

    handleScroll=(e)=>{
        if(((e.target.scrollHeight-e.target.scrollTop-e.target.clientHeight)<(rowHeight+100))
            &&!this.state.ifLastpage&&!this.state.loading){
            this.setState({loading:true},()=>{
                setTimeout(()=>{
                    this.setState({loading:false});
                },5000);
                getAllByUsername(this.state.username, this.state.nextQueryDate.format('YYYY-MM-DD'), 0, 15, this.addData)
            })
        }
    }

    addData=(data)=> {
        // console.log(data);
        if (data.length < 16)
            this.setState({ifLastpage:true});
        let newData=this.state.dateData.concat(data);
        this.setState({dateData:newData,nextQueryDate:this.state.nextQueryDate.add(-16,'day'),loading:false});
    }

    closeDetail=()=>{
        this.setState({displayModal:false})
    }
    openDetail=(date)=>{
        this.setState({displayModal:true,checkDate:date})
    }

    renderRow=()=>{
        var rowArray=[];
        for(let i=0;i<this.state.dateData.length/4;i++){
            rowArray.push(
                <TimelineRow
                    row={i}
                    key={i}
                    data={this.state.dateData.slice(i*4,i*4+4)}
                    openDetail={this.openDetail}
                />)
        }
        return rowArray;
    }

    render() {
        return (
            <div className="timeline-body" ref={node=>this.timelineBody=node} style={{background: "white",height:"100%",width:"100%"}}>
                <div className="timeline-wrap">
                    {this.state.dateData.length>0?
                        this.renderRow():
                        <Empty description={<span style={{color:"#39afec",fontWeight:"normal"}}>时间上还没有他的足迹</span>}/>
                    }
                    {this.state.displayModal?
                        <DailyDetail
                            close={this.closeDetail}
                            ifDisplay={this.state.displayModal}
                            username={this.state.username}
                            date={this.state.checkDate}
                        /> :null}

                </div>
            </div>
        )
    }
}

export default MyTimeline;
