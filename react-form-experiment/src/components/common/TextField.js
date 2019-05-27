import React from 'react';
import PropTypes from "prop-types";

const TextField = (props) => {

    const onChange = (e) => {
        props.onChange(e);
    };

    const renderInputWithoutAutoComplete = () => {
        return (
            <input type="text"
                   className="form-control"
                   name={props.name}
                   id={props.name}
                   placeholder={props.placeholder}
                   value={props.content}
                   onChange={onChange}/>
        );
    };

    const renderInputWithAutoComplete = () => {
        return (
            <input type="text"
                   className="form-control"
                   name={props.name}
                   id={props.name}
                   placeholder={props.placeholder}
                   value={props.content}
                   onChange={onChange}
                   autoComplete={props.autoComplete}/>
        );
    };

    return (
        <div className="form-group row">
            <label htmlFor={props.name}
                   className="col-sm-2 col-form-label">{props.title}</label>
            <div className="col-sm-5">
                {props.autoComplete ? renderInputWithAutoComplete() : renderInputWithoutAutoComplete()}
            </div>
            <div className="col-sm-5 col-form-label">
                Error text
            </div>
        </div>
    );
};

TextField.defaultProps = {
    autoComplete: undefined
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
    autoComplete: PropTypes.string
};


export default TextField;
