import React, { Component } from 'react';
import { connect } from "react-redux";
import 'styled-components/macro'
import InputField from "../../components/base/InputField";
import Button from "../../components/base/Button";
import { updateSubcategory } from "../../redux/actions";


class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      name: null,
      description: null,
      category: null
    };
  }

  componentDidMount() {
    const subcategoryUid = this.props.match.params.uid;
    const subcategory = selectCategory(this.props.subcategories, subcategoryUid);
    this.setState({
      uid: subcategory.uid,
      name: subcategory.name,
      description: subcategory.description,
      category: subcategory.category
    })
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
          <InputField
            description={'UID'}
            value={this.state.uid}
            disable
          />
          <InputField
            description={'Name'}
            onInput={name => this.setState({ name })}
            value={this.state.name}
          />
          <InputField
            description={'Description'}
            onInput={description => this.setState({ description })}
            value={this.state.description}
          />
          <InputField
            description={'Category'}
            onInput={category => this.setState({ category })}
            value={this.state.category}
          />
          <Button
            style={``}
            title={'UPDATE'}
            onClick={async () => {
              await updateSubcategory(this.props.dispatch)(this.state)
            }}
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