import React from 'react';
import '../css/DailyDetail.css';
import {CheckCircleTwoTone, ExclamationCircleTwoTone, PlusOutlined} from "@ant-design/icons";
import {Input,Upload,Button} from 'antd'
import {
    getDetails,
    updateDailyItem,
    getImage,
    getComments,
    addComment,
    updateUserInfo
} from "../services/ReportService";
import {uploadImage} from "../services/ImageService";

const { TextArea } = Input;

class Comment extends React.Component{
    render() {
        const {commentInfo}=this.props;
        return (
            <>
                <div>
                    <span className="username">{commentInfo.username}</span>
                    {commentInfo.returnTo!=undefined?(<><span style={{wordBreak:"normal"}}>  回复  </span><span className="username">{commentInfo.returnTo}</span></>):null}：
                </div>
                <div>
                    <span>{commentInfo.text}</span>
                </div>
            </>
        );
    }
}

class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dailyId:-1,
            title:"运动",
            content:"跑步10km",
            more:"累死了",
            ifComplete:false,

            image:null,
            fileList:[],
            selectFile:null,
            editCacheData:{},

            ifEdit:false,
            ifMine:false
        }
    }

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.ifDisplay&&this.props.ifDisplay!=prevProps.ifDisplay){
            this.updateData();
        }
    }

    updateData=()=>{
        const callback=(data)=>{
            this.setState({image:data})
        }
        this.setState({
            dailyId:this.props.dailyId||-1,
            title:this.props.title,
            content:this.props.content,
            more:this.props.more,
            image:"",
            imageUrl:this.props.imageUrl,
            ifComplete:this.props.ifComplete,
            ifEdit:false
        },()=>{
            // console.log("componentDidUpdate");
            if(this.state.imageUrl)
                this.setState({image:`http://${this.props.imageUrl}`});
        })
    }

    switchEdit = (e) =>{
        if(this.state.ifEdit)
            this.setState({
                ifEdit:false,
                content:this.state.editCacheData.content,
                more:this.state.editCacheData.more
            });
        else{
            let fileList=[]
            if(this.state.imageUrl){
                fileList.push({
                    uid:this.state.dailyId,
                    status:'done',
                    url:this.state.image
                });
            }
            this.setState({
                ifEdit:true,
                editCacheData:{
                    content:this.state.content,
                    more:this.state.more
                },
                fileList:fileList,
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

    submitEdit=(e)=>{
        const callbackOld=(data)=>{
           // console.log(data);
            this.setState({
                ifEdit:false,
                dailyId:data.dailyId,
                ifComplete:data.ifComplete,
                imageUrl:data.imageUrl,
                fileList:[]
            });
            if(data.imageUrl)
                this.setState({image:`http://${data.imageUrl}`});
        }

        const callbackNew=(data)=>{
            // console.log(data);
            let updateData={
                dailyId:data.dailyId,
                itemId:this.props.itemId,
                date: this.props.date,
                content:this.state.content||"",
                more:this.state.more||"",
                imageUrl:"",
            }
            if(this.state.selectFile){
                let userId=localStorage.getItem('userId');
                uploadImage(
                    `${data.dailyId}-${userId}-${this.props.date}.jpg`,
                    this.state.selectFile,
                    (res)=>{
                        console.log(res);
                        updateData['imageUrl']=res.Location;
                        updateDailyItem(updateData,callbackOld);
                    });
            }
            else
                updateDailyItem(updateData,callbackOld);
        }

        let updateData={
            dailyId:this.state.dailyId,
            itemId:this.props.itemId,
            date: this.props.date,
            content:this.state.content||"",
            more:this.state.more||"",
            imageUrl:"",
        }

        if(this.state.dailyId==-1)
            updateDailyItem(updateData,callbackNew);
        else{
            if(this.state.selectFile){
                let userId=localStorage.getItem('userId');
                uploadImage(
                    `${this.state.dailyId}-${userId}-${this.props.date}.jpg`,
                    this.state.selectFile,
                    (res)=>{
                        console.log(res);
                        updateData['imageUrl']=res.Location;
                        updateDailyItem(updateData,callbackOld);
                    });
            }
            else
                updateDailyItem(updateData,callbackOld);
        }


    }

    render() {
        return (
            <>
                <div
                    className="detail-content-ul-header"
                    onClick={this.switchEdit}
                    style={this.props.ownerId==localStorage.getItem('userId')?{}:{cursor:"default"}}
                >
                    {this.state.ifComplete?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<ExclamationCircleTwoTone twoToneColor="#f65555"/>}
                    <div style={{marginLeft:10,width:"90%",fontSize:20}}>{this.state.title}</div>
                </div>
                {this.state.ifComplete&&!this.state.ifEdit?(
                    <>
                        <div className="detail-content-ul-content">
                            <span style={{fontWeight:"bolder"}}>简介：</span>
                            {this.state.content||"无"}
                        </div>
                        <div className="detail-content-ul-more">
                            <span style={{fontWeight:"bolder"}}>备注：</span>
                            {this.state.more||"无"}
                            {this.state.imageUrl?
                                <div style={{marginTop:5,marginBottom:5}}>
                                    <img src={this.state.image} style={{width:"auto",maxWidth:"80%",maxHeight:400}}/>
                                </div>
                                :null}
                        </div>
                    </>
                ):null}
                {this.state.ifEdit&&(this.props.ownerId==localStorage.getItem('userId'))?(
                    <>
                        <div className="detail-content-ul-content">
                            <span style={{fontWeight:"bolder"}}>简介：</span>
                            <TextArea
                                value={this.state.content}
                                onChange={(e)=>{this.setState({content:e.target.value})}}
                            />
                        </div>
                        <div className="detail-content-ul-more">
                            <span style={{fontWeight:"bolder"}}>备注：</span>
                            <TextArea
                                value={this.state.more}
                                onChange={(e)=>{this.setState({more:e.target.value})}}
                            />
                            <div style={{marginTop:10}}>
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
                                <Button onClick={this.submitEdit}>提交</Button>
                            </div>
                        </div>
                    </>
                ):null}
            </>
        )
    }
}



class DailyDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            returnTo:"",
            returnId:-1,
            itemList:[],

            comments:[],
            text:""
        }
    }

    componentDidMount() {
        // console.log("dailyDetail-componentDidMount")
        const callback=(data)=>{
           // console.log(data);
            this.setState({itemList:data});
        }
        const commentCallback=(data)=>{
           // console.log(data)
            this.setState({comments:data});
        }
        getDetails(this.props.username,this.props.date,callback)
        getComments(this.props.username,this.props.date,commentCallback);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("dailyDetail-componentDidUpdate")
        const callback=(data)=>{
           // console.log(data);
            this.setState({itemList:data});
        }
        if(this.props.ifDisplay&&this.props.ifDisplay!=prevProps.ifDisplay)
            getDetails(this.props.username,this.props.date,callback)
    }

    selectComment=(item)=>{
       // console.log(item);
        this.setState({returnTo:item.username,returnId:item.userId});
    }

    addComment=(e)=>{
        const commentCallback=(data)=>{
           // console.log(data)
            this.setState({comments:data,text:""});
        }
        var data={
            returnId:this.state.returnId,
            text:this.state.text,
            ownerName:this.props.username,
            date:this.props.date
        }
        addComment(data,commentCallback);
    }

    handleBackgroundClick=(e)=>{
        if(e.clientX<window.innerWidth*0.1
            ||window.innerWidth*0.9<e.clientX
            ||e.clientY<window.innerHeight*0.1
            ||window.innerHeight*0.9<e.clientY){
            this.props.close();
        }
    }


    render() {
        return (
            <div className="detail-background"
                 onClick={this.handleBackgroundClick}
                 style={this.props.ifDisplay? {}:
                     {width:0,height:0,top:"50%",bottom:"50%",right:"50%",left:"50%"}}>
                <div className="detail-wrap" style={this.props.ifDisplay? {opacity: 1}:
                    {opacity:0}}
                >
                    <div className="detail-left">
                        <div className="detail-header">
                            {this.props.username} · {this.props.date}
                        </div>
                        <div className="detail-content">
                            <ul className="detail-content-ul">
                                {this.state.itemList.map((item,index)=>
                                    <li key={index} style={{color:"black"}}>
                                        <ListItem
                                            ifDisplay={this.props.ifDisplay}
                                            dailyId={item.dailyId}
                                            itemId={item.itemId}
                                            ownerId={item.ownerId}
                                            date={this.props.date}
                                            title={item.title}
                                            content={item.content}
                                            more={item.more}
                                            imageUrl={item.imageUrl}
                                            ifComplete={item.ifComplete}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="splitter"/>
                    <div className="detail-right">
                        <div className="comment-display">
                            <ul className="comment-display-ul">
                                {this.state.comments.map((item,index)=>
                                    <li key={index} style={{color:"black"}} onClick={(e)=>{this.selectComment(item)}}>
                                        <Comment commentInfo={item}/>
                                    </li>
                                )}
                            </ul>
                            <div style={{width:"100%",minHeight:100}}
                                 onClick={(e)=>{
                                     this.setState({returnTo:null,returnId:-1})
                                 }}
                            />
                        </div>
                        <div className="comment-input">
                            <div style={{color:"black"}}>{this.state.returnTo==null?"评论":"回复"+this.state.returnTo}</div>
                            <TextArea
                                style={{marginBottom:5}}
                                value={this.state.text}
                                onChange={(e)=>{this.setState({text:e.target.value})}}
                            />
                            <Button onClick={this.addComment}>评论</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyDetail;
