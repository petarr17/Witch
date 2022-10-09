let session = new Session();
session = session.getSession();

if (session === "") {
  window.location.href = "/";
}
