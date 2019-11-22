import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchEmails } from "../redux/actions";
import 'styled-components/macro';
import { subscribe } from "redux-subscriber";
import Table from '../components/Table';


class Emails extends Component {

  constructor (props) {
    super(props);
    this.props = props;
  }

  componentDidMount = async () => {
    if (this.props.emails.length === 0) {
      await fetchEmails(this.props.dispatch)();
    }
    this.registerErrorListener();
  };

  componentWillUnmount () {
    this.unsubscribe();
  }

  registerErrorListener = () => {
    this.unsubscribe = subscribe('mail.error', state => {
      this.props.alert.error(state.mail.error.message);
    });
  };

  render () {
    return (
      <div>
        <Table
          title="Emails"
          isLoading={this.props.loading}
          height={300}
          data={this.props.emails}
          columns={[
            { type: 'text', title: 'Sender', key: 'fromAddress', width: 200 },
            { type: 'text', title: 'Recipient', key: 'toAddress', width: 200 },
            { type: 'text', title: 'Subject', key: 'subject', width: 100 },
            { type: 'text', title: 'Datetime', key: 'datetime', width: 200 },
            { type: 'action', title: 'Actions', key: 'action', width: 100, onEdit: this.navigateToEdit }
          ]}
        />
      </div>
    )
  }

}


export default connect(state => ({
  loading: state.mail.loading,
  error: state.mail.error,
  emails: state.mail.emails,
}))(withRouter(Emails));