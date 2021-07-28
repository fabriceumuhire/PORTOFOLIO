document.getElementById("login_form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const submitBtn = document.getElementById("submit");
    const oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending message....";
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);
    fetch(`${BASE_URL}/user/login`, {method: "POST", body: formData})
        .then(response => {
            if(!response.ok) {
                alert(response);
            }
            if (response.ok) {
                submitBtn.innerHTML = oldText;
            }
            return response.json();
        })
        .then(result => {
            const data = result.user;
            const token = result.token;
            localStorage.setItem('token', token);
            sessionStorage.name = data.name;
            sessionStorage.token = result.token;
            location.href = "./admin.html";
            alert('Login successful');
        })
        .catch(function (error) {
            alert(error.message)
        });
});