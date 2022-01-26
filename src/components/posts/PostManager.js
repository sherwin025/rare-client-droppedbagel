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

export const updatePost = (id, newPost) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
}