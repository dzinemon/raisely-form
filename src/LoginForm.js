import React, { useState } from 'react';
import {validateEmail, checkEmail, submitForm} from './utils/validateEmail'

function LoginForm() {
  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const [ isProcessedEmail, setProcessedEmail ] = useState(false)
  const [ isValidEmail, setValidEmail ] = useState(true)
  const [ isProcessing, setProcessing ] = useState(false)
  const [ isDisabled, setDisabled ] = useState(true)
  const [ error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await submitForm(firstname, lastname, email, password);
    } catch (error) {
      console.log(error)
    }
  }

  const onFocus = async (e) => {
    if (isProcessedEmail && isValidEmail) setError('')      
  }

  const onBlur = async (e) => {
    if (isProcessedEmail) {
      return false
    }
    setDisabled(true);

    if (checkEmail(email)) {
      setProcessing(true)
      try {
        await validateEmail(email);
        setValidEmail(true)
        setError('Looks good');
        setDisabled(false)
      } catch (error) {
        setError('Email already exists')
        setDisabled(true)
        setValidEmail(false)
      }
      setProcessedEmail(true)
    } else {
      setError('Email format is invalid');
      setDisabled(true)
      setValidEmail(false)
    }
    setProcessing(false)
  }


  return (
    <>
      <div className="mx-auto sm:w-2/3 md:w-1/2 w-full max-w-lg py-12 px-4">
        <form className="w-full max-w-lg" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                First Name
              </label>
              <input 
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" 
                id="grid-first-name" 
                type="text" 
                autoComplete="cc-given-name"
                placeholder="Jane" 
                value={firstname}
                onChange={e => setFirstname(e.currentTarget.value)}
                />
              <p className="text-red-500 text-xs italic hidden">Please fill out this field.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Last Name
              </label>
              <input 
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-last-name" 
                type="text" 
                autoComplete="family-name"
                placeholder="Doe" 
                value={lastname}
                onChange={e => setLastname(e.currentTarget.value)}
                />
              <p className="text-red-500 text-xs italic hidden">Please fill out this field.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                Email
              </label>
              <input 
                className={`appearance-none block w-full bg-gray-100 text-gray-700 border border-${!isValidEmail ? 'red' : 'blue'}-500 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`} 
                id="grid-email" 
                type="email" 
                autoComplete="work-email"
                placeholder="email@email.com" 
                value={email}
                onChange={e => {
                  setEmail(e.currentTarget.value)
                    setProcessedEmail(false)
                }}
                onBlur={onBlur}
                onFocus={onFocus}
                />
              <p className={`text-${!isValidEmail ? 'red' : 'blue'}-500 text-xs italic`}>{error}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Password
              </label>
              <input 
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-password" 
                autoComplete="current-password"
                type="password" 
                placeholder="******************" 
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
              />
              <p className="text-red-500 text-xs italic hidden">Make it as long and as crazy as you'd like</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3 text-center">
              <p className="text-blue-500 text-sm italic mb-2">{isProcessing ? 'Processing...' : ''} &nbsp;</p>
              <button className={ `rounded px-8 py-2 border ${isDisabled ? 'text-red-700' : 'text-blue-700'} bg-blue-100 hover:bg-blue-300 font-bold disabled:bg-red-200`} type="submit" disabled={isDisabled}>
                Login
              </button>
            </div>
          </div>
        </form>
      
      </div>
    </>
  )
}

export default LoginForm;