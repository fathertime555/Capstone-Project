import React, { useState, useRef } from 'react';
import {Row,Form,Col,Button} from 'react-bootstrap';
import states from './states.json'
import axios from 'axios'

/////////////////////////////////////////////////////////

// add these to any place of server.js

// app.get('/testsigup', (req, res) => {
// 	var result = {
// 	  result: true, user: {
// 		user: req.query.signupinfo
// 	  }
// 	}
// 	console.log(req.query);
// 	res.send(result);
//   })

/////////////////////////////////////////////////////////





function Signup() {
	const state_options= states.states;
	const email = useRef(null);
	const psd = useRef(null);
	const username = useRef(null);
	const address1 = useRef(null);
	const address2 = useRef(null);
	const city = useRef(null);
	const state = useRef(null);
	const zip = useRef(null);
	const _email = (<Form.Control ref={email} required type="email" placeholder="Enter email" />);
	const _psd = (<Form.Control ref={psd} required type="password" placeholder="Password" />);
	const _username = (<Form.Control ref={username} required type="username" placeholder="User name" />);
	const _address2 = (<Form.Control ref={address2} placeholder="Apartment, studio, or floor" />);
	const _address1 = (<Form.Control ref={address1} required placeholder="1234 Main St" />);
	const _zip = (<Form.Control ref={zip} type="input" placeholder="zip" />);
	const _city = (<Form.Control ref={city} type="input" placeholder="city" />);
	const _state = (<Form.Select ref={state} defaultValue="Choose...">
		<option>---Select---</option>
		{state_options.map((value)=>{
			return <option value={value.value}>{value.name}</option>
		})}
	</Form.Select>);

	// const [validated, setValidated] = useState(false);

	// const handleSubmit = (event) => {
	// 	const form = event.currentTarget;
	// 	if (form.checkValidity() === false) {
	// 		event.preventDefault();
	// 		event.stopPropagation();
	// }

	// setValidated(true);

	var submit = (event) => {
		event.preventDefault();
		console.log(event.target);
		var data = {
			username: username.current.value,
			password: psd.current.value,
			email: email.current.value,
			address1: address1.current.value,
			address2: address2.current.value,
			state: state.current.value,
			city: city.current.value,
			zip: zip.current.value
		}
		axios.get('/testsigup', {params:{signupinfo:data}}).then(res => {
			console.log('recive data:')
			console.log(res.data);
			console.log('data end')
		})
	}



	return (
		//changed here move onsubmit to here
		<Form onSubmit={submit}>
			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridUsername">
					<Form.Label>User Name</Form.Label>
					{_username}
				</Form.Group>
				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Email</Form.Label>
					{_email}
				</Form.Group>
			</Row>

			<Form.Group as={Col} controlId="formGridPassword">
				<Form.Label>Password</Form.Label>
				{_psd}
			</Form.Group>

			<Form.Group as={Col} controlId="formGridPasswordRepeat">
				<Form.Label>Repeat Password</Form.Label>
				<Form.Control required type="password" placeholder="Repeat Password" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formGridAddress1">
				<Form.Label>Address</Form.Label>
				{_address1}
			</Form.Group>

			<Form.Group className="mb-3" controlId="formGridAddress2">
				<Form.Label>Address 2</Form.Label>
				{_address2}
			</Form.Group>

			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>City</Form.Label>
					{_city}
				</Form.Group>

				<Form.Group as={Col} controlId="formGridState">
					<Form.Label>State</Form.Label>
					{_state}
				</Form.Group>

				<Form.Group as={Col} controlId="formGridZip">
					<Form.Label>Zip</Form.Label>
					{_zip}
				</Form.Group>
			</Row>

			{/* add value submit here */}
			<Button variant="primary" type="submit" value='submit'>
				Submit
			</Button>



		</Form>
	);
}

export default Signup;