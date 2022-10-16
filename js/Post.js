class Post {
  post_id = "";
  content = "";
  user_id = "";
  likes = "";
  date = "";
  api_url = "https://634095bf16ffb7e275c2fad2.mockapi.io";

  loader = document.querySelector(".lds-ring");
  showLoader() {
    this.loader.classList.add("show");
  }
  hideLoader() {
    this.loader.classList.remove("show");
  }

  async create() {
    this.showLoader();
    let session = new Session();
    session_id = session.getSession();

    let data = {
      user_id: session_id,
      content: this.content,
      date: this.date,
      likes: 0,
    };

    data = JSON.stringify(data);

    let response = await fetch(this.api_url + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    data = await response.json();

    this.hideLoader();
    return data;
  }

  async allposts() {
    this.showLoader();
    let respose = await fetch(this.api_url + "/posts");
    let data = respose.json();
    this.hideLoader();
    return data;
  }

  delete(post_id) {
    this.showLoader();
    fetch(this.api_url + "/posts/" + post_id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        this.hideLoader();
        // alert("Post deleted!");
      });
  }

  addLikes(post_id, likes) {
    let data = {
      likes: likes,
    };

    data = JSON.stringify(data);

    fetch(this.api_url + "/posts/" + post_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Post lajkovan");
      });
  }
}
