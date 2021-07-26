window.onload = () => {
    if(!sessionStorage.token) {
        location.href = './login.html';
    } else {
        console.log(sessionStorage.token);
    }
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
    console.log(image.files[0]);
    fetch(`${BASE_URL}/blogs`, {method: "POST", body: formData, headers: {
        Authorization: sessionStorage.token
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
        title.value = titleContent;
        content.value = contentDetails;
    }
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const oldText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Updating blog....";
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('content', content.value);
        console.log(blogId);
        if (file)
            formData.append("image", file)
        fetch(`${BASE_URL}/blogs/${blogId}`, {
            method: "PATCH",
            headers: {
                Authorization: sessionStorage.token
            },
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    submitBtn.innerHTML = oldText;
                    const alertSuccess = document.getElementsByClassName("alert-success")[0];
                    alertSuccess.innerHTML = "Blog updated successfully";
                    alertSuccess.style.display = "block";
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


selectArticles();

/* const blogList = document.querySelector('.blog-card');
const submitBtn = document.getElementById("submit");
let blogs = '';

const renderBlogs = (blogs) => {
    blogs.reverse().forEach(blog => {
        blogs += `
            <div class="blog" data-id="${blog._id}">
                <div class="thumbnail">
                    <img src="${blog.image}" alt="Image">
                </div>
                <div class="blog-info">
                    <div class="info">
                        <a href="blog_details.html?blogs=${blog._id}">${blog.title}</a>
                    </div>
                    <div class="info-content">
                        <p>${blog.content}</p>
                    </div>
                </div>
                <div class="blog-details">
                    <div class="btn">
                        <a href="#" id="edit-blog">Edit</a>
                    </div>
                </div>
            </div>
        `;
    });
    blogList.innerHTML = blogs;
}

fetch(`${BASE_URL}/blogs`)
    .then(response => response.json())
    .then(result => renderBlogs(result.message))
blogList.addEventListener('click', (e) => {
    e.preventDefault();
    let editBtn = e.target.id == 'edit-blog';
    let blogId = e.target.parentElement.parentElement.parentElement.dataset.id;
    
    if(editBtn) {
        const parent = e.target.parentElement.parentElement.parentElement;
        let titleContent = parent.querySelector('.info > a').textContent;
        let contentDetails = parent.querySelector('.info-content').textContent;
        /* console.log(contentDetails);
        title.value = titleContent;
        content.value = contentDetails;
        /* ClassicEditor
            .create(content)
            .then(editor => {
                editor.setData(contentDetails);
            })
            /* .then(content.style.visibility="hidden")
            .catch(error => {
                console.log(error);
            })
    }
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}/blogs/${blogId}`, {
            method: "PATCH",
            headers: {
                Authorization: sessionStorage.token
            },
            body: JSON.stringify({
                title: title.value,
                content: content.value,
            })
        })
        .then(response => {
            if(response.ok) {
                console.log(response)
            }
        })
    })

}) */