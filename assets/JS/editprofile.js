var editing = false;

const bcrypt=require('bcryptjs');
let editbutts=document.querySelectorAll('.editbutt')
let details=document.querySelectorAll('.details')
let setbutt=document.querySelectorAll('.setbutt');
let inputdisplay=document.querySelectorAll('.inputdisplay');
let passsword=details[2].innerText

setbutt.forEach(butt=>{
  butt.disabled=true;
});


let allowonly=(obj)=>{
  editbutts.forEach(butt=>{
    if(butt==obj){
      butt.style.display='none';
    }
  })
}

let allowevery=()=>{
  editbutts.forEach(butt=>{
    butt.style.display='inline-block'
  })
}


function editName() {
  if (editing) {
    showAlert("Complete this process first");
    return;
  }

  var nameSpan = document.getElementById("name");
  var nameInput = document.getElementById("nameInput");

  // editbutts[0].style.display='none'
  nameInput.value = nameSpan.innerHTML;
  nameSpan.style.display = "none";
  nameInput.style.display = "inline-block";
  nameInput.focus();
  setbutt[0].style.display='inline-block'
  allowonly(editbutts[0]);
  showCloseButton("nameInput",0);
  editing = true;
}

function editEmail() {
  if (editing) {
    showAlert("Complete this process first");
    return;
  }

  var emailSpan = document.getElementById("email");
  var emailInput = document.getElementById("emailInput");

  emailInput.value = emailSpan.innerHTML;
  emailSpan.style.display = "none";
  emailInput.style.display = "inline-block";
  emailInput.focus();
  setbutt[1].style.display='inline-block'
  allowonly(editbutts[1]);
  showCloseButton("emailInput",1);
  editing = true;
}

function changePassword() {
  if (editing) {
    showAlert("Complete this process first");
    return;
  }

  var passwordFields = document.getElementById("passwordInput");

  if (passwordFields.style.display === "none") {
    passwordFields.style.display = "block";
  } else {
    passwordFields.style.display = "none";
  }
  showCloseButton("passwordInput",2);
  allowonly(editbutts[2]);
  setbutt[2].style.display='inline-block'
  editing = true;
}

function closeEdit(inputId) {
  var inputElement = document.getElementById(inputId);
  var spanElement = document.getElementById(inputId.replace("Input", ""));

  setbutt.forEach(butt=>{
    butt.style.display='none'
  })
  hideCloseButtons();
  allowevery();
  editing = false;
  inputElement.style.display = "none";
  spanElement.style.display = "inline-block";
}

function showCloseButton(inputId,num) {
  var inputdisplay = document.querySelector("#" + inputId);
  var closeButton=document.querySelectorAll('.close-btn')
  closeButton[num].style.display = 'inline-block';
  inputdisplay.style.display='inline-block'
}

function hideCloseButtons() {
  var closeButtons = document.querySelectorAll(".close-btn");
  closeButtons.forEach(function (btn) {
    btn.style.display = "none";
  });
}

function showAlert(message) {
  var alertMessage = document.getElementById("alertMessage");
  alertMessage.innerText = message;
  alertMessage.style.display = "block";

  setTimeout(function () {
    alertMessage.style.display = "none";
  }, 3000);
}

function checkvalid(num){
  if(inputdisplay[num].value!=details[num].innerText){
    setbutt[num].disabled=false;

  }else{setbutt[num].disabled=true
  }

  if(num==2){
    let passworddisplay=document.querySelectorAll('.passwordinput');

    if(passworddisplay[0].value==details[2].innerText &&  passworddisplay[1].value !='' && passworddisplay[1].value==passworddisplay[2].value && passworddisplay[1].value!=passworddisplay[0].value){
      setbutt[num].disabled=false;
      console.log(details[2].innerText)
    }else{
      console.log(passworddisplay[0].value,passworddisplay[1].value,passworddisplay[2].value,details[2].innerText,)
      setbutt[num].disabled=true;
    }
  }

}

// setbutt.forEach(butt=>{
//   butt.addEventListener('click',()=>{
//     butt.style.backgroundColor='black'
//     setTimeout(() => {
//       butt.style.backgroundColor='green'
//     }, 1000);
//   })
// })
// function setclicked(num){
//   if(inputdisplay[num].value==details[num].innerText){
//     showAlert('it should be different from the previous one')
//   }
// }