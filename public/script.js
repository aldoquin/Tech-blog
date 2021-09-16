
const signupHandler = async (event) =>{
  event.preventDefault();
  // alertcontainer.classList.add('invisible')
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();
  const name = document.getElementById('name-signup').value.trim();

  console.log(email,password,name);
  const response = await fetch('/api/register',{
    method:'POST',
    body : JSON.stringify({email , password,name}),
    headers : {'Content-type' : 'application/json'},
  })
  if(!response.ok){
    return alertcontainer.classList.remove('invisible')
  }
}
document.querySelector('#submitB').addEventListener('click',signupHandler)


const loginFormHandler = async (event) =>{
  event.preventDefault();
  const email = document.getElementById('email-login').value.trim();
  const password = document.getElementById('password-login').value.trim();
  try {
    const response = await fetch('/api/user/login',{
      method:'POST',
      body : JSON.stringify({email , password,}),
      headers : {'Content-type' : 'application/json'},
    })
    if(!response.ok){
      return alertcontainer.classList.remove('invisible') 
    }
    // console.log(await response.text());
    const data = await response.json()
    console.log(data.token);
    if(data.token){
     localStorage.setItem('token',data.token);
     return document.location.replace('/dashboard')
    }
  } catch (error) {
    console.log(error);
  }
}
document.querySelector('#loginButton').addEventListener('click',loginFormHandler)










