/** @format */

import React, { Component } from 'react';
import PrintOneField from './PrintOneField';
import './box.css';

class BranchDetailCard extends Component {
	render() {
		return (
            <div className='Card'>
                
				<PrintOneField name='Bank Name' value={this.props.branch.bank_name} />
				<div style={{ borderTop: '1px dotted white', margin: '3px' }} />

				<PrintOneField name='Branch' value={this.props.branch.branch} />
				<div style={{ borderTop: '1px dotted white', margin: '3px' }} />

				<PrintOneField name='Address' value={this.props.branch.address} />
				<div style={{ borderTop: '1px dotted white', margin: '3px' }} />

				<PrintOneField name='City' value={this.props.branch.city} />
				<div style={{ borderTop: '1px dotted white', margin: '3px' }} />

				<PrintOneField name='District' value={this.props.branch.district} />
				<div style={{ borderTop: '1px dotted white', margin: '3px' }} />

				<PrintOneField name='State' value={this.props.branch.state} />
			</div>
		);
	}
}

export default BranchDetailCard;
