import { useEffect, useState } from 'react';
import './App.css';

const useValidation = (value, validations) => {
	const [isEmpty, setIsEmpty] = useState(true)
	const [minLengthError, setMinLengthError] = useState(false)
	const [maxLengthError, setMaxLengthError] = useState(false)
	const [isEmail, setIsEmail] = useState(false)
	const [inputValid, setInputValid] = useState(false)

	useEffect(() => {
		for (const validation in validations) {
			// eslint-disable-next-line default-case
			switch (validation) {
				case 'minLength':
					value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
					break;
				case 'isEmpty':
					value ? setIsEmpty(false) : setIsEmpty(true)
					break;
				case 'isEmail':
					const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					re.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true)
					break;
				case 'maxLength' :
					value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
					break;
			}
		}
	}, [value])

	useEffect(() => {
		if (isEmpty || maxLengthError || minLengthError || isEmail) {
			setInputValid(false)
		} else {
			setInputValid(true)
		}

	}, [isEmpty, isEmail, minLengthError, maxLengthError])

	return {
		isEmpty,
		minLengthError,
		maxLengthError,
		isEmail,
		inputValid
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
				{(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Field could not be empty</div>}
				{(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Incorrect length of field</div>}
				{(email.isDirty && email.isEmail) && <div style={{color: 'red'}}>Not email</div>}
				<input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name="email" type="text" placeholder="Enter your email ..."/>
				{(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>Field could not be empty</div>}
				{(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>Incorrect length of field (too small)</div>}
				{(password.isDirty && password.maxLengthError) && <div style={{color: 'red'}}>Incorrect length of field (too long)</div>}
				<input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} name="password" type="password" placeholder="Enter your password ..."/>
				<button disabled={!email.inputValid || !password.inputValid} type='submit'>Register</button>
			</form>
		</div>
	);
}

export default App;
