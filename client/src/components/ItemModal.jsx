import React from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class ItemModal extends React.Component {
	state = {
		isOpenModal: false,
		name: ""
	};

	toggle = () => {
		this.setState({ isOpenModal: !this.state.isOpenModal });
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();
		const newItem = {
			name: this.state.name
		};

		this.props.addItem(newItem);

		this.toggle();
	};

	render() {
		return (
			<div>
				<Button color="dark" style={{ marginBottom: "2rem" }} onClick={this.toggle}>
					Add Item
				</Button>
				<Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item">Item</Label>
								<Input
									type="text"
									name="name"
									id="item"
									placeholder="Add shopping item"
									onChange={this.onChange}
								/>
								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Add Item
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ addItem }
)(ItemModal);
