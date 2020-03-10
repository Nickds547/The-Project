import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Modal } from 'antd';

class StoreModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.props.closeModal();
    }

    render() {
        return (
            <>
                <Modal
                    visible={this.props.showModal}
                    onCancel={this.onClose}
                    closable
                    okText="Save"
                >
                    <p className="addAssignor-title">Add Assignor</p>
                    <form className="addAssignor-form">
                        <TextField id="standard-basic" label="Name" />
                        <TextField id="standard-basic" label="E-Mail" />
                        <TextField id="standard-basic" label="District" />
                        <TextField id="standard-basic" label="School" />
                    </form>
                </Modal>
            </>
        )
    }
}

export default StoreModal;