import React from 'react';

const LastNameInputField = (props) => {
    
    return (
        <div className="form-group row">
            <label htmlFor="lastName"
                   className="col-sm-2 col-form-label">Last name</label>
            <div className="col-sm-5">
                <input type="text"
                       className="form-control"
                       id="lastName"
                       value=""/>
            </div>
            <div className="col-sm-5 col-form-label">
                Error text
            </div>
        </div>
    );
};

export default LastNameInputField;
