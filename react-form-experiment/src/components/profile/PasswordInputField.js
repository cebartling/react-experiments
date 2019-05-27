import React from 'react';

const PasswordInputField = (props) => {
    
    return (
        <div className="form-group row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-5">
                <input type="password"
                       className="form-control"
                       id="inputPassword"
                       placeholder="Password"/>
            </div>
            <div className="col-sm-5 col-form-label">
                Error text
            </div>
        </div>
    );
};

export default PasswordInputField;
