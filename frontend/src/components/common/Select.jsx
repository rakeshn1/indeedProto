import React from "react";

class Select extends React.Component {
  render() {
    return (
      <div>
        <p
          className={
            this.props.labelclass ? this.props.labelclass : "question-label"
          }
        >
          {this.props.label}
          {this.props.required && <span className="required">*</span>}
        </p>
        <select {...this.props}>
          {this.props.placeholder && (
            <option value="">{this.props.placeholder}</option>
          )}
          {this.props.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Select;
