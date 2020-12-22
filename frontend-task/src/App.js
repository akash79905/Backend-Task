import React, { Component } from 'react';
import './App.css';
import BankList from './Components/BankList';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ShowData from './Components/ShowData';

class App extends Component {
	state = {
		list: [],
	};

	componentDidMount() {
		axios
			.get(`https://bank-branches-details.herokuapp.com/api/banks`)
			.then((res) => {
				console.log(res);
				this.setState({
					list: res.data,
				});
			});
	}

	render() {
	
		return (
			<div className='App text-white'>
				<div style={{ paddingTop: 35 }} />

				<div>
					<BankList bankList={this.state.list} />
				</div>

				<div style={{ height: 50 }}></div>

				<ShowData />

				<div style={{ height: 50 }}></div>
			</div>
		);
	}
}

export default App;
