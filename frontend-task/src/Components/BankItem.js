/** @format */

import React, { Component } from 'react';
import './box.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

class BankItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFavourite: false
        };
    }

    /*setData = () => {
        console.log(this.state.favouriteBanks, 'before');
        localStorage.setItem(
            'favouriteBanks',
            JSON.stringify(this.state.favouriteBanks),
        );
        this.setState({
            favouriteBanks: JSON.parse(localStorage.getItem('favouriteBanks'))
        })
        console.log(
            this.state.favouriteBanks,
            'from local',
        );
    };
*/
    change = () => {

        this.props.setData(this.props.bankEntry.id, this.state.isFavourite);

        this.setState({
            isFavourite : !this.state.isFavourite
        })

    }

    componentDidMount() {
        this.setState({
            isFavourite: this.props.flag
        });
    }

    render() {

		return (
			<div className='BankItem'>
				{!this.state.isFavourite && (
					<AiOutlineStar
						onClick={this.change}
						style={{ flexShrink: '0', alignSelf: 'center' }}
					/>
				)}
				{this.state.isFavourite && (
					<AiFillStar
						onClick={this.change}
						style={{ flexShrink: '0', alignSelf: 'center', color: 'gold' }}
					/>
				)}
				<div style={{ marginLeft: '25px', wordBreak: 'break-word' }}>
					{this.props.bankEntry.name}
				</div>
			</div>
		);
	}
}

export default BankItem;
