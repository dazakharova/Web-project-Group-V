document.addEventListener("DOMContentLoaded", function () {
  //search for the login form
  const loginForm = document.getElementById("loginForm");

  // login
  const loginLink = document.getElementById("loginLink");
  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "block";
    // Close registration form if it is opened
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.style.display = "none";
    document.querySelector(".overlay-registration").style.display = "none";
  });
  // Find a button to close the form and add the event to close it
  document
    .getElementById("closeLoginForm")
    .addEventListener("click", function () {
      document.getElementById("loginForm").style.display = "none";
      document.querySelector(".overlay-login").style.display = "none";
    });

  // add eventlistener for "submit" form
  loginForm.addEventListener("submit", function (event) {
    //
    event.preventDefault();

    // get the links of the inputs
    const usernameInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");

    // get the values and delete spaces
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    //check if username is empty
    if (username === "") {
      console.log("Username field can not be empty");
      return; // interrupt
    }
    //check if password is empty
    if (password === "") {
      alert("Password field can not be empty");
      return; // interrupt
    }

    // an object with the data to send to a server
    const data = {
      username: username,
      password: password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // send to server
    fetch(BACKEND_ROOT_URL + "/auth/login", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Data sent successfully!");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  });
});
