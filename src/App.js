import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/home";
import Contact from "./pages/contact";
import About from "./pages/about";
import Category from "./pages/category";


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      products: [],
      selectedCategory: ""
    }
  }

  componentDidMount() {
    fetch("https://fakestoreapi.com/products/categories")
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          return Promise.reject('error 404')
        } else {
          return Promise.reject('some other error: ' + response.status)
        }
      })
      .then(response => {
        console.log(response)
        this.setState({ categories: response })
      });
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              {
                this.state.categories.map((category, index)=>{
                  return (<li key ={index}>
                  <Link  to={`/Category/?category=${category}`}>{category}</Link>
                </li>)
                })
              }
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {
                this.state.categories.map((category, index)=>{
                  return (<Route path="/Category/" element={<Category name={category} />} />)
                })
              }
          </Routes>
        </div>
      </Router>
    );
  }
}
