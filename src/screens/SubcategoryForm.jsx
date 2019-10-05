import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import {far, faUser} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputField from "../components/base/InputField";


class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const subcategoryUid = this.props.match.params.uid;
    const subcategory = selectCategory(this.props.subcategories, subcategoryUid);
    return (
      <div
        css={`
          display: flex;
          flex-direction: column;
          flex: 2;
          margin: 80px 150px;
        `}>
        <div
          css={`
            display: flex;
            flex: 0.5;
            flex-direction: column;
          `}>
          <InputField
            description={'UID'}
            onInput={console.log}
            value={subcategory.uid}
            disable
          />
          <InputField
            description={'Name'}
            onInput={console.log}
            value={subcategory.name}
          />
          <InputField
            description={'Description'}
            onInput={console.log}
            value={subcategory.description}
          />
          <InputField
            description={'Category'}
            onInput={console.log}
            value={subcategory.category}
          />
        </div>
      </div>
    )
  }

}

function selectCategory (categories, uid) {
  let c = categories.filter(u => u.uid === uid);
  return c[0];
}

export default connect(state => ({
  isLoading: state.course.isLoading,
  error: state.course.error,
  subcategories: state.course.subcategories,
}))(UserForm);