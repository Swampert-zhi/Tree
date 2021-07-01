import React from 'react';
import '../css/Leaf.css';

class Leaf extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            randomCycle:0,
            randomType:1,
            rotateDeg:0,
            rotateRandom1:0,
            rotateRandom2:0,
            rotateRandom3:0,
            sizeRandom1:0,
            sizeRandom2:0,
            sizeRandom3:0
        }
    }
    componentDidMount() {
        this.setState({
            randomCycle:6+10*Math.random(),
            randomType:Math.random()>0.5?1:2,
            rotateDeg:360*Math.random(),
            rotateRandom1:90*Math.random(),
            rotateRandom2:180*Math.random(),
            rotateRandom3:240*Math.random(),
            sizeRandom1:50+100*Math.random(),
            sizeRandom2:50+100*Math.random(),
            sizeRandom3:50+100*Math.random()
        })
    }

    render() {
        const {ratio}=this.props;
        return (
            <div className="leaf-body" style={{animation:`${this.state.randomCycle}s infinite linear shrink${this.state.randomType}`}} >
                <div className="leaf" style={{transform:`rotate(${this.state.rotateDeg+ratio*this.state.rotateRandom1}deg)`}}>
                    <img src={require("../assets/leaf1.png").default} alt= "" className="leaf-img"
                         style={{width:`${ratio*this.state.sizeRandom1}%`,height:`${ratio*this.state.sizeRandom1}%`}}/>
                </div>
                <div className="leaf" style={{transform:`rotate(${this.state.rotateDeg+ratio*this.state.rotateRandom2}deg)`}}>
                    <img src={require("../assets/leaf2.png").default} alt= "" className="leaf-img"
                         style={{width:`${ratio*this.state.sizeRandom2}%`,height:`${ratio*this.state.sizeRandom2}%`}}/>
                </div>
                <div className="leaf" style={{transform:`rotate(${this.state.rotateDeg+ratio*this.state.rotateRandom3}deg)`}}>
                    <img src={require("../assets/leaf3.png").default} alt= "" className="leaf-img"
                         style={{width:`${ratio*this.state.sizeRandom3}%`,height:`${ratio*this.state.sizeRandom3}%`}}/>
                </div>
            </div>
        )
    }
}

export default Leaf;
