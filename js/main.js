var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var loginEmail = document.getElementById('loginEmail')
var loginPassword = document.getElementById('loginPassword')
var submitBtn = document.getElementById('submitBtn')
var submitBtnn =document.getElementById('submitBtnn')

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
var username = localStorage.getItem('userNames')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}
var signUpArray = []
if (localStorage.getItem('AllUsers') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('AllUsers'))
}
function isEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}
submitBtn.addEventListener("click",validateEmail)
function validateEmail()
{
var mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
if(signupEmail.value.match(mailFormat))
{

return true;
}
else{
document.getElementById('invalid').innerHTML = '<span class="text-danger m-3">email is not valid </span>'

return false;
}
}    
function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    if (validateEmail() == false) {
        return false
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('AllUsers', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
   
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    }
    else {
        signUpArray.push(signUp)
        localStorage.setItem('AllUsers', JSON.stringify(signUpArray))
        if (baseURL == '/') {
            location.replace('https://' + location.hostname + '/login.html')
    
           } else {
            location.replace(baseURL + '/login.html')
    
        } 
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
    }
}
function isLoginEmpty() {

    if (loginPassword.value == "" || loginEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = loginPassword.value
    var email = loginEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('userNames', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(baseURL + '/home.html')

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger"> incorrect email or password....</span>'
        }
    }

}
