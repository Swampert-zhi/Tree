import React from 'react';
import '../css/UserPage.css';
import MyTimeline from "./MyTimeline";
import {Input, DatePicker, Button, Upload, Empty} from "antd";
import moment from 'moment';
import {EditOutlined, PlusOutlined, PlusSquareOutlined} from '@ant-design/icons';
import {getItemsByUserId,postItemsByUserId,getUserInfo,updateUserInfo,getBackground} from "../services/ReportService";
import {uploadImage,getImage} from "../services/ImageService";

const {RangePicker} = DatePicker;
var COS = require('cos-js-sdk-v5');

class UserPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            editUserInfo:false,
            editItem:false,
            addItemNum:0,
            reportItems:[],
            reportItemsCache:[],

            userId:0,
            username:'test',
            goal:'',
            imageUrl:null,
            image:null,
            fileList:[],
            selectFile:null,

            pressIcon:false
        }
    }

    componentDidMount() {
        const callback=(data)=>{
            this.setState({reportItems:data,reportItemsCache:this.copy(data)});
        }
        const callback2=(data)=>{
            // console.log(data);
            this.setState({
                    userId:data.userId,
                    username:data.username,
                    goal:data.goal,
                    goalCache:data.goal,
                    imageUrl:data.imageUrl
                });
            if(this.state.imageUrl){
                console.log(this.state.imageUrl);
                this.setState({image:`http://${this.state.imageUrl}`})
            }
        }
        getItemsByUserId(callback);
        getUserInfo(callback2);

        let maskNode=document.getElementById('userage-body-mask');
        let imageNode=document.getElementById('image-wrap')
        for(let i=0;i<20;i++){
            let newNode=document.createElement('div');
            newNode.className="bubble";
            newNode.style=`--pos:${Math.random()};--size:${10+40*Math.random()};--duration:${5+10*Math.random()};--opac:${0.2+0.4*Math.random()}`;
            maskNode.appendChild(newNode);
        }

        setTimeout(()=>{
            maskNode.style="left:0";
            imageNode.style="opacity:1"
        },0)
    }

    copy=(data)=>{
        let copy=[];
        data.map((item)=>{
            copy.push({
                itemId:item.itemId,
                itemName:item.itemName,
                startDate:item.startDate,
                endDate:item.endDate
            });
        });
        return copy;
    }

    editItem=(e)=>{
        if(this.state.editItem){
            this.setState({
                editItem:false,
                reportItems:this.copy(this.state.reportItemsCache)
            })
        }
        else
            this.setState({editItem: true})
    }

    editItemContent=(value,index,prop)=>{
        let newData=this.state.reportItems;
        newData[index][prop]=value;
        this.setState({reportItems:newData});
    }

    addItem=(e)=>{
        let newData=this.state.reportItems;
        newData.push({itemId:-1,itemName:"",startDate:new moment().format('YYYY-MM-DD'),endDate:null});
        this.setState({reportItems:newData},()=>{
            this.list.scrollTop=this.list.scrollHeight-this.list.clientHeight;
            // console.log(this.state.reportItems,this.state.reportItemsCache);
        })
    }

    submit=(e)=>{
        const callback=(data)=>{
            // console.log(data);
            this.setState({reportItems:data,reportItemsCache:this.copy(data),editItem:false});
        }
        postItemsByUserId(this.state.reportItems,callback);
    }

    editUserInfo=(e)=>{
        if(this.state.editUserInfo){
            this.setState({
                editUserInfo:false,
                goal:this.state.goalCache,
                fileList:[]
            })
        }
        else{
            this.setState({editUserInfo: true})
            if(this.state.imageUrl)
                this.setState({
                    fileList:[{
                        uid:this.state.userId,
                        status: 'done',
                        url: this.state.image,
                    }],
                    selectFile:null
                })
        }

    }

    beforeUpload = (file) => {
        const r = new FileReader();
        r.readAsDataURL(file);
        r.onload = e => {
            this.setState({
                fileList:[{
                    uid:-1,
                    status: 'done',
                    url: e.target.result,
                }],
                selectFile:file
            })
        };
        return false;
    }

    submitUserInfo=(e)=>{
        const callback=(data)=>{
            this.setState({
                goal:data.goal,
                imageUrl:data.imageUrl,
                goalCache:data.goal,
                editUserInfo: false,
                fileList:[]
            });
        };
        var data={
            username:this.state.username,
            goal:this.state.goal,
            imageUrl:""
        }
        if(this.state.selectFile){
            uploadImage(
               `userId-${this.state.userId}.jpg`,
               this.state.selectFile,
               (res)=>{
                   console.log(res);
                    data['imageUrl']=res.Location;
                   updateUserInfo(data,callback);
               });
        }
        else
            updateUserInfo(data,callback);
    }

    render() {
        return (
            <div className="userpage-body" style={{background: "white",height:"100%",width:"100%"}}>
                <div id="userage-body-mask">
                </div>
                <div className="userpage-left">
                    <div className="userpage-header">
                        <span style={{fontSize:30,fontWeight:"bold",marginRight:10}}>个人信息</span>
                        <span style={{cursor:"pointer"}}
                              onClick={this.editUserInfo}>
                            <EditOutlined style={{fontSize:25,color:this.state.editUserInfo?'#abd3ff':'white',transitionDuration:"0.2s"}}/>
                        </span>
                        {this.state.editUserInfo?
                            <Button
                                style={{marginLeft:10}}
                                onClick={this.submitUserInfo}
                            >提交</Button>
                            :null}
                    </div>
                    <div className="userpage-left-content">
                        {this.state.editUserInfo?
                            <Upload
                                beforeUpload={this.beforeUpload}
                                listType="picture-card"
                                fileList={this.state.fileList}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div>Upload</div>
                                </div>
                            </Upload>
                            :
                            <div id="image-wrap">
                                <img src={this.state.image||require("../assets/test.jpg").default} style={{width:"100%"}}/>
                            </div>}
                        <div style={{marginBottom:10}}>
                            <span style={{fontSize:30}}>Username: </span>
                            {this.state.username}
                        </div>
                        <div style={{display:'flex',alignItems:'baseline'}}>
                            <span style={{fontSize:30,marginRight:10}}>Goal:</span>
                            <span>{this.state.editUserInfo?
                                <Input
                                    style={{width:250}}
                                    value={this.state.goal}
                                    onChange={(e)=>{
                                        this.setState({goal:e.target.value})
                                    }}
                                />:this.state.goal}</span>
                        </div>
                    </div>
                </div>
                <div className="userpage-right">
                    <div className="userpage-header">
                        <span style={{fontSize:30,fontWeight:"bold",marginRight:10}}>打卡项目</span>
                        <span style={{cursor:"pointer"}}
                              onClick={this.editItem}
                        >
                            <EditOutlined style={{fontSize:25,color:this.state.editItem?'#1783ff':'#000',transitionDuration:"0.2s"}}/>
                        </span>
                        {this.state.editItem?<div
                            style={{cursor:"pointer"}}
                            onClick={this.addItem}
                            onMouseDown={(e)=>{this.setState({pressIcon:true})}}
                            onMouseUp={(e)=>{this.setState({pressIcon:false})}}
                        >
                            &emsp;<PlusSquareOutlined style={{fontSize:25,color:this.state.pressIcon?'#1783ff':'#000',transitionDuration:'0.2s'}}/>
                        </div>:null}
                        {this.state.editItem?
                            <Button
                                style={{marginLeft:10}}
                                onClick={this.submit}
                            >提交</Button>
                            :null}
                    </div>
                    <div className="userpage-ul-wrap" ref={node=>this.list=node}>
                        {(this.state.reportItems.length>0)?
                            <ul className="userpage-ul">
                            {this.state.reportItems.map((item,index)=>(
                                <li key={index}>
                                    <div className="userpage-li-wrap" style={item.itemId==-1?{background:'#ffca8b'}:{}}>
                                        <span style={{fontWeight:400,fontSize:20}}>
                                            {this.state.editItem?
                                                <Input
                                                    style={{width:150}}
                                                    value={item.itemName}
                                                    onChange={(e)=>{this.editItemContent(e.target.value,index,'itemName')}}
                                                />
                                                :item.itemName}
                                        </span>
                                        <div className="userpage-li-time">
                                            <span style={{fontWeight:'bold'}}>
                                                {this.state.editItem?
                                                    <DatePicker
                                                        style={{width:120}}
                                                        value={moment(item.startDate)}
                                                        onChange={(date,dateString)=>{
                                                            this.editItemContent(dateString==""?null:dateString,index,'startDate')
                                                        }}
                                                    />
                                                    :item.startDate}
                                            </span>
                                            <span> ~ </span>
                                            <span style={{fontWeight:'bold'}}>
                                                {this.state.editItem?
                                                    <DatePicker
                                                        style={{width:120}}
                                                        value={item.endDate?moment(item.endDate):item.endDate}
                                                        onChange={(date,dateString)=>{
                                                            this.editItemContent(dateString==""?null:dateString,index,'endDate')
                                                        }}
                                                    />
                                                    :(item.endDate||"至今")}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>:
                        <Empty description={<span style={{color:"#39afec",fontWeight:"normal"}}>开始打卡吧</span>}/>}
                    </div>
                </div>

            </div>
        )
    }
}

export default UserPage;
