import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro';
import { withAlert } from 'react-alert';
import { updateCategory, deleteCategory } from "../../redux/actions";
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
    this.setState({ mode: categoryUid !== undefined ? 'update' : 'create', });
    this.registerListeners();
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  registerListeners = () => {
    // subscribes to education.error state changes
    this.unsubscribe = subscribe('education.error', state => {
      this.props.alert.error(state.education.error.message);
    });
    // subscribes to UPDATE_CATEGORY_SUCCESS action
    this.props.onAction(UPDATE_CATEGORY_SUCCESS, action => {
      this.props.alert.info('Successfully updated category');
    });
  };

  render () {
    const categoryUid = this.props.match.params.uid;
    const category = getCategory(this.props.categories, categoryUid);

    if (this.props.loading || !this.state.category) {
      return <h3>Loading...</h3>
    }
    return (
      <div>
        <Form
          type={this.state.mode}
          onSubmit={this.props.updateCategory}
          onDelete={this.props.deleteCategory}
          formElements={[
            {
              type: 'text',
              data: category.uid,
              key: 'uid',
              title: 'UID',
              description: 'Universally Unique Identification',
              disabled: true
            },
            {
              type: 'text',
              data: category.name,
              key: 'name',
              title: 'Name',
            },
            {
              type: 'text',
              data: category.description,
              key: 'description',
              title: 'Description',
            }
          ]}
        />
      </div>
    );
  }

}

// connect redux store to props
export default connect(({ education }) => ({
  loading: education.isLoading,
  error: education.error,
  categories: education.categories,
}), dispatch => ({
  onAction: onAction(dispatch),
  deleteCategory: deleteCategory(dispatch),
  updateCategory: updateCategory(dispatch)
}))(withAlert()(UserForm));