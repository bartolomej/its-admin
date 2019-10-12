export const getUser = (users, uid) => users.find(u => u.uid === uid);
export const getCategory = (categories, uid) => categories.find(c => c.uid === uid);
export const getSubcategory = (subcategories, uid) => subcategories.find(s => s.uid === uid);
export const getCourse = (courses, uid) => courses.find(c => c.uid === uid);