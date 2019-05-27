import React from 'react';

const FirstNameInputField = (props) => {

    return (
        <div className="form-group row">
            <label htmlFor="firstName"
                   className="col-sm-2 col-form-label">
                First name
            </label>
            <div className="col-sm-5">
                <input type="text"
                       required
                       className="form-control"
                       id="firstName"
                       value=""/>
            </div>
            <div className="col-sm-5 col-form-label">
                Error text
            </div>
        </div>
    );
};

export default FirstNameInputField;
