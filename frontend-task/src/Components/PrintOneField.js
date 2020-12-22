import React, { Component } from 'react'
import './box.css'


class PrintOneField extends Component {
    render() {
        return (
            <div>
                <div className='d-flex justify-content-between'>
                    <div className={'CardBlock'} style={{ width:'30%', overfloWrap: 'break-word'}}> {this.props.name} </div>
					<div style={{width:'10%'}}>:</div>
					<div className={'CardBlock'} style={{width:'60%', overflowWrap: 'break-word'}}> {this.props.value} </div>
                </div>
            </div>
        )
    }
}

export default PrintOneField
