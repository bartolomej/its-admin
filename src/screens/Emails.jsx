import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchEmails } from "../redux/actions";
import 'styled-components/macro';
import TableView from "../components/base/TableView";
import { subscribe } from "redux-subscriber";
import EmailCard from "../components/EmailCard";


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
      <div css={`
        margin: 60px 220px;
      `}>
        <TableView
          isLoading={this.props.loading}
          onAdd={() => console.log('Adding email...')}
          title={'Sent emails'}
          columns={[
            { title: '', flex: 0.5 },
            { title: 'from', flex: 1 },
            { title: 'to', flex: 1 },
            { title: 'subject', flex: 0.5 },
            { title: 'text', flex: 1 },
            { title: 'datetime', flex: 0.5 },
            { title: '', flex: 0.5 }
          ]}
          rows={
            this.props.emails.map(c => (
              <EmailCard
                key={c.uid}
                uid={c.uid}
                fromAddress={c.fromAddress}
                toAddress={c.toAddress}
                datetime={c.datetime}
                subject={c.subject}
                text={c.text}
              />
            ))
          }
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