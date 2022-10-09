let session = new Session();
session_id = session.getSession();

if (session_id !== "") {
  async function populateData() {
    let user = new User();
    let data = await user.get(session_id);

    document.querySelector("#username").textContent = data["username"];
    document.querySelector("#email").textContent = data["email"];
  }

  populateData();
} else {
  window.location.href = "/";
}

document.querySelector("#logOut").addEventListener("click", function (e) {
  e.preventDefault();

  session.destroySession();
  window.location.href = "/";
});
