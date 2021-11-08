import React from 'react';

class CompanyDetailsCard extends React.Component {
  render() {
    return (
      <div className="companyDetails-card d-flex flex-column justify-content-between">
        <span style={{ fontSize: '12px' }}>
          <b>{this.props.title}</b>
        </span>

        <span style={{ fontSize: '15px' }}>{this.props.content}</span>
      </div>
    );
  }
}

export default CompanyDetailsCard;
