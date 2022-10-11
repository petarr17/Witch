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

  async get(id) {
    let api = this.api_url + "/users/" + id;

    let response = await fetch(api);
    let data = await response.json();

    return data;
  }

  login() {
    fetch(this.api_url + "/users")
      .then((response) => response.json())
      .then((data) => {
        let loginpoint = 0;
        data.forEach((dataUser) => {
          if (
            dataUser.email === this.email &&
            dataUser.password === this.password
          ) {
            loginpoint = 1;
            let session2 = new Session();
            session2.user_id = dataUser.id;
            session2.startSession();
            window.location.href = "witch.html";
          }
        });

        if (loginpoint === 0) {
          alert("Wrong email or password!");
        }
      });
  }

  edit() {
    let data = {
      username: this.username,
      email: this.email,
    };

    data = JSON.stringify(data);

    let session = new Session();
    session_id = session.getSession();

    fetch(this.api_url + "/users/" + session_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "/witch.html";
      });
  }

  delete() {
    let session = new Session();
    session_id = session.getSession();

    fetch(this.api_url + "/users/" + session_id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.destroySession();

        window.location.href = "/";
      });
  }
}
