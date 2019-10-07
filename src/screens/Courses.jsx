import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCategories, fetchSubcategories, fetchCourses } from "../redux/actions";
import 'styled-components/macro'
import TableView from "../components/base/TableView";
import CategoryCard from "../components/CategoryCard";
import SubcategoryCard from "../components/SubcategoryCard";
import CourseCard from "../components/CourseCard";


class Users extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await Promise.all([
      await fetchCategories(this.props.dispatch)(),
      await fetchSubcategories(this.props.dispatch)(),
      await fetchCourses(this.props.dispatch)()
    ]);
  }

  render() {
    return (
      <div css={`
        flex: 6;
        display: flex;
        flex-direction: column;
        margin: 50px 80px;
      `}>
        <TableView
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
  isLoading: state.course.isLoading,
  error: state.course.error,
  categories: state.course.categories,
  subcategories: state.course.subcategories,
  courses: state.course.courses,
}))(Users);