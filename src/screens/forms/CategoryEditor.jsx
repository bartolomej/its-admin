import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro';
import { withAlert } from 'react-alert';
import InputField from "../../components/base/TexInput";
import Button from "../../components/base/Button";
import { addCategory, updateCategory, deleteCategory } from "../../redux/actions";
import { getCategory } from "../../redux/selectors";
import { subscribe } from "redux-subscriber";


class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      category: {
        uid: '',
        name: '',
        description: ''
      }
    };
  }

  componentDidMount() {
    const categoryUid = this.props.match.params.uid;
    const category = getCategory(this.props.categories, categoryUid);
    if (categoryUid !== undefined) {
      this.setCategoryState({
        uid: category.uid,
        name: category.name,
        description: category.description
      });
      this.setState({ mode: 'UPDATE' });
    } else {
      this.setState({ mode: 'ADD' });
    }
    this.registerErrorListener();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  registerErrorListener = () => {
    this.unsubscribe = subscribe('education.error', state => {
      this.props.alert.error(state.education.error.message);
    });
  };

  render() {
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
          {this.state.mode === 'UPDATE' && (
            <InputField
              description={'UID'}
              value={this.state.category.uid}
              disable
            />
          )}
          <InputField
            description={'Name'}
            onInput={name => this.setCategoryState({ name })}
            value={this.state.category.name}
          />
          <InputField
            description={'Description'}
            onInput={description => this.setCategoryState({ description })}
            value={this.state.category.description}
          />
          {this.state.mode === 'UPDATE' && (
            <Button
              isLoading={this.props.loading}
              title={'REMOVE'}
              onClick={async () => {
                await deleteCategory(this.props.dispatch)(this.state.category.uid);
              }}
            />
          )}
          <Button
            isLoading={this.props.loading}
            title={this.state.mode === 'ADD' ? 'ADD' : 'UPDATE'}
            onClick={async () => {
              if (this.state.mode === 'UPDATE') {
                await updateCategory(this.props.dispatch)(this.state.category);
              } else {
                await addCategory(this.props.dispatch)(this.state.category);
              }
            }}
          />
        </div>
      </div>
    )
  }

  setCategoryState = props => {
    let category = this.state.category;
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        category[key] = props[key];
      }
    }
    this.setState({ category })
  }

}

export default connect(state => ({
  isLoading: state.education.isLoading,
  error: state.education.error,
  categories: state.education.categories,
}))(withAlert()(UserForm));