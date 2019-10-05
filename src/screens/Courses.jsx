import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCategories, fetchSubcategories, fetchCourses } from "../redux/actions";
import 'styled-components/macro'
import TableView from "../components/base/TableView";
import CategoryCard from "../components/CategoryCard";
import SubcategoryCard from "../components/SubcategoryCard";


class Users extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await Promise.all([
      await fetchCategories(this.props.dispatch)(),
      await fetchSubcategories(this.props.dispatch)()
    ]);
  }

  render() {
    return (
      <div css={`
        flex: 6;
        display: flex;
        flex-direction: column;
        margin: 80px 150px;
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
          styles={`margin-top: 80px;`}
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
            background-color: white;
            border-radius: 10px;
            border: none;
            margin: 10px 0 0 0;
            font-weight: bold;
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