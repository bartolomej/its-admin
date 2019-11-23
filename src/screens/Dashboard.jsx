import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro';
import styled from "styled-components";
import ChartistExample from '../components/ChartistExample';
import logo from '../assets/pv.svg';


class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Container>

        <StatsContainer>
          <StatsCard>
            <img className="chart-img" src={logo}  alt="test"/>
            <div className="title">Page Views </div>
            <div className="value">281,358</div>
          </StatsCard>
          <StatsCard>
            <img className="chart-img" src={logo}  alt="test"/>
            <div className="title">Page Views </div>
            <div className="value">281,358</div>
          </StatsCard>
        </StatsContainer>

        <StatsCard>
          <ChartistExample title="Page Views Trends by Week" type="Line" />
        </StatsCard>

      </Container>
    )
  }

}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: normal;
`;

const StatsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StatsCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;


export default connect(state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  users: state.user.users,
}))(Dashboard);