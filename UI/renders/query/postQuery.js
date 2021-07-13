document.getElementById("contact_form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const submitBtn = document.getElementById("submit");
    const oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending message....";
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('subject', subject.value);
    formData.append('message', message.value);
    fetch(`${BASE_URL}/query`, {method: "POST", body: formData})
        .then( response=> {
            if (response.ok) {
                submitBtn.innerHTML = oldText;
                document.getElementById("contact_form").reset();
                const alertSuccess = document.getElementsByClassName("alert-success")[0];
                alertSuccess.innerHTML = "Message sent successfully";
                alertSuccess.style.display = "block";
            }
        })
        .catch(function (error) {
            const alertDanger = document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML = "Error while sending the message.";
            alertDanger.style.display = "block";
        });
});
