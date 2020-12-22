import React, { Component } from 'react'
import './box.css'
import BankItem from './BankItem'
import 'bootstrap/dist/css/bootstrap.min.css';

class BankList extends Component {
	constructor(props) {
        super(props);

		this.state = {
			favouriteBanks: [],
        };

        this.setData = this.setData.bind(this);
	}

    componentDidMount() {
        this.getData();
    }

	async getData(){
		if (localStorage.getItem('favouriteBanks') != null) {
            
            await this.setState({ favouriteBanks: JSON.parse(localStorage.getItem('favouriteBanks')) });
		}
	};

    storeData = () => {
        localStorage.setItem('favouriteBanks', JSON.stringify(this.state.favouriteBanks));
    }

    setData = (key, flag) => {
        
        var data = this.state.favouriteBanks;

        if (flag) {
            data = data.filter(value => value !== key);
        }
        else {
            data.push(key);
        }

        this.setState({
            favouriteBanks: data
        }, this.storeData);

        //console.log(this.state.favouriteBanks);
    }

	render() {
		return (
			<div className='BankBox'>
				<h1 style={{ paddingBottom: 20, paddingTop: 10, textAlign: 'center' }}>
					Banks
				</h1>

                <text style={{ fontSize: 15, textAlign: 'end'}} className="d-flex justify-content-end"> click on star to mark any bank favourite & then refresh</text>

				<div className='BankList'>
					{this.props.bankList.map((bank, index) => (
						<BankItem
							key={index}
							bankEntry={bank}
							setData={this.setData}
							flag={this.state.favouriteBanks.includes(bank.id)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default BankList
