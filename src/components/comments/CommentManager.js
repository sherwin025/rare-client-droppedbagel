export const getAllComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const addComment = (new_comment) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(new_comment)
    })
        .then(getAllComments)
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(getAllComments)
}

export const getCommentsByPost = (postId) => {
    return fetch(`http://localhost:8000/comments?post=${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}