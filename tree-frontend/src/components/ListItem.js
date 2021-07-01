import React from 'react';
import '../css/ListItem.css'
import {CheckCircleTwoTone,ExclamationCircleTwoTone} from "@ant-design/icons";

class ListItem extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {title,content,ifComplete}=this.props;
        return (
            <>
                <div className="card-content-ul-header">
                    {ifComplete?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<ExclamationCircleTwoTone twoToneColor="#f65555"/>}
                    <div style={{marginLeft:10,width:"90%"}}>{title}</div>
                </div>
                {ifComplete?
                    (<div className="card-content-ul-content">
                        &emsp;&emsp;{content||"无"}
                    </div>):null}
            </>
        )
    }
}

export default ListItem;
