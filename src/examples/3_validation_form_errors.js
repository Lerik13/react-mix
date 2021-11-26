import { useEffect, useState } from 'react';
import './App.css';
const ERROR_EMPTY_FIELD = `Field could not be empty`

const useValidation = (value, validations) => {
	const [isEmpty, setIsEmpty] = useState(true)
	const [minLengthError, setMinLengthError] = useState(false)
	const [maxLengthError, setMaxLengthError] = useState(false)
	const [isEmail, setIsEmail] = useState(false)
	const [inputValid, setInputValid] = useState(false)
	const [errors, setErrors] = useState([ERROR_EMPTY_FIELD])

	useEffect(() => {
		setErrors([]);

		for (const validation in validations) {
			// eslint-disable-next-line default-case
			switch (validation) {
				case 'minLength':
					if (value.length < validations[validation]) {
						setMinLengthError(true)
						setErrors(prev => [...prev, `Incorrect length of field (min length is ${validations[validation]})`]);
					 } else {
						setMinLengthError(false)
					 }
					break;
				case 'isEmpty':
					if (value) {
						setIsEmpty(false)
					 } else {
						setIsEmpty(true)
						setErrors(prev => [...prev, ERROR_EMPTY_FIELD]);
					 }
					break;
				case 'isEmail':
					const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (re.test(String(value).toLowerCase())) {
						setIsEmail(true)
					} else {
						setIsEmail(false)
						setErrors(prev => [...prev, `Is not a valid email address`]);
					}
					break;
				case 'maxLength' :
					if (value.length > validations[validation]) {
						setMaxLengthError(true)
						setErrors(prev => [...prev, `Incorrect length of field (max length is ${validations[validation]})`]);
					} else {
						setMaxLengthError(false)
					}
					break;
			}
		}
		//console.log(...errors);
		console.log(JSON.stringify(errors));
	}, [value])

	useEffect(() => {
		if (errors.length === 0) {
			setInputValid(true)
		} else {
			setInputValid(false)
		}

	}, [isEmpty, isEmail, minLengthError, maxLengthError])

	return {
		inputValid,
		errors
	}
}

const useInput = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue)
	const [isDirty, setIsDirty] = useState(false)
	const valid = useValidation(value, validations)

	const onChange = (e) => {
		setValue(e.target.value)
	}

	const onBlur = (e) => {
		setIsDirty(true)
	}

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...valid
	}
}

function App() {
	const email = useInput('', {isEmpty: true, minLength: 6, isEmail: true})
	const password = useInput('', {isEmpty: true, minLength: 3, maxLength: 8})

	return (
		<div className="app">
			<form>
				<h1>Registration</h1>
				{(email.isDirty && !email.inputValid) && (email.errors.map((error) => <div style={{color: 'red'}}>{error}</div>))}
				<input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name="email" type="text" placeholder="Enter your email ..."/>
				{(password.isDirty && !password.inputValid) && (password.errors.map((error) => <div style={{color: 'red'}}>{error}</div>))}
				<input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} name="password" type="password" placeholder="Enter your password ..."/>
				<button disabled={!email.inputValid || !password.inputValid} type='submit'>Register</button>
			</form>
		</div>
	);
}

export default App;
