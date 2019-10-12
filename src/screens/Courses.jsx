import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchCategories, fetchSubcategories, fetchCourses } from "../redux/actions";
import 'styled-components/macro';
import TableView from "../components/base/TableView";
import CategoryCard from "../components/CategoryCard";
import SubcategoryCard from "../components/SubcategoryCard";
import CourseCard from "../components/CourseCard";
import {subscribe} from "redux-subscriber";


class Courses extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount = async () => {
    if (
      this.props.courses.length === 0 ||
      this.props.categories.length === 0 ||
      this.props.subcategories.length === 0
    ) {
      await Promise.all([
        await fetchCategories(this.props.dispatch)(),
        await fetchSubcategories(this.props.dispatch)(),
        await fetchCourses(this.props.dispatch)()
      ]);
    }
    this.registerErrorListener();
  };

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
      <div css={`
        margin: 40px 80px;
      `}>
        <TableView
          isLoading={this.props.loading}
          onAdd={() => this.props.history.push('/add_category')}
          title={'Categories'}
          columns={[
            {title: '', flex: 0.5},
            {title: 'name', flex: 1},
            {title: 'description', flex: 1},
            {title: '', flex: 0.5}
          ]}
          rows={
            this.props.categories.map(c => (
              <CategoryCard
                key={c.uid}
                uid={c.uid}
                name={c.name}
                description={c.description}
                image={c.image}
              />
            ))
          }
        />
        <TableView
          isLoading={this.props.loading}
          onAdd={() => this.props.history.push('/add_subcategory')}
          styles={`margin-top: 30px;`}
          title={'Subcategories'}
          columns={[
            {title: '', flex: 0.5},
            {title: 'name', flex: 1},
            {title: 'description', flex: 1},
            {title: '', flex: 0.5}
          ]}
          rows={
            this.props.subcategories.map(c => (
              <SubcategoryCard
                key={c.uid}
                uid={c.uid}
                name={c.name}
                description={c.description}
                image={c.image}
              />
            ))
          }
        />
        <TableView
          isLoading={this.props.loading}
          onAdd={() => this.props.history.push('/add_course')}
          styles={`margin-top: 30px;`}
          title={'Courses'}
          columns={[
            {title: '', flex: 0.5},
            {title: 'name', flex: 1},
            {title: 'description', flex: 1},
            {title: '', flex: 0.5}
          ]}
          rows={
            this.props.courses.map(c => (
              <CourseCard
                key={c.uid}
                uid={c.uid}
                title={c.title}
                description={c.description}
                tags={c.tags}
                created={c.created}
              />
            ))
          }
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
}))(withRouter(Courses));