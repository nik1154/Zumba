 var openLoginRight = document.querySelector('.h1');
var loginWrapper = document.querySelector('#logIn-wrapper');
var signupWrapper = document.querySelector('#signup');


//auto toggle in 3 sec
window.setTimeout(function(){loginWrapper.classList.toggle('open'); }, 3000);

//click on welcome to toggle
// openLoginRight.addEventListener('click', function(){
//   loginWrapper.classList.toggle('open'); 
// });

//switch to sign up when clicked
document.getElementById("signupbtn").addEventListener("click", function(){
  loginWrapper.style.display = "none";
  loginWrapper.classList.toggle('open');
  signupWrapper.style.display = "block";
  window.setTimeout(function(){signupWrapper.classList.toggle('open'); }, 2000); 
});

document.getElementById("accountExists").addEventListener("click", function(){
  signupWrapper.style.display = "none";
  signupWrapper.classList.toggle('open');
  loginWrapper.style.display = "block";
  window.setTimeout(function(){loginWrapper.classList.toggle('open'); }, 2000);
});


var check = function() {
  if (document.getElementById('pass').value ==
    document.getElementById('confirmPass').value) {
    document.getElementById('message').style.color = '#e49023';
    document.getElementById('message').innerHTML = 'Good Job! Just one click away';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Passwords do not match';
  }
}





// function ShowSignUp() {
//     document.getElementById("signup").style.display = "";
// }