class Comments {
  post_id = "";
  user_id = "";
  content = "";
  api_url = "https://634095bf16ffb7e275c2fad2.mockapi.io";

  loader = document.querySelector(".lds-ring");
  showLoader() {
    this.loader.classList.add("show");
  }
  hideLoader() {
    this.loader.classList.remove("show");
  }

  create() {
    this.showLoader();
    let data = {
      post_id: this.post_id,
      user_id: this.user_id,
      content: this.content,
    };

    data = JSON.stringify(data);

    fetch(this.api_url + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        this.hideLoader();
      });
  }

  async get(post_id) {
    this.showLoader();
    let response = await fetch(this.api_url + "/comments");
    let data = await response.json();
    let post_comments = [];

    let i = 0;
    data.forEach(function (item) {
      if (item.post_id === post_id) {
        post_comments[i] = item;
        i++;
      }
    });
    this.hideLoader();
    return post_comments;
  }
}
