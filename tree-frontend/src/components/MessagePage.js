import React from 'react';
import '../css/MessagePage.css';
import {getNoCheckComments} from "../services/ReportService";
import DailyDetail from "./DailyDetail";
import {Empty} from "antd";

class MessagePage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            comments:[],
            node:null,
            displayDetail:false,
            selectUsername:"",
            selectDate:"",
            ifHover:false
        }
    }
    componentDidMount() {
        let node=document.getElementById('message-body');
        node.style="display:none;";
        this.setState({node:node});
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        const callback=(data)=>{
            // console.log(data);
            this.setState({comments:data});
        }
        if(nextProps.ifDisplay!=this.props.ifDisplay){
            if(nextProps.ifDisplay){
                getNoCheckComments(callback);
                this.state.node.style="opacity:0;";
                setTimeout(()=>{
                    this.state.node.style="opacity:1";
                },0);
            }
            else{
                this.state.node.style="opacity:0";
                setTimeout(()=>{
                    this.state.node.style="display:none";
                },300);
            }
        }

    }

    closeDetail=()=>{
        this.setState({displayDetail:false})
    }
    openDetail=(username,date)=>{
        // console.log("open")
        this.setState({displayDetail:true,selectUsername:username,selectDate:date});
    }

    render() {
        return (
            <>
                <div id="message-body"
                >
                    <div className="triangle"/>
                    <div className="transparent"/>

                <div className="message-wrap">
                    {this.state.comments.length>0?                    <ul className="message-wrap-ul">
                        {this.state.comments.map((item,index)=>(
                            <li key={index} onClick={(e)=>{
                                this.openDetail(item.ownerName,item.date);
                            }}>
                                <div className="comment-wrap">
                                    <div style={{margin:"2px 0 2px 0"}}>
                                        在<span style={{color:"#ff203a"}}>{item.ownerName}·{item.date}</span>下
                                    </div>
                                    <div>
                                        <span style={{color:"#33acff"}}>{item.username}</span>回复了你：
                                        <span>{item.text}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>:<Empty description={<span style={{color:"#39afec",fontWeight:"normal"}}>暂无消息</span>}/>}

                </div>

            </div>
                {this.state.displayDetail?<DailyDetail
                    close={this.closeDetail}
                    ifDisplay={this.state.displayDetail}
                    username={this.state.selectUsername}
                    date={this.state.selectDate}
                /> :null}
                </>
        );
    }
}

export default MessagePage;
