import React from "react";
import "../css/DailyCard.css";
import {CheckCircleTwoTone} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import ListItem from "./ListItem";
import DailyDetail from "./DailyDetail";
import {getBackground} from "../services/ReportService";

class DailyCard extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            ifEnterHeader: false,
            background:"",
        }
    }

    componentDidMount() {
        if(this.props.data.imageUrl)
            this.setState({background:`http://${this.props.data.imageUrl}`});
    }


    render() {
        return (
            <div className="card-body">
                <div className="card-wrap" onClick={(e)=>{this.props.openDetail(this.props.data.username)}}>
                    <div className={this.state.ifEnterHeader?"card-background-hover":"card-background"}>
                        <img src={this.state.background||require(`../assets/test.jpg`).default} style={{height:"100%"}}/>
                    </div>
                    <div
                        onMouseEnter={(e)=>{this.setState({ifEnterHeader:true})}}
                        onMouseLeave={(e)=>{this.setState({ifEnterHeader:false})}}
                        style={this.state.ifEnterHeader?{height:"100%",background:"none"}:{height: "20%",background:"rgba(128,128,128,0.6)"}}
                        className="card-header"
                    >
                        <div className="card-header-body">
                            <div style={{opacity:this.state.ifEnterHeader?0:1}}>{this.props.data.username}</div>
                            <div className="card-header-hover" style={{opacity:this.state.ifEnterHeader?1:0}}>
                                {this.props.data.goal||"坚持到底！"}
                            </div>
                        </div>
                    </div>
                    <div className="card-content" style={this.state.ifEnterHeader?{height:"0%",padding:0}:{height:"80%",padding: 5}}>
                        <div className="card-content-body" style={{overflow:this.state.ifEnterHeader?"hidden":"auto"}}>
                            <ul className="card-content-ul">
                                {this.props.data.itemList.map((item,index)=>
                                    <li key={index}>
                                        <ListItem title={item.title} content={item.content} ifComplete={item.ifComplete}/>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <Link to={{pathname:`/DailyUser/${this.props.data.username}`}}>
                    <div className="card-bottom">
                        时间的藤蔓
                    </div>
                </Link>
            </div>
        );
    }
}

export default DailyCard;
