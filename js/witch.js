let session = new Session();
session_id = session.getSession();

async function populateData() {
  let user = new User();
  let data = await user.get(session_id);

  document.querySelector("#username").textContent = data["username"];
  document.querySelector("#email").textContent = data["email"];

  document.querySelector("#edit_username").value = data["username"];
}
populateData();

document.querySelector("#logOut").addEventListener("click", function (e) {
  e.preventDefault();

  session.destroySession();
  window.location.href = "/";
});

document.querySelector("#editAcc").addEventListener("click", function () {
  document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", function () {
  document.querySelector(".custom-modal").style.display = "none";
});

let config = {
  registerUsername: {
    required: true,
    minlength: 5,
    maxlength: 50,
  },
};

let validator = new Validator(config, "#editForm");

let editbtn = document.querySelector("#register");
editbtn.disabled = true;
let editpoens1 = false;
let editpoens2 = false;

document
  .querySelector("#edit_username")
  .addEventListener("input", function (e) {
    let username = document.querySelector("#username").textContent;
    if (e.target.value !== username) {
      editpoens1 = true;
    } else {
      editpoens1 = false;
    }
    if (editpoens1 === true) editbtn.disabled = false;
    else editbtn.disabled = true;
  });

document.querySelector("#editForm").addEventListener("submit", function (e) {
  e.preventDefault();
  async function getPass() {
    let user1 = new User();
    user1 = await user1.get(session_id);
    let pass = await user1.password;
    if (document.querySelector("#edit_password").value === pass) {
      editpoens2 = true;
    } else {
      editpoens2 = false;
    }
    if (validator.validationPassed() && editpoens2 === true) {
      let user = new User();
      user.username = document.querySelector("#edit_username").value;
      user.edit();
      document.querySelector("#username").textContent =
        document.querySelector("#edit_username").value;
      document.querySelector("#allPostsWrapper").innerHTML = "";
      getAllPosts();
      document.querySelector(".custom-modal").style.display = "none";
      document.querySelector("#edit_password").value = "";
    } else {
      alert("Something went wrong!");
    }
  }
  getPass();
});

document
  .querySelector("#deleteProfile")
  .addEventListener("click", function (e) {
    e.preventDefault();

    let text = "Are you sure you want to delete your account?";

    if (confirm(text) === true) {
      let user = new User();
      user.delete();
    }
  });

document.querySelector("#postForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (document.querySelector("#postContent").value.trim() === "") return;
  else {
    async function createPost() {
      let content = document.querySelector("#postContent").value;
      document.querySelector("#postContent").value = "";

      let today = new Date().toLocaleDateString();
      let post = new Post();
      post.content = content;
      post.date = today;
      post = await post.create();

      let current_user = new User();
      current_user = await current_user.get(session_id);

      let remove_post_btn = "";

      if (session_id === post.user_id) {
        remove_post_btn =
          '<button class="remove-btn" onclick="removePost(this)">Remove</button>';
      }

      let html = document.querySelector("#allPostsWrapper").innerHTML;

      document.querySelector("#allPostsWrapper").innerHTML =
        `<div class="single-post" data-post-id=${post.id}>
    <div class="post-content">${post.content}</div>
    
    <hr />

    <div class="post-actions">
    <div>
    <p><b>Author:</b> ${current_user.username}</p>
    <p><b>Date:</b> ${post.date}</p>
    </div>
    <div>
    <button onclick="likePost(this)" class="like-post like-btn"><span>${post.likes}</span> Likes</button>
    <button onclick="comments(this)" class="comment-btn">Comments</button>
    ${remove_post_btn}
    </div>
    </div>
    
    <div class="comments">
    <form>
    <input placeholder="Write a comment..." type="text" >
    <button onclick="commentPost(event)">Comment</button>
    </form>
    </div>
    </div>
    
   
    ` + html;
    }

    createPost();
  }
});

async function getAllPosts() {
  let all_posts = new Post();
  all_posts = await all_posts.allposts();

  async function getPostUser() {
    for (let j = all_posts.length - 1; j >= 0; j--) {
      let user = new User();
      user = await user.get(all_posts[j].user_id);

      let comments = new Comments();
      comments = await comments.get(all_posts[j].id);

      async function dataUser() {
        let arr = [];

        for (let i = 0; i < comments.length; i++) {
          let userComment = new User();
          userComment = await userComment.get(comments[i].user_id);
          arr[i] = userComment.username;
        }

        return arr;
      }

      let userArr = await dataUser();

      let comments_html = "";
      if (comments.length > 0) {
        let i = 0;
        comments.forEach(async function (cmt) {
          let username = userArr[i];
          i++;
          comments_html += `<div class="single-comment"><b>${username} :</b> ${cmt.content}</div>`;
        });
      }

      let remove_post_btn = "";

      if (session_id === all_posts[j].user_id) {
        remove_post_btn =
          '<button class="remove-btn" onclick="removePost(this)">Remove</button>';
      }

      let html = document.querySelector("#allPostsWrapper").innerHTML;
      const element = document.createElement("div");

      element.innerHTML = `<div class="single-post" data-post-id=${all_posts[j].id}>
      <div class="post-content">${all_posts[j].content}</div>
      
      <hr />
  
      <div class="post-actions">
      <div>
      <p><b>Author:</b> ${user.username}</p>
      <p><b>Date:</b> ${all_posts[j].date}</p>
      </div>
      <div>
      <button onclick="likePost(this)" class="like-post like-btn"><span>${all_posts[j].likes}</span> Likes</button>
      <button onclick="comments(this)" class="comment-btn">Comments</button>
      ${remove_post_btn}
      </div>
      </div>
      
      <div class="comments">
      <form>
      <input placeholder="Write a comment..." type="text" >
      <button onclick="commentPost(event)">Comment</button>
      </form>
      ${comments_html}
      </div>
      </div>
      
     
      `;

      document.querySelector("#allPostsWrapper").appendChild(element);
    }
  }
  await getPostUser();
}

getAllPosts();

const comments = (btn) => {
  let main_post = btn.closest(".single-post");
  let comments = main_post.querySelector(".comments");
  comments.classList.toggle("blockClass");
};

const removePost = (el) => {
  let main_post = el.closest(".single-post");
  let post_id = main_post.getAttribute("data-post-id");

  main_post.remove();

  let post = new Post();
  post.delete(post_id);
};

const likePost = (el) => {
  el.setAttribute("disabled", "true");
  let main_post = el.closest(".single-post");
  let post_id = main_post.getAttribute("data-post-id");

  let currentlikes = parseInt(el.querySelector("span").innerText);
  currentlikes++;
  el.querySelector("span").innerText = currentlikes;

  let post = new Post();
  post.addLikes(post_id, currentlikes);
};

const commentPost = (el) => {
  el.preventDefault();
  let btn = el.target;
  let main_post = btn.closest(".single-post");
  let commentValue = main_post.querySelector("input").value;
  if (commentValue.trim() === "") return;
  else {
    btn.setAttribute("disabled", "true");

    let post_id = main_post.getAttribute("data-post-id");

    main_post.querySelector("input").value = "";

    async function commentUser() {
      let user = new User();
      user = await user.get(session_id);

      main_post.querySelector(
        ".comments"
      ).innerHTML += `<div class="single-comment"><b>${user.username} :</b> ${commentValue}</div>`;
    }

    commentUser();

    let comment = new Comments();
    comment.content = commentValue;
    comment.post_id = post_id;
    comment.user_id = session_id;
    comment.create();
  }
};
