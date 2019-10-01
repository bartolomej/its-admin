import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCategories, fetchSubcategories, fetchCourses } from "../redux/actions";
import 'styled-components/macro'


class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      selectedSubcategory: null,
      selectedCourse: null
    };
  }

  async componentDidMount() {
    await Promise.all([
      await fetchCategories(this.props.dispatch)(),
      await fetchSubcategories(this.props.dispatch)()
    ]);
  }

  render() {
    const { categories, subcategories, courses } = this.props;
    const { selectedSubcategory, selectedCategory, selectedCourse } = this.state;

    return (
      <div
        css={`
          display: flex;
          flex-direction: row;
          flex: 5;
        `}>
        <SelectableList
          title={'Categories'}
          titleKey={'name'}
          list={categories}
          onSelect={async category => {
            this.setState({
              selectedCategory: category.uid,
              selectedSubcategory: null,
              selectedCourse: null
            });
          }}
        />
        <SelectableList
          title={`Subcategories`}
          titleKey={'name'}
          list={selectSubcategories(subcategories, selectedCategory)}
          onSelect={async subcategory => {
            this.setState({
              selectedSubcategory: subcategory.uid,
              selectedCourse: null
            }, async () => {
              await fetchCourses(this.props.dispatch)(
                this.state.selectedSubcategory);
            });
          }}
        />
        <SelectableList
          title={`Courses`}
          titleKey={'title'}
          list={selectCourses(courses, selectedSubcategory)}
          onSelect={async course => {
            this.setState({
              selectedCourse: course.uid
            });
          }}
        />
        <CoursesList/>
      </div>
    )
  }

}


function CoursesList () {
  return (
    <div css={`flex: 2`}>
      Courses
    </div>
  )
}

function SelectableList ({ title, list, onSelect, titleKey }) {
  return (
    <div
      css={`
        display: flex;
        flex: 1;
        flex-direction: column;
      `}>
      <h3>{title}</h3>
      {list.map((item, i) => (
        <button
          css={`
            background: none;
            border: 1px solid black;
            cursor: pointer;
            outline: none;
            padding: 10px;
          `}
          key={item.uid ? item.uid : i}
          onClick={() => onSelect(item)}
        >
          { item[titleKey] }
        </button>
      ))}
    </div>
  )
}

function selectSubcategories (subcategories, categoryUid) {
  if (categoryUid === null) return [];
  return subcategories.filter(s => s.category === categoryUid);
}

function selectCourses (courses, subcategoryUid) {
  if (subcategoryUid === null) return [];
  return courses.filter(c => c.subcategory.includes(subcategoryUid));
}

export default connect(state => ({
  isLoading: state.course.isLoading,
  error: state.course.error,
  categories: state.course.categories,
  subcategories: state.course.subcategories,
  courses: state.course.courses,
}))(Users);