// @flow

import React, {Component} from "react";
import * as ReactDOM from "react-dom";
import testImage from "./leaves.jpg";
import "./ImageViewer.css";
import trackTransforms from "./CanvasContextTrackTransforms";

class ImageViewer extends Component {

    static propTypes = {
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.image = new Image();
        this.lastX = undefined;
        this.lastY = undefined;
        this.dragStart = undefined;
        this.dragged = false;
        this.scaleFactor = 1.2;
        this.onMouseDownCanvas = this.onMouseDownCanvas.bind(this);
        this.onMouseMoveCanvas = this.onMouseMoveCanvas.bind(this);
        this.onMouseUpCanvas = this.onMouseUpCanvas.bind(this);
        this.onMouseWheelCanvas = this.onMouseWheelCanvas.bind(this);
        this.onLoadImage = this.onLoadImage.bind(this);
        this.image.addEventListener('load', this.onLoadImage, false);
        this.image.src = testImage;
    };

    onLoadImage(evt) {
        this.redraw();
    }

    redraw() {
        if (this.context && this.canvas && this.image) {
            let p1 = this.context.transformedPoint(0, 0);
            let p2 = this.context.transformedPoint(this.canvas.width, this.canvas.height);
            this.context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
            this.context.save();
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.restore();
            this.context.drawImage(this.image, 0, 0);
        }
    };

    zoom(clicks) {
        let pt = this.context.transformedPoint(this.lastX, this.lastY);
        this.context.translate(pt.x, pt.y);
        let factor = Math.pow(this.scaleFactor, clicks);
        this.context.scale(factor, factor);
        this.context.translate(-pt.x, -pt.y);
        this.redraw();
    };

    onMouseDownCanvas(evt) {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
        this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
        this.dragStart = this.context.transformedPoint(this.lastX, this.lastY);
        this.dragged = false;
    };

    onMouseMoveCanvas(evt) {
        this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
        this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
        this.dragged = true;
        if (this.dragStart) {
            let pt = this.context.transformedPoint(this.lastX, this.lastY);
            this.context.translate(pt.x - this.dragStart.x, pt.y - this.dragStart.y);
            this.redraw();
        }
    };

    onMouseUpCanvas(evt) {
        this.dragStart = null;
        if (!this.dragged) this.zoom(evt.shiftKey ? -1 : 1);
    };

    onMouseWheelCanvas(evt) {
        let delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
        if (delta) this.zoom(delta);
        return evt.preventDefault() && false;
    };

    componentDidMount() {
        this.canvas = ReactDOM.findDOMNode(this);
        this.context = this.canvas.getContext('2d');
        trackTransforms(this.context);
        this.lastX = this.canvas.width / 2;
        this.lastY = this.canvas.height / 2;
        this.canvas.addEventListener('mousedown', this.onMouseDownCanvas, false);
        this.canvas.addEventListener('mousemove', this.onMouseMoveCanvas, false);
        this.canvas.addEventListener('mouseup', this.onMouseUpCanvas, false);
        this.canvas.addEventListener('DOMMouseScroll', this.onMouseWheelCanvas, false);
        this.canvas.addEventListener('mousewheel', this.onMouseWheelCanvas, false);
    };

    componentWillUnmount() {
    };

    render() {
        return (
            <canvas className="image-viewer-canvas"
                    height={this.props.height}
                    width={this.props.width}/>
        );
    }
}

export default ImageViewer;


