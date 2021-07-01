import React from "react";
import '../css/HomeView.css';
import {Switch,Route,Link} from 'react-router-dom';
import { Layout, Menu,Button } from 'antd';
import DailyReport from "../components/DailyReport";
import MyTimeline from "../components/MyTimeline";
import UserPage from "../components/UserPage";
import MessagePage from "../components/MessagePage";
import {getNoCheckNum} from "../services/ReportService";

const { Header, Content, Footer } = Layout;

class HomeView extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            noCheckNum:0,
            ifDisplay:false
        }
    }
    componentDidMount() {
        const callback=(data)=>{
            this.setState({noCheckNum:data});
        }
        getNoCheckNum(callback);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        const callback=(data)=>{
            this.setState({noCheckNum:data});
        }
        //console.log(this.props.history);
        if(nextState.noCheckNum!=this.state.noCheckNum
            ||nextState.ifDisplay!=this.state.ifDisplay
            ||nextProps.history.location.key!=this.props.history.location.key
        )
            getNoCheckNum(callback);
    }

    render() {
        return (
            <Layout className="layout">
                <Header style={{height:64}}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} >
                            <Menu.Item key="home">
                                <Link to={{pathname:'/'}}>首页</Link>
                            </Menu.Item>
                            <Menu.Item key="user">
                                <Link to={{pathname:`/User`}}>个人主页</Link>
                            </Menu.Item>
                            <div className="message-num-bar"
                                 style={{background:this.state.noCheckNum==0?"#c4c4c4":"#3a90f1"}}
                                 onMouseEnter={(e)=>{this.setState({ifDisplay:true})}}
                                 onMouseLeave={(e)=>{this.setState({ifDisplay:false})}}
                            >
                                <span>新消息：{this.state.noCheckNum}</span>
                                <MessagePage ifDisplay={this.state.ifDisplay}/>
                            </div>
                            <Button
                                style={{float:"right",marginTop:13,borderRadius:15}}
                                onClick={(e)=>{
                                    localStorage.removeItem("userId");
                                    this.props.history.push("/Login");
                                }}
                            >
                                退出登录
                            </Button>
                    </Menu>

                </Header>
                <Content style={{ padding: '0 50px',height:"calc(100% - 64px)"}}>
                    <Switch>
                        <Route exact path="/" component={DailyReport} />
                        <Route exact path="/DailyUser/:username" component={MyTimeline} />
                        <Route exact path="/User" component={UserPage} />
                    </Switch>
                </Content>
                {/*<div className="footer">千里之行始于足下</div>*/}
            </Layout>)
    }
}

export default HomeView;
