import React, { Component } from "react";
import ReactMde, { commands } from "react-mde";
import * as Showdown from "showdown";
import 'styled-components/macro'
import "react-mde/lib/styles/css/react-mde-all.css";
import Button from "../../components/base/Button";
import InputField from "../../components/base/InputField";
import { updateCourse } from "../../redux/actions";
import {connect} from "react-redux";


const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const listCommands = [
  {
    commands: [
      commands.orderedListCommand,
      commands.unorderedListCommand,
      commands.checkedListCommand
    ]
  }
];

class CourseEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      title: null,
      description: null,
      tags: null,
      subcategories: null,
      content: null,
      selectedTab: 'write'
    }
  }

  componentDidMount() {
    const courseUid = this.props.match.params.uid;
    const course = selectCourse(this.props.courses, courseUid);
    this.setState({
      uid: course.uid,
      title: course.title,
      description: course.description,
      tags: course.tags,
      subcategories: course.subcategories,
      content: course.content
    });
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
            description={'Title'}
            onInput={title => this.setState({ title })}
            value={this.state.title}
          />
          <InputField
            description={'Description'}
            onInput={description => this.setState({ description })}
            value={this.state.description}
          />
          <InputField
            description={'Tags'}
            onInput={tags => this.setState({ tags })}
            value={this.state.tags}
          />
          <InputField
            description={'Subcategories'}
            onInput={subcategories => this.setState({ subcategories })}
            value={this.state.subcategories}
          />
          <ReactMde
            commands={listCommands}
            value={this.state.content}
            onChange={content => this.setState({ content })}
            selectedTab={this.state.selectedTab}
            onTabChange={selectedTab => this.setState({ selectedTab })}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
          <Button
            style={``}
            title={'UPDATE'}
            onClick={async () => {
              await updateCourse(this.props.dispatch)(this.state);
            }}
          />
        </div>
      </div>
    );
  }

}

function selectCourse (courses, uid) {
  let c = courses.filter(u => u.uid === uid);
  return c[0];
}

export default connect(state => ({
  isLoading: state.course.isLoading,
  error: state.course.error,
  courses: state.course.courses,
}))(CourseEditor);