import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ImageViewer from "./components/image-viewer/ImageViewer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Canvas experiment</h2>
                </div>
                <ImageViewer width={800} height={600}/>
            </div>
        );
    }
}

export default App;
