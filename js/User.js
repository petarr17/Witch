class User {
  user_id = "";
  username = "";
  email = "";
  password = "";
  api_url = "https://634095bf16ffb7e275c2fad2.mockapi.io";

  create() {
    let data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    data = JSON.stringify(data);

    fetch(this.api_url + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.user_id = data.id;
        session.startSession();
        window.location.href = "witch.html";
      })
      .catch((err) => console.log());
  }
}
