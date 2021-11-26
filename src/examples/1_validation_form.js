import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState('Email cannot be empty')
	const [passwordError, setPasswordError] = useState('Password cannot be empty')
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError]);

	const blurHandler = (e) => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	}

	const emailHandler = (e) => {
		setEmail(e.target.value)
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError('Incorrect email')
		}
		else {
			setEmailError('')
		}
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value)
		if (e.target.value.length < 3 || e.target.value.length > 8) {
			setPasswordError('Password should be longer than 3 and less than 8 letters')
			if (!e.target.value) {
				setPasswordError('Password cannot be empty')
			}
		} else {
			setPasswordError('')
		}
	}

	return (
		<div className="app">
			<form>
				<h1>Registration</h1>
				{(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
				<input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name="email" type="text" placeholder="Enter your email ..."/>
				{(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
				<input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name="password" type="password" placeholder="Enter your password ..."/>
				<button disabled={!formValid} type='submit'>Register</button>
			</form>
		</div>
	);
}

export default App;
