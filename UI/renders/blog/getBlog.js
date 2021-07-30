function selectArticles() {
    fetch(`${BASE_URL}/blogs`)
        .then(response => {
            if (!response.ok) {
                throw Error("Error in response");
            }
            return response.json();
        })
        .then(result => {
            var latestBlogs = result.message.reverse().slice(0, 9);
            latestBlogs.forEach(article => {
                document.getElementsByClassName("blog-card")[0].innerHTML += `
                     <div class="blog">
                        <div class="thumbnail">
                            <img src="${article.image}" alt="Image">
                        </div>
                        <div class="blog-info">
                            <div class="info">${article.title}</div>
                        </div>
                        <div class="blog-details">
                            <div class="btn">
                                <a href="blog_details.html?blogs=${article._id}">Read more</a>
                            </div>
                        </div>
                    </div>
                    `
            })
        })
        .catch(error => {
            document.getElementsByClassName("blog-card")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
        });
}

selectArticles();
