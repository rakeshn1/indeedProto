import React from 'react';

class Select extends React.Component {
  render() {
    return (
      <div>
        <p className={this.props.labelclass ? this.props.labelclass : 'question-label'}>
          {this.props.label}
        </p>
        <select {...this.props}>
          <option value="">{this.props.placeholder}</option>
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
