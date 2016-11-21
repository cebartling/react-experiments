import React, {Component} from "react";
import "./App.css";
import {VelocityTransitionGroup} from "velocity-react";
import ToolkitDrawer from "./ToolkitDrawer";


class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickToggleDrawer = this.onClickToggleDrawer.bind(this);
        this.state = {
            showSubComponent: false
        };
    }

    onClickToggleDrawer() {
        this.setState({showSubComponent: !this.state.showSubComponent})
    }

    render() {
        return (
            <div className="App">
                <div>
                    <button role="button" type="button" onClick={this.onClickToggleDrawer}>Toggle</button>
                </div>
                <VelocityTransitionGroup enter={{animation: "slideDown"}}
                                         leave={{animation: "slideUp"}}
                                         runOnMount={true}>
                    {this.state.showSubComponent ? <ToolkitDrawer></ToolkitDrawer> : undefined}
                </VelocityTransitionGroup>
                <div>
                    Other content
                </div>
            </div>
        );
    }
}

export default App;
