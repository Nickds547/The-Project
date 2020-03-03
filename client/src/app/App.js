import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch, Router } from 'react-router-dom';

import { getCurrentUser } from '../utility/APIUtility';
import { ACCESS_TOKEN } from '../constants';

import { Login, Signup, Profile } from '../user';
import { LoadingIndicator, Navbar } from '../common';

import { Layout, notification } from 'antd';
import { Home, Assignor, Admin, NewAdmin} from '../pages';
import {Games} from '../components/APIGameControls/Games';
import { MyModal } from '../components';

const { Content } = Layout;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			isAuthenticated: false, //Change for Debugging
			isLoading: false
		};
		this.handleLogout = this.handleLogout.bind(this);
		this.loadCurrentUser = this.loadCurrentUser.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

		notification.config({
			placement: 'topRight',
			top: 70,
			duration: 3
		});
	}

	loadCurrentUser() {
		this.setState({
			isLoading: true
		});
		getCurrentUser()
			.then((response) => {
				this.setState({
					currentUser: response,
					isAuthenticated: true,
					isLoading: false
				});
			})
			.catch((error) => {
				this.setState({
					isLoading: false
				});
			});
	}

	componentDidMount() {
		this.loadCurrentUser();
	}

	handleLogout(redirectTo = '/', notificationType = 'success', description = "You're successfully logged out.") {
		localStorage.removeItem(ACCESS_TOKEN);

		this.setState({
			currentUser: null,
			isAuthenticated: false
		});

		this.props.history.push(redirectTo);

		notification[notificationType]({
			message: 'Online Match Simulator',
			description: description
		});
	}

	handleLogin() {
		notification.success({
			message: 'Online Match Simulator',
			description: "You're successfully logged in."
		});

		this.loadCurrentUser();
		this.props.history.push('/');
	}

	render() {
		if (this.state.isLoading) {
			return <LoadingIndicator />;
		}

		return (
			<Layout className={`app-container ${!this.state.isAuthenticated ? 'dark-background' : 'authenticated'}`}>
				{this.state.isAuthenticated ?
					<Navbar
						isAuthenticated={this.state.isAuthenticated}
						currentUser={this.state.currentUser}
						onLogout={this.handleLogout}
					/>
					:
					<></>
				}

				<Content className="app-content">
					<div className="container">
						{!this.state.isAuthenticated ?
							<Switch>
								<Route exact path="/signup" component={Signup} />
								<Route path="/" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
								<Route
									path="/users/:username"
									render={(props) => (
										<Profile
											isAuthenticated={this.state.isAuthenticated}
											currentUser={this.state.currentUser}
											{...props}
										/>
									)}
								/>
							</Switch>
							:
							<Games>
								{console.log.currentUser}
							<Switch>
									<Route path="/assignor" render={() => <NewAdmin />} />
									<Route path="/admin" render={() => <Admin />} />
								<Route path="/" render={() => <Home isAuthenticated={this.state.isAuthenticated} />} />
							</Switch>
							</Games>
						}
					</div>
				</Content>
			</Layout>
		);
	}
}

export default withRouter(App);
