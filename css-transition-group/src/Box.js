import React, {Component} from "react";
import "./Box.css";
import {findDOMNode} from "react-dom";
import TweenMax from "gsap";

class Box extends Component {

    componentWillEnter(callback) {
        const el = findDOMNode(this);
        TweenMax.fromTo(el, 0.3, {y: -100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    }

    componentWillLeave(callback) {
        const el = findDOMNode(this);
        TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
    }

    render() {
        return (
            <div className="box">
                <h2>Tools</h2>
            </div>
        );
    }
}

export default Box;
