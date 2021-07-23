const urlParams = new URLSearchParams(window.location.search);
const blog_id = urlParams.get('blogs');

function loadArticle() {
    fetch(`${BASE_URL}/blogs/${blog_id}`)
        .then(response => {
            if (!response.ok) {
                throw Error("Error in response");
            }
            return response.json();
        })
        .then(result => {
            const data = result.message;
            document.getElementsByClassName("blog-content")[0].innerHTML = data.content
            document.getElementsByClassName("blog-title")[0].innerHTML = data.title
            document.getElementsByClassName("blogs-image")[0].setAttribute("src", data.image)
            document.getElementById("likes").innerHTML = data.likes
            console.log(data.comments);
            document.getElementById("comment-count").innerHTML = data.comments.length
            if (data.comments && data.comments.length > 0) {
                data.comments.forEach(comment => {
                    document.getElementsByClassName("comments")[0].innerHTML += `
                    <div class="comment">
                                    <h3 class="comment-name">${comment.name}</h3>
                                    <div class="comment-body">
                                        ${comment.message}
                                    </div>
                                </div>
                    `
                })
            }

        })
        .catch(err => {
                document.getElementsByClassName("comment-container")[0].innerHTML = `
                    <div class="text-danger pt-2 pl-2 pb-2"><h3>Article not found</h3></div>
                    `
        });
    }

loadArticle();

function addLike() {
    fetch(`${BASE_URL}/blogs/like/${blog_id}`, {method: "PATCH"})
        .then(response => {
            console.log(response)
            if (response.ok) {
                const likes = document.getElementById("likes");
                likes.innerText = Number(likes.innerText) + 1
            }
        })
}

document.getElementById("comment_form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name");
    const message = document.getElementById("message");
    const submitBtn = document.getElementById("submit");

    const oldText = submitBtn.innerText;
    submitBtn.innerText = "Commenting..."
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('message', message.value);
    fetch(`${BASE_URL}/comments/${blog_id}`, {method: "POST", body: formData})
        .then(response => {
            if (response.ok) {
                submitBtn.innerHTML = oldText;
                document.getElementById("comment_form").reset();
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
})
