import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro';
import { withAlert } from 'react-alert';
import {
  deleteSubcategory,
  updateSubcategory
} from "../../redux/actions";
import { getSubcategory } from "../../redux/selectors";
import { subscribe } from "redux-subscriber";
import { onAction } from 'redux-action-watch/lib/actionCreators';
import { UPDATE_SUBCATEGORY_SUCCESS } from "../../redux/action-types";
import Form from "../../components/Form";


class UserForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      mode: '',
    };
  }

  componentDidMount () {
    const subcategoryUid = this.props.match.params.uid;
    this.setState({ mode: subcategoryUid !== undefined ? 'update' : 'create', });
    this.registerListeners();
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  registerListeners = () => {
    this.unsubscribe = subscribe('education.error', state => {
      this.props.alert.error(state.education.error.message);
    });
    this.props.onAction(UPDATE_SUBCATEGORY_SUCCESS, action => {
      this.props.alert.info('Successfully updated subcategory');
    });
  };

  render () {
    const subcategoryUid = this.props.match.params.uid;
    const subcategory = getSubcategory(this.props.subcategories, subcategoryUid);

    if (this.props.loading) {
      return <h3>Loading...</h3>
    }
    return (
      <div>
        <Form
          type={this.state.mode}
          onSubmit={updateSubcategory}
          formElements={[
            {
              type: 'text',
              data: subcategory.uid,
              key: 'uid',
              title: 'UID',
              description: 'Universally Unique Identification',
              disabled: true
            },
            {
              type: 'text',
              data: subcategory.name,
              key: 'name',
              title: 'Name',
            },
            {
              type: 'select',
              data: subcategory.categories && subcategory.categories.map(c => ({value: c, label: c})),
              key: 'name',
              title: 'Name',
            },
            {
              type: 'text',
              data: subcategory.description,
              key: 'description',
              title: 'Description',
            }
          ]}
        />
      </div>
    );
  }
}


export default connect(state => ({
  isLoading: state.education.isLoading,
  error: state.education.error,
  subcategories: state.education.subcategories,
  categories: state.education.categories
}), dispatch => ({
  onAction: onAction(dispatch),
  update: updateSubcategory(dispatch),
}))(withAlert()(UserForm));