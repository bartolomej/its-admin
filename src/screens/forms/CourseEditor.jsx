import React, { Component } from "react";
import ReactMde, { commands } from "react-mde";
import * as Showdown from "showdown";
import 'styled-components/macro'
import "react-mde/lib/styles/css/react-mde-all.css";
import { withAlert } from 'react-alert'
import Button from "../../components/Button";
import InputField from "../../components/TextInput";
import { addCourse, deleteCourse, updateCourse } from "../../redux/actions";
import { onAction } from 'redux-action-watch/lib/actionCreators';
import { connect } from "react-redux";
import { getCourse } from "../../redux/selectors";
import { subscribe } from "redux-subscriber";
import { UPDATE_COURSE_SUCCESS } from "../../redux/action-types";
import showdownKatex from 'showdown-katex';
import showdownHighlight from 'showdown-highlight';

Showdown.setFlavor('github');

// TODO: test showdown plugins
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: [
    //showdownHighlight, doesn't work
    showdownKatex({
      displayMode: true,
      throwOnError: true,
      errorColor: '#ff0000',
      delimiters: [
        { left: "$", right: "$", display: false },
        { left: '~', right: '~', display: false, asciimath: true },
      ]
    }),
  ],
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

  constructor (props) {
    super(props);
    this.state = {
      mode: '',
      selectedTab: 'write',
      course: {
        uid: '',
        title: '',
        description: '',
        tags: [],
        subcategories: [],
        content: '',
      }
    }
  }

  componentDidMount () {
    this.setLocalState();
    this.registerListeners();
    this.configureTextArea();
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  configureTextArea = () => {
    // adjust text area based on text content
    setTimeout(() => {
      window.adjustTextArea();
    }, 0);
  };

  setLocalState = () => {
    const courseUid = this.props.match.params.uid;
    const course = getCourse(this.props.courses, courseUid);
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
  };

  registerListeners = () => {
    this.unsubscribe = subscribe('education.error', state => {
      this.props.alert.error(state.education.error.message);
    });
    this.props.onAction(UPDATE_COURSE_SUCCESS, action => {
      this.props.alert.info('Successfully updated course');
    });
  };

  render () {
    return (
      <div
        css={`
          display: flex;
          flex-direction: column;
          flex: 2;
        `}
      >
        <div
          css={`
            display: flex;
            flex: 0.5;
            flex-direction: column;
          `}
        >
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
            onInput={tags => this.setCourseState({ tags: tags.split(', ') })}
            value={this.state.course.tags ? this.state.course.tags.join(', ') : ''}
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
            onChange={content => {
              this.setCourseState({ content });
            }}
            selectedTab={this.state.selectedTab}
            onTabChange={selectedTab => {
              this.setState({ selectedTab });
              if (selectedTab === 'write') {
                this.configureTextArea();
              }
            }}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            css={`
              margin: 40px 0;
              .mde-header {}
              .mde-text { outline: none; }
              .mde-preview { background-color: #fff; }
              .mde-preview pre { background-color: #f6f8fa; }
              .mde-preview img { max-width: 600px; }
              button { outline: none; }
              .mde-text  {
                font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                font-size: 14px;
                line-height: 1.5; 
              }
            `}
          />
          {this.state.mode === 'UPDATE' && (
            <Button
              isLoading={this.props.loading}
              title={'REMOVE'}
              onClick={async () => {
                await deleteCourse(this.props.dispatch)(this.state.course.uid);
              }}
            />
          )}
          <Button
            style={``}
            title={this.state.mode === 'ADD' ? 'ADD' : 'UPDATE'}
            onClick={async () => {
              if (this.state.mode === 'UPDATE') {
                await updateCourse(this.props.dispatch)(this.state.course);
              } else {
                await addCourse(this.props.dispatch)(this.state.course);
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


export default connect(state => ({
  isLoading: state.education.isLoading,
  error: state.education.error,
  courses: state.education.courses,
  subcategories: state.education.subcategories
}), dispatch => ({
  onAction: onAction(dispatch),
  dispatch
}))(withAlert()(CourseEditor));