let session1 = new Session();
session_id = session1.getSession();

if (session_id !== "") {
  //   window.location.href = "witch.html";
  // async function populateData() {
  //   let user = new User();
  //   let data = await user.get(session_id);
  //   document.querySelector("#username").textContent = data["username"];
  //   document.querySelector("#email").textContent = data["email"];
  //   document.querySelector("#edit_username").value = data["username"];
  //   document.querySelector("#edit_email").value = data["email"];
  // }
  // populateData();
} else {
  window.location.href = "/";
}
