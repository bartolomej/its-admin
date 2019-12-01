import React, { Component } from "react";
import ReactMde, { commands } from "react-mde";
import * as Showdown from "showdown";
import 'styled-components/macro'
import "react-mde/lib/styles/css/react-mde-all.css";
import { withAlert } from 'react-alert'
import { deleteCourse, updateCourse } from "../../redux/actions";
import { onAction } from 'redux-action-watch/lib/actionCreators';
import { connect } from "react-redux";
import { getCourse } from "../../redux/selectors";
import { subscribe } from "redux-subscriber";
import { UPDATE_COURSE_SUCCESS } from "../../redux/action-types";
import showdownKatex from 'showdown-katex';
import showdownHighlight from 'showdown-highlight';
import Form from "../../components/Form";

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


class Course extends Component {

  constructor (props) {
    super(props);
    this.state = {
      mode: '',
      selectedTab: 'write',
      content: ''
    }
  };

  componentDidMount () {
    const courseUid = this.props.match.params.uid;
    const course = getCourse(this.props.courses, courseUid);
    this.setState({
      mode: courseUid !== undefined ? 'update' : 'create',
      content: course.content
    });
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

  registerListeners = () => {
    this.unsubscribe = subscribe('education.error', state => {
      this.props.alert.error(state.education.error && state.education.error.message);
    });
    this.props.onAction(UPDATE_COURSE_SUCCESS, action => {
      this.props.alert.info('Successfully updated course');
    });
  };

  render () {
    const courseUid = this.props.match.params.uid;
    const course = getCourse(this.props.courses, courseUid);

    if (this.props.loading) {
      return <h3>Loading...</h3>
    }
    return (
      <div>
        <Form
          type={this.state.mode}
          onSubmit={(uid, course) => {
            course = {...course, content: this.state.content};
            console.log(course)
            this.props.update(uid, course);
          }}
          entityUid={course.uid}
          formElements={[
            {
              type: 'text',
              data: course.uid,
              key: 'uid',
              title: 'UID',
              description: 'Universally Unique Identification',
              disabled: true
            },
            {
              type: 'text',
              data: course.title,
              key: 'title',
              title: 'Title',
            },
            {
              type: 'text',
              data: course.description,
              key: 'description',
              title: 'Description',
            },
            {
              type: 'tag',
              data: course.tags && course.tags.map(c => ({value: c, label: c})),
              key: 'tags',
              title: 'Tags',
            },
            {
              type: 'select',
              data: course.subcategories && course.subcategories.map(c => ({value: c, label: c})),
              key: 'subcategories',
              title: 'Subcategories',
            },
          ]}
        />
        <ReactMde
          commands={listCommands}
          value={course.content}
          onChange={content => {
            this.setState({ content });
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
      </div>
    );
  }

}


export default connect(state => ({
  isLoading: state.education.isLoading,
  error: state.education.error,
  courses: state.education.courses,
  subcategories: state.education.subcategories
}), dispatch => ({
  onAction: onAction(dispatch),
  update: updateCourse(dispatch),
  delete: deleteCourse(dispatch)
}))(withAlert()(Course));