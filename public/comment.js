
const sub = async (e) =>{
  const token = localStorage.getItem('token');
  e.preventDefault
  const description = document.getElementById('comment').value.trim();
  const title = document.getElementById('titleForm').value.trim(); 
 const response = await fetch('api/comment',{
    method:'POST',
    body : JSON.stringify({description,title}),
 headers: {'x-auth-token': token,'Content-type' : 'application/json'}
  })
  console.log(response);
}
document.querySelector("#submitPost").addEventListener("click", sub);const token = localStorage.getItem('token');
