import React from 'react';
import FirstNameInputField from "../components/profile/FirstNameInputField";
import LastNameInputField from "../components/profile/LastNameInputField";
import EmailAddressInputField from "../components/profile/EmailAddressInputField";
import PasswordInputField from "../components/profile/PasswordInputField";

const Profile = (props) => {
    return (
        <div className="container">
            <h1 className="mt-5">Profile</h1>

            <form>
                <FirstNameInputField/>
                <LastNameInputField/>
                <EmailAddressInputField/>
                <PasswordInputField/>
            </form>
        </div>
    );
};

export default Profile;
