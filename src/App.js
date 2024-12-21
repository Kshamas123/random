//App.js

import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourse1Component';
import UserCartComponent from './components/UserCartComponent';

function App() {
	const [courses, setCourses] = useState([
		{ id: 1, 
		name: 'PUMA T-shirt', 
		price: 899, 
		image: 
'https://th.bing.com/th/id/OIP.UIkP16PxtRL3qcf6FssiyQHaJC?w=202&h=247&c=7&r=0&o=5&dpr=1.3&pid=1.7'
		},
		{ id: 2, 
		name: 'NIKE shoe', 
		price: 3999, 
		image: 
'https://th.bing.com/th/id/OIP.y9lVnNospX1llP_lQ-rsWwHaHa?w=188&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7'
		},
    { id: 3, 
      name: 'RED leather bag', 
      price: 1299, 
      image: 
  'https://th.bing.com/th/id/OIP.5Q5W6os3FmRc7y5DlW7fdAHaHa?w=207&h=207&c=7&r=0&o=5&dpr=1.3&pid=1.7'
      },
		{ id: 4, 
		name: 'Hoodie', 
		price: 799, 
		image: 
'https://th.bing.com/th/id/OIP.LP-BxVaK52CV_0Wo6VVoVQHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7'
		}
	]);

	const [cartCourses, setCartCourses] = useState([]);
	const [searchCourse, setSearchCourse] = useState('');

	const addCourseToCartFunction = (GFGcourse) => {
		const alreadyCourses = cartCourses
							.find(item => item.product.id === GFGcourse.id);
		if (alreadyCourses) {
			const latestCartUpdate = cartCourses.map(item =>
				item.product.id === GFGcourse.id ? { 
				...item, quantity: item.quantity + 1 } 
				: item
			);
			setCartCourses(latestCartUpdate);
		} else {
			setCartCourses([...cartCourses, {product: GFGcourse, quantity: 1}]);
		}
	};

	const deleteCourseFromCartFunction = (GFGCourse) => {
		const updatedCart = cartCourses
							.filter(item => item.product.id !== GFGCourse.id);
		setCartCourses(updatedCart);
	};

	const totalAmountCalculationFunction = () => {
		return cartCourses
			.reduce((total, item) => 
						total + item.product.price * item.quantity, 0);
	};

	const courseSearchUserFunction = (event) => {
		setSearchCourse(event.target.value);
	};

	const filterCourseFunction = courses.filter((course) =>
		course.name.toLowerCase().includes(searchCourse.toLowerCase())
	);

	return (
		<div className="App">
			<div id="google_translate_element"></div>
			<SearchComponent searchCourse={searchCourse} 
							courseSearchUserFunction=
								{courseSearchUserFunction} />
			<main className="App-main">
				<ShowCourseComponent
					courses={courses}
					filterCourseFunction={filterCourseFunction}
					addCourseToCartFunction={addCourseToCartFunction}
				/>

				<UserCartComponent
					cartCourses={cartCourses}
					deleteCourseFromCartFunction={deleteCourseFromCartFunction}
					totalAmountCalculationFunction={
						totalAmountCalculationFunction
					}
					setCartCourses={setCartCourses}
				/>
			</main>
		</div>
	);
}

export default App;
