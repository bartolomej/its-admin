import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchCategories, fetchSubcategories, fetchCourses } from "../redux/actions";
import 'styled-components/macro';
import { subscribe } from "redux-subscriber";
import Table from '../components/Table';


class Courses extends Component {

  constructor (props) {
    super(props);
    this.props = props;
  }

  componentDidMount = async () => {
    // fetch data if no data is found in store
    if (
      this.props.courses.length === 0 ||
      this.props.categories.length === 0 ||
      this.props.subcategories.length === 0
    ) {
      await Promise.all([
        await this.props.fetchCategories(),
        await this.props.fetchSubcategories(),
        await this.props.fetchCourses()
      ]);
    }
    this.registerErrorListener();
  };

  componentWillUnmount () {
    // this.unsubscribe();
  }

  registerErrorListener = () => {
    // subscribe to error state change
    this.unsubscribe = subscribe('education.error', state => {
      this.props.alert.error(state.education.error.message);
    });
  };

  onCategoryEdit = category => {
    this.props.history.push(`/category/${category.uid}`);
  };

  onSubcategoryEdit = subcategory => {
    this.props.history.push(`/subcategory/${subcategory.uid}`);
  };

  onCourseEdit = course => {
    this.props.history.push(`/course/${course.uid}`);
  };

  render () {
    return (
      <div>
        <Table
          title="Categories"
          style={`margin-bottom: 20px`}
          onAdd={() => this.props.history.push('/add_category')}
          isLoading={this.props.loading}
          height={300}
          data={this.props.categories}
          columns={[
            { type: 'text', title: 'Name', key: 'name', width: 200 },
            { type: 'text', title: 'Description', key: 'description', width: 400 },
            { type: 'action', title: 'Actions', key: 'action', width: 100, onEdit: this.onCategoryEdit }
          ]}
        />
        <Table
          title="Subcategories"
          style={`margin-bottom: 20px`}
          onAdd={() => this.props.history.push('/add_subcategory')}
          isLoading={this.props.loading}
          height={300}
          data={this.props.subcategories}
          columns={[
            { type: 'text', title: 'Name', key: 'name', width: 200 },
            { type: 'text', title: 'Description', key: 'description', width: 400 },
            { type: 'action', title: 'Actions', key: 'action', width: 100, onEdit: this.onSubcategoryEdit }
          ]}
        />
        <Table
          title="Courses"
          onAdd={() => this.props.history.push('/add_course')}
          isLoading={this.props.loading}
          height={600}
          data={this.props.courses.map(c => ({...c, tags: c.tags.join(', ')}))}
          columns={[
            { type: 'text', title: 'Title', key: 'title', width: 200 },
            { type: 'text', title: 'Description', key: 'description', width: 200 },
            { type: 'text', title: 'Tags', key: 'tags', width: 200 },
            { type: 'action', title: 'Actions', key: 'action', width: 100, onEdit: this.onCourseEdit }
          ]}
        />
      </div>
    )
  }

}

export default connect(state => ({
    loading: state.education.loading,
    error: state.education.error,
    categories: state.education.categories,
    subcategories: state.education.subcategories,
    courses: state.education.courses,
  }),
  dispatch => ({
    fetchCategories: fetchCategories(dispatch),
    fetchSubcategories: fetchSubcategories(dispatch),
    fetchCourses: fetchCourses(dispatch)
  })
)(withRouter(Courses));