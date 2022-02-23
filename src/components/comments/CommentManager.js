export const getAllComments = () => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/comments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const addComment = (new_comment) => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/comments", {
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
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(getAllComments)
}

export const getCommentsByPost = (postId) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/comments?post=${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleComment = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/comments/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const updateComment = (editedComment, commentId) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedComment)
    })
    .then(getAllComments)
}