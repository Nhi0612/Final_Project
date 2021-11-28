const validate2 = ( password, password2) => {

  
    if(password.length < 6)
    return 'Password must be at least 6 characters.'
  
    if(password !== password2)
      return 'Confirm password did not match.'
  
   
  }
  
  
  
  export default validate2