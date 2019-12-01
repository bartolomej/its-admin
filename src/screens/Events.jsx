import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import { fetchEvents } from "../redux/actions";
import { subscribe } from "redux-subscriber";
import Table from "../components/Table";


class Events extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    if (this.props.events.length === 0) {
      await fetchEvents(this.props.dispatch)();
    }
    this.registerErrorListener();
  };

  componentWillUnmount () {
    this.unsubscribe && this.unsubscribe();
  }

  registerErrorListener = () => {
    this.unsubscribe = subscribe('event.error', state => {
      this.props.alert.error(state.event.error.message);
    });
  };

  render () {
    return (
      <div>
        <Table
          title="System Events"
          isLoading={this.props.loading}
          height={600}
          data={this.props.events}
          columns={[
            { type: 'text', title: 'Id', key: 'id', width: 50 },
            { type: 'text', title: 'Type', key: 'type', width: 200 },
            { type: 'text', title: 'Creator', key: 'creator', width: 200 },
            { type: 'text', title: 'Description', key: 'description', width: 200 },
            { type: 'text', title: 'Datetime', key: 'datetime', width: 200 },
          ]}
        />
      </div>
    )
  }

}


export default connect(state => ({
  isLoading: state.event.isLoading,
  error: state.event.error,
  events: state.event.events,
}))(Events);