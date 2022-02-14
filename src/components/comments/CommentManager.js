export const getAllComments = () => {
    return fetch("http://localhost:8000/comments")
    .then(res => res.json())
}

export const addComment = (new_comment) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(new_comment)
    })
    .then(getAllComments)
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE"
      })
      .then(getAllComments)
}

export const getCommentsByPost = (postId) => {
    return fetch(`http://localhost:8000/comments?post_id=${postId}`)
    .then(res => res.json())   
}