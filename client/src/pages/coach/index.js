import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import StoreModal from './components/storeModal';
import TableComp from './components/Table';

import './style.css'

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }

    openStoreModal = () => {
        this.setState({
            visible: true,
        });
    }

    closeStoreModal = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <>
                <StoreModal showModal={this.state.visible} closeModal={this.closeStoreModal} userDistrict={this.props.user.district}/>
                <div className="assigner-top-bar">
                    <h2>Manage Coaches</h2>
                    <Button variant="contained" color="primary" onClick={this.openStoreModal}><i className="fas fa-plus"></i> coach</Button>
                </div>
                <div class="assignor-table">
                    <TableComp userDistrict={this.props.user.district} role={this.props.user.role}/>
                </div>
            </>
        );
    }
}

export default Page;