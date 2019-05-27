import React from 'react';
import PropTypes from "prop-types";

const TextField = (props) => {

    const onChange = (e) => {
        props.onChange(e);
    };

    return (
        <div className="form-group row">
            <label htmlFor={props.name}
                   className="col-sm-2 col-form-label">{props.title}</label>
            <div className="col-sm-5">
                <input type="password"
                       className="form-control"
                       name={props.name}
                       id={props.name}
                       onChange={onChange}
                       autoComplete="new-password"/>
            </div>
            <div className="col-sm-5 col-form-label">
                Error text
            </div>
        </div>
    );
};

TextField.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextField;
