let session = new Session();
if (session.getSession() !== "") {
  window.location.href = "witch.html";
}

const registrationBtn = document.querySelector("#registration");
const closeModal = document.querySelector("#closeModal");

registrationBtn.addEventListener("click", function () {
  let customModal = document.querySelector(".custom-modal");
  customModal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  let customModal = document.querySelector(".custom-modal");
  customModal.style.display = "none";
});

let config = {
  registerUsername: {
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  registerEmail: {
    required: true,
    email: true,
    minlength: 5,
    maxlength: 50,
  },
  registerPassword: {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: "registerRepeat",
  },
  registerRepeat: {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: "registerPassword",
  },
};

let validator = new Validator(config, "#registrationForm");

document.querySelector("#register").addEventListener("click", function (e) {
  e.preventDefault();

  if (validator.validationPassed()) {
    let user = new User();
    user.username = document.querySelector("#username").value;
    user.email = document.querySelector("#email").value;
    user.password = document.querySelector("#password").value;
    user.create();
  } else {
    alert("Fields are not correctly filled!");
  }
});
