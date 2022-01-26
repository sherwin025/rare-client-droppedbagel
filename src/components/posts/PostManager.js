export const GetPosts = () => {
    return fetch("http://localhost:8088/posts")
    .then(res => res.json())
}

export const getSinglePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
    .then(res => res.json())
}

export const deletePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
        method: "DELETE"
      })
}

export const New_post = (post_body) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post_body)
    })
    .then(res => res.json())
}

export const New_entrytags = (post_body) => {
    return fetch("http://localhost:8088/posttags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post_body)
    })
}