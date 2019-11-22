import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import { Col, Panel, Row } from "rsuite";
import ChartistExample from '../components/ChartistExample';


class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Panel className="dashboard" header={<h3>Dashboard</h3>}>

        <Row gutter={30} className="header">
          <Col xs={8}>
            <Panel className="trend-box">
              <img className="chart-img" src={'https://raw.githubusercontent.com/rsuite/rsuite-management-system/master/src/images/charts/pv.svg'} />
              <div className="title">Page Views </div>
              <div className="value">281,358</div>
            </Panel>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col xs={16}>
            <ChartistExample title="Page Views Trends by Week" type="Line" />
          </Col>
        </Row>

      </Panel>
    )
  }

}


export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(Dashboard);