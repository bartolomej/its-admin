import React, { Component } from "react";
import ReactMde, { commands } from "react-mde";
import * as Showdown from "showdown";
import 'styled-components/macro'
import "react-mde/lib/styles/css/react-mde-all.css";
import Button from "../../components/base/Button";
import InputField from "../../components/base/TexInput";
import {addCourse, updateCourse} from "../../redux/actions";
import {connect} from "react-redux";
import OptionInput from "../../components/base/OptionInput";


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
      mode: '',
      selectedTab: 'write',
      course: {
        uid: '',
        title: '',
        description: '',
        tags: '',
        subcategories: '',
        content: '',
      }
    }
  }

  componentDidMount() {
    const courseUid = this.props.match.params.uid;
    const course = selectCourse(this.props.courses, courseUid);
    if (courseUid !== undefined) {
      this.setCourseState({
        uid: course.uid,
        title: course.title,
        description: course.description,
        tags: course.tags,
        subcategories: course.subcategories,
        content: course.content
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
              value={this.state.course.uid}
              disable
            />
          )}
          <InputField
            description={'Title'}
            onInput={title => this.setCourseState({ title })}
            value={this.state.course.title}
          />
          <InputField
            description={'Description'}
            onInput={description => this.setCourseState({ description })}
            value={this.state.course.description}
          />
          <InputField
            description={'Tags'}
            onInput={tags => this.setCourseState({ tags })}
            value={this.state.course.tags}
          />
          <InputField
            description={'Subcategories'}
            onInput={subcategories => this.setCourseState({ subcategories: subcategories.split(', ') })}
            value={this.state.course.subcategories ? this.state.course.subcategories.join(', ') : ''}
          />
          {/* TODO: implement https://react-select.com/home#fixed-options alike component
          <OptionInput
            onChange={uid => this.setCourseState({ subcategories: uid })}
            value={this.state.course.subcategories}
            options={this.props.subcategories.map(c => ({ value: c.uid, name: c.name }))}
          />*/}
          <ReactMde
            commands={listCommands}
            value={this.state.course.content}
            onChange={content => this.setCourseState({ content })}
            selectedTab={this.state.selectedTab}
            onTabChange={selectedTab => this.setState({ selectedTab })}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
          <Button
            style={``}
            title={this.state.mode === 'ADD' ? 'ADD' : 'UPDATE'}
            onClick={async () => {
              if (this.state.mode === 'UPDATE') {
                await updateCourse(this.props.dispatch)(this.state);
              } else {
                await addCourse(this.props.dispatch)(this.state);
              }
            }}
          />
        </div>
      </div>
    );
  }

  setCourseState = props => {
    let course = this.state.course;
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        course[key] = props[key];
      }
    }
    this.setState({ course })
  }

}

function selectCourse (courses, uid) {
  let c = courses.filter(u => u.uid === uid);
  return c[0];
}

export default connect(state => ({
  isLoading: state.education.isLoading,
  error: state.education.error,
  courses: state.education.courses,
  subcategories: state.education.subcategories
}))(CourseEditor);