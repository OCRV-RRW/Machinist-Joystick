import React, { Component } from "react";
import GameDragElement from "./GameDragElement";
import "./GameGridElement.css"
import GameEndPointElement from "./GameEndPointElement";

export class GameGridElement extends Component {
    constructor({ props }) {
        super(props)
        this.state = { 
            isBusy: false, 
            color: "", 
            entered: false,
            directions: []
        }
        this.ref = React.createRef(null)
        this.isStartElem = React.createRef(false)
    }
    
    checkPos(touchPos) {
        if (this.ref.current !== null) {
            let coord = this.ref.current.getBoundingClientRect();
            if ((touchPos.x >= coord.x && touchPos.x <= coord.x + coord.width)
            && (touchPos.y >= coord.y && touchPos.y <= coord.y + coord.height)) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    changeDirection({x, y}) {
        let newDirections = this.state.directions
        if (newDirections.length === 2) {
            newDirections[1] = [x, y]
        }
        else {
            newDirections.push([x, y])
        }

        this.setState((prevState, props) => ({ 
            isBusy: prevState.isBusy, 
            color: prevState.color, 
            entered: prevState.entered, 
            directions: newDirections}))
    }

    getIsDeletedPrev() { 
        return this.isDeletedPrev
    }

    getColorEndPoint() {
        return this.props.endPointColor
    }

    getCoordinate() {
        return (
            {
                i: this.props.i, 
                j: this.props.j
            })
    }

    getIsEndPoint() {
        return this.props.isEndPoint
    }

    getColor() {
        return this.state.color
    }

    clear() {
        this.setState((prevState, props) => ({ isBusy: false, color: "", entered: false, directions: []}))
        this.isStartElem.current = false
    }
    
    setColor(color) {
        this.setState((prevState, props) => ({ isBusy: prevState.isBusy, color: color, entered: prevState.entered, directions: prevState.directions }))
    }

    onDown = () => {
        if (!this.props.isEndPoint)
            return

        this.setState((prevState, props) => ({ isBusy: true, color: prevState.color, entered: true, directions: prevState.directions }))

        if (this.state.isBusy === false) {
            this.props.onStartPath()
            this.props.setDragProcess(true)
        }
        this.props.onAddedElementsToCurrentPath(this, this.props.endPointColor)
        this.isStartElem.current = true
    }

    onUp = () => {
        this.props.unsetDragProcess()
        
        if (!this.props.isDragProcess && this.state.isBusy) {
            this.props.onRemovedPath(this)
        }
        else if (this.props.isDragProcess) {
            if (!this.props.isEndPoint || this.state.color !== this.props.endPointColor) 
            {
                if (this.state.isBusy) {
                    this.props.onRemovedPath(this)
                }
            }
            else if (!this.props.validatePath(this)) 
            {
                this.props.onRemovedPath(this)
            }
        }

        this.setState((prevState, props) => ({ isBusy: prevState.isBusy, color: prevState.color, entered: false }))
    }

    onEnter = () => {
        if (this.props.isDragProcess) {
            this.setState((prevState, props) => ({ isBusy: true, color: prevState.color, entered: true }))
            
            if (this.state.isBusy === false)
                this.props.onAddedElementsToCurrentPath(this)
            else 
                this.isDeletedPrev = true;

            this.props.onEnter(this)
        }
        this.isStartElem.current = false
    }

    onLeave = () => {
        if (this.props.isDragProcess) {
            this.setState((prevState, props) => ({ isBusy: prevState.isBusy, color: prevState.color, entered: false }))
            this.props.onLeave(this)
            this.isDeletedPrev = false
        }
    }

    render() {
        return (
        <>
            <div 
                ref={this.ref}
                className="grid-element">
                {this.state.isBusy && 
                    <GameDragElement 
                        color={this.state.color} 
                        directions={this.state.directions} 
                        isEndPoint={this.props.isEndPoint} 
                        isStart={this.isStartElem.current}>
                    </GameDragElement>}
                {this.props.isEndPoint && 
                    <GameEndPointElement 
                        className={'end-point-element end-point-element-'+ this.props.endPointColor}>
                    </GameEndPointElement>}
            </div>
        </>
        )
    }
}