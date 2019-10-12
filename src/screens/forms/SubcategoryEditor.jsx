import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import InputField from "../../components/base/TexInput";
import Button from "../../components/base/Button";
import {addSubcategory, updateSubcategory} from "../../redux/actions";
import OptionInput from "../../components/base/OptionInput";


class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      subcategory: {
        uid: '',
        name: '',
        description: '',
        category: ''
      }
    };
  }

  componentDidMount() {
    const subcategoryUid = this.props.match.params.uid;
    const subcategory = selectCategory(this.props.subcategories, subcategoryUid);
    if (subcategoryUid !== undefined) {
      this.setSubcategoryState({
        uid: subcategory.uid,
        name: subcategory.name,
        description: subcategory.description,
        category: subcategory.category
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
              value={this.state.subcategory.uid}
              disable
            />
          )}
          <InputField
            description={'Name'}
            onInput={name => this.setSubcategoryState({ name })}
            value={this.state.subcategory.name}
          />
          <InputField
            description={'Description'}
            onInput={description => this.setSubcategoryState({ description })}
            value={this.state.subcategory.description}
          />
          <OptionInput
            onChange={uid => this.setSubcategoryState({ category: uid })}
            value={this.state.subcategory.category}
            options={this.props.categories.map(c => ({ value: c.uid, name: c.name }))}
          />
          <Button
            style={``}
            title={this.state.mode === 'ADD' ? 'ADD' : 'UPDATE'}
            onClick={async () => {
              if (this.state.mode === 'UPDATE') {
                await updateSubcategory(this.props.dispatch)(this.state.subcategory)
              } else {
                await addSubcategory(this.props.dispatch)(this.state.subcategory)
              }
            }}
          />
        </div>
      </div>
    )
  }

  setSubcategoryState = props => {
    let subcategory = this.state.subcategory;
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        subcategory[key] = props[key];
      }
    }
    this.setState({ subcategory })
  }

}

function selectCategory (categories, uid) {
  let c = categories.filter(u => u.uid === uid);
  return c[0];
}

export default connect(state => ({
  isLoading: state.education.isLoading,
  error: state.education.error,
  subcategories: state.education.subcategories,
  categories: state.education.categories
}))(UserForm);