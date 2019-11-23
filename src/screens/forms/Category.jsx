import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro';
import { withAlert } from 'react-alert';
import { addCategory, updateCategory, deleteCategory } from "../../redux/actions";
import { getCategory } from "../../redux/selectors";
import { subscribe } from "redux-subscriber";
import { onAction } from 'redux-action-watch/lib/actionCreators';
import { UPDATE_CATEGORY_SUCCESS } from "../../redux/action-types";
import Form from "../../components/Form";


class UserForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      mode: '',
      category: null
    };
  }

  componentDidMount () {
    const categoryUid = this.props.match.params.uid;
    const category = getCategory(this.props.categories, categoryUid);
    if (categoryUid !== undefined) {
      this.setState({category});
      this.setState({ mode: 'update' });
    } else {
      this.setState({ mode: 'create' });
    }
    this.registerListeners();
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  registerListeners = () => {
    this.unsubscribe = subscribe('education.error', state => {
      this.props.alert.error(state.education.error.message);
    });
    this.props.onAction(UPDATE_CATEGORY_SUCCESS, action => {
      this.props.alert.info('Successfully updated category');
    });
  };

  render () {
    if (this.props.loading || !this.state.category) {
      return <h3>Loading...</h3>
    }
    return (
      <div>
        <Form
          type={this.state.mode}
          onSubmit={console.log}
          formElements={[
            {
              type: 'text',
              data: this.state.category.uid,
              key: 'uid',
              title: 'UID',
              description: 'Universally Unique Identification',
              disabled: true
            },
            {
              type: 'text',
              data: this.state.category.name,
              key: 'name',
              title: 'Name',
            },
            {
              type: 'text',
              data: this.state.category.description,
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
  loading: state.education.isLoading,
  error: state.education.error,
  categories: state.education.categories,
}), dispatch => ({
  onAction: onAction(dispatch),
  dispatch
}))(withAlert()(UserForm));