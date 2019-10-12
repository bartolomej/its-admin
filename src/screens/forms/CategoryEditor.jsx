import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import InputField from "../../components/base/TexInput";
import Button from "../../components/base/Button";
import { updateCategory } from "../../redux/actions";


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
    const category = selectCategory(this.props.categories, categoryUid);
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
  }

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
          <Button
            style={``}
            title={this.state.mode === 'ADD' ? 'ADD' : 'UPDATE'}
            onClick={async () => {
              if (this.state.mode === 'UPDATE') {
                await updateCategory(this.props.dispatch)(this.state.category);
              } else {
                await updateCategory(this.props.dispatch)(this.state.category);
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

function selectCategory (categories, uid) {
  let c = categories.filter(u => u.uid === uid);
  return c[0];
}

export default connect(state => ({
  isLoading: state.education.isLoading,
  error: state.education.error,
  categories: state.education.categories,
}))(UserForm);