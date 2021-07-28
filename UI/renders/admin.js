window.onload = () => {
    if(!localStorage.getItem("token")) {
        location.href = './login.html';
    } else {
        console.log("POST A BLOG");
    }
}

function logout() {
    localStorage.clear();
    localStorage.removeItem("token")
    window.location = "./login.html"
}

document.getElementById("blog_form").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const image = document.getElementById("image");
    const submitBtn = document.getElementById("submit");
    const oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Posting....";
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('image', image.files[0]);
    fetch(`${BASE_URL}/blogs`, {method: "POST", body: formData, headers: {
        Authorization: localStorage.getItem("token")
    }})
        .then( response=> {
            if (response.ok) {
                submitBtn.innerHTML = oldText;
                document.getElementById("blog_form").reset();
                document.getElementById("content").reset();
                const alertSuccess = document.getElementsByClassName("alert-success")[0];
                alertSuccess.innerHTML = "Message sent successfully";
                alertSuccess.style.display = "block";
            }
        })
        .catch(function (error) {
            const alertDanger = error.message;
            alertDanger.innerHTML = "Error while sending the message.";
            alertDanger.style.display = "block";
        });
});

function selectArticles() {
    fetch(`${BASE_URL}/blogs`)
        .then(response => {
            if (!response.ok) {
                throw Error("Error in response");
            }
            return response.json();
        })
        .then(result => {
            result.message.reverse().forEach(article => {
                document.getElementsByClassName("blog-cards")[0].innerHTML += `
                     <div class="blog" data-id=${article._id}>
                        <div class="thumbnail">
                            <img src="${article.image}" alt="Image">
                        </div>
                        <div class="blog-info">
                            <div class="info">${article.title}</div>
                            <div class="content-blog">${article.content}</div>
                        </div>
                        <div class="blog-details">
                            <div class="btn">
                                <a href="#" id="edit-blog">Edit</a>
                            </div>
                        </div>
                    </div>
                    `
            })
        })
        .catch(error => {
            document.getElementsByClassName("blog-cards")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
        });
}


document.querySelector('.blog-cards').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const submitBtn = document.getElementById("submit");
    const file = document.getElementById("image").files[0];

    let editBtn = e.target.id == 'edit-blog';
    let blogId = e.target.parentElement.parentElement.parentElement.dataset.id;
    
    if(editBtn) {
        const parent = e.target.parentElement.parentElement.parentElement;
        let titleContent = parent.querySelector('.info').textContent;
        let contentDetails = parent.querySelector('.content-blog').textContent;
        contentData = CKEDITOR.instances.content.setData(contentDetails);
        title.value = titleContent;
        content.value = contentDetails;
    }
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const oldText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Updating blog....";
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('content', CKEDITOR.instances.content.getData());
        if (file)
            formData.append("image", file)
        fetch(`${BASE_URL}/blogs/${blogId}`, {
            method: "PATCH",
            headers: {
                Authorization: localStorage.getItem("token")
            },
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    submitBtn.innerHTML = oldText;
                    const alertSuccess = document.getElementsByClassName("alert-success")[0];
                    alertSuccess.innerHTML = "Blog updated successfully";
                    alertSuccess.style.display = "block";
                    document.getElementById("content").reset();
                } else {
                    if (response.status == 401)
                        throw Error("Error")
                }
            })
            .catch(function (error) {
                submitBtn.innerHTML = oldText;
                const alertDanger = error.message;
                alertDanger.innerHTML = "Error while updating the article.";
                alertDanger.style.display = "block";
            });
    })
});

// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();

    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
getapi(`${BASE_URL}/query`);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Message</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.message) {
        tab += `<tr> 
    <td>${r.name} </td>
    <td>${r.email}</td>
    <td>${r.subject}</td> 
    <td>${r.message}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("contact-query").innerHTML = tab;
}

selectArticles();
