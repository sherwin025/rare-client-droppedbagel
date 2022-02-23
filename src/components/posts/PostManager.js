export const GetPosts = () => {

    return fetch("https://dropped-bagels-media-co.herokuapp.com/posts", {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
        .then(res => res.json())
}

export const GetAdminPosts = () => {

    return fetch("https://dropped-bagels-media-co.herokuapp.com/posts?admin=true", {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
        .then(res => res.json())
}

export const GetUserPosts = () => {

    return fetch("https://dropped-bagels-media-co.herokuapp.com/posts?user=true", {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
        .then(res => res.json())
}

export const getSinglePost = (id) => {

    return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts/${id}`, {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
        .then(res => res.json())
}

export const deletePost = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts/${id}`, {

        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }

    })
}

export const updatePost = (id, newPost) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newPost)
    })
}

export const New_post = (post_body) => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(post_body)
    })
        .then(res => res.json())
}

export const New_entrytags = (post_body) => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/posttags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(post_body)
    })
}

export const GetPostReactions = () => {

    return fetch("https://dropped-bagels-media-co.herokuapp.com/postreactions", {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
        .then(res => res.json())
}

export const GetReactions = () => {

    return fetch("https://dropped-bagels-media-co.herokuapp.com/reactions", {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
        .then(res => res.json())
}

export const New_reaction = (post_body) => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/postreactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(post_body)
    })
}

export const deletePostReaction = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/postreactions/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}


export const addReaction = (reactionBody) => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/reactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(reactionBody)
    })
}


export const getPostImages = () => {

    return fetch("https://dropped-bagels-media-co.herokuapp.com/postimage", {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
        .then(res => res.json())
}