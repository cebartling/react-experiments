import React from 'react';

const EmailAddressInputField = (props) => {
    
    return (
        <div className="form-group row">
            <label htmlFor="staticEmail"
                   className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-5">
                <input type="text"
                       className="form-control"
                       id="staticEmail"
                       value="email@example.com"/>
            </div>
            <div className="col-sm-5 col-form-label">
                Error text
            </div>
        </div>
    );
};

export default EmailAddressInputField;
