import React, {Component} from 'react';
import TextField from "../components/common/TextField";
import PasswordField from "../components/common/PasswordField";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handleFirstNameInputChange = this.handleFirstNameInputChange.bind(this);
        this.handleLastNameInputChange = this.handleLastNameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            firstName: 'Chris',
            lastName: 'Bartling',
            emailAddress: 'chris.bartling@gmail.com',
            password: ''
        };
    }

    handleFirstNameInputChange(e) {
        e.preventDefault();
        this.setState({firstName: e.target.value});
    }

    handleLastNameInputChange(e) {
        e.preventDefault();
        this.setState({lastName: e.target.value});
    }

    handleEmailInputChange(e) {
        e.preventDefault();
        this.setState({emailAddress: e.target.value});
    }

    handlePasswordInputChange(e) {
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting state", this.state);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                <h1 className="mt-5">Profile</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <TextField title={"First name"}
                               name={"FirstName"}
                               onChange={this.handleFirstNameInputChange}
                               content={this.state.firstName}/>

                    <TextField title={"Last name"}
                               name={"LastName"}
                               onChange={this.handleLastNameInputChange}
                               content={this.state.lastName}/>

                    <TextField title={"Email"}
                               name={"Email"}
                               onChange={this.handleEmailInputChange}
                               content={this.state.emailAddress}
                               autoComplete={"email"}/>

                    <PasswordField title={"Password"}
                                   name={"Password"}
                                   onChange={this.handlePasswordInputChange}/>

                    <hr/>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}

export default Profile;
