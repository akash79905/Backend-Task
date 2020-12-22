/** @format */

import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import BranchDetailCard from './BranchDetailCard';
import './box.css';

class ShowData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			city: 'All Cities',
			search: null,
			offset: 0,
			currentPageData: [],
			perPage: 8,
			currentPage: 0,
			pageCount: 0,
		};
	}

	handlePageClick = (e) => {
		const selectedPage = e.selected;
		const offset = selectedPage * this.state.perPage;

		this.setState(
			{
				currentPage: selectedPage,
				offset: offset,
			},
			() => {
				this.loadMoreData();
			},
		);
	};

	async loadMoreData() {
		if (this.state.search !== '') {
			try {
				var current = this.state.search;
				let res = await axios({
					url: `https://bank-branches-details.herokuapp.com/api/branches/${this.state.city}/${this.state.search}/${this.state.perPage}/${this.state.offset}`,
					method: 'get',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (this.state.search === current) {
					this.setState({
						currentPageData: res.data.data,
						pageCount: Math.ceil(res.data.searchSize / this.state.perPage),
						loading: false,
					});
				}
			} catch (err) {
				console.error(err);
			}
		}
	}

	onsearchChange = (e) => {
		var current = e.target.value;
		if (current !== null && current !== '') {
			this.setState({
				loading: true,
				currentPage: 0,
				currentPageData: [],
			});
		}
		this.setState({
			search: e.target.value,
		});

		setTimeout(() => {
			if (current === this.state.search) {
				if (e.target.value !== '' && e.target.value !== null) {
					this.setState(
						{
							search: e.target.value,
							offset: 0,
							currentPage: 0,
						},
						() => {
							console.log(this.state);
							this.loadMoreData();
							console.log(this.state.currentPageData);
						},
					);
				} else {
					this.setState({
						search: '',
						offset: 0,
						currentPageData: [],
						currentPage: 0,
						pageCount: 0,
						loading: false,
					});
				}
			}
		}, 1500);
	};

	onPageSizeChange = (e) => {
		if (this.state.search === null || this.state.search === '') {
			return;
		}

		var current = e.target.value;
		this.setState({
			perPage: current,
			currentPageData: [],
			loading: true,
			pageCount: 0,
		});

		setTimeout(() => {
			if (current === this.state.perPage) {
				if (e.target.value !== '' && e.target.value !== null) {
					this.setState(
						{
							offset: 0,
							currentPage: 0,
						},
						() => {
							this.loadMoreData();
						},
					);
				} else {
					this.setState({
						offset: 0,
						currentPage: 0,
					});
				}
			}
		}, 500);
	};

	onCityChange = (e) => {
		if (this.state.city === e.target.value) {
			return;
		}

		this.setState(
			{
				city: e.target.value,
			},
			() => {
				if (this.state.pageCount > 0) {
					this.loadMoreData();
				}
			},
		);
	};

	render() {
		return (
			<div className='DataBox'>
				<h1 style={{ paddingBottom: 20, paddingTop: 10, textAlign: 'center' }}>
					Search
				</h1>

				<div className='d-flex justify-content-around'>
					<select
						className='dropdown'
						aria-label=".form-select-sm example"
						value={this.state.city}
						onChange={this.onCityChange}>
						<option value='All Cities'>
							All Cities
						</option>
						<option value='MUMBAI'>
							MUMBAI
						</option>
						<option value='DELHI'>
							DELHI
						</option>
						<option value='KOLKATA'>
							KOLKATA
						</option>
						<option value='CHENNAI'>
							CHENNAI
						</option>
						<option value='AHMEDABAD'>
							AHMEDABAD
						</option>
					</select>

					<input
						className='searchBar text-white'
						type='text'
						required
						onChange={this.onsearchChange}
					/>
				</div>

				<div style={{ height: 50 }} />

				{(this.state.search === '' || this.state.search === null) && (
					<h1
						style={{
							height: '250px',
							paddingTop: '50px',
							textAlign: 'center',
						}}>
						Search Something to Filter Branches
					</h1>
				)}

				{this.state.loading && (
					<h1
						style={{
							height: '250px',
							paddingTop: '50px',
							textAlign: 'center',
						}}>
						Loading...
					</h1>
				)}

				<div className='DetailsList justify-content-around'>
					{this.state.currentPageData.map((e) => (
						<BranchDetailCard key={e.ifsc} branch={e} />
					))}
				</div>

				<div className='d-flex justify-content-between'>
					<div>
						Page Limit :
						<input
							value={this.state.perPage}
							className='searchBar text-white'
							type='number'
							min='1'
							required
							onChange={this.onPageSizeChange}
						/>
					</div>

					{this.state.pageCount > 0 && (
						<ReactPaginate
							previousLabel={'prev'}
							nextLabel={'next'}
							breakLabel={'...'}
							breakClassName={'break-me'}
							pageCount={this.state.pageCount}
							forcePage={0}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={this.handlePageClick}
							containerClassName={'pagination'}
							subContainerClassName={'pages pagination'}
							activeClassName={'active'}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default ShowData;
