import React from "react";
import { Provider } from "react-redux";
import { Container } from "reactstrap";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar.jsx";
import ShoppingList from "./components/ShoppingList.jsx";
import ItemModal from "./components/ItemModal";

const App = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<AppNavbar />
				<Container>
					<ItemModal />
					<ShoppingList />
				</Container>
			</div>
		</Provider>
	);
};

export default App;
