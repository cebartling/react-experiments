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
                <input type="number"
                       className="form-control"
                       name={props.name}
                       id={props.name}
                       placeholder={props.placeholder}
                       value={props.content}
                       onChange={onChange}/>
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
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    placeholder: PropTypes.string,
};


export default TextField;
