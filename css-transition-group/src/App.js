import React, {Component} from "react";
import "./App.css";
import ReactTransitionGroup from "react-addons-transition-group";
import Box from "./Box";

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            shouldShowBox: true
        };
    }

    toggleBox = () => {
        this.setState({
            shouldShowBox: !this.state.shouldShowBox
        });
    };

    render() {
        return <div className="page">

            <ReactTransitionGroup>
                { this.state.shouldShowBox && <Box/>}
            </ReactTransitionGroup>

            <button
                className="toggle-btn"
                onClick={this.toggleBox}> Toggle
            </button>
        </div>;
    }

}

export default App;
