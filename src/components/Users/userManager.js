export const getAllUsers = () => {
    return fetch('https://dropped-bagels-media-co.herokuapp.com/users', {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/users/${id}`, {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}

export const activateUser = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/users/${id}/activate`, {
        method: "PUT",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}

export const deactivateUser = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/users/${id}/deactivate`, {
        method: "PUT",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}

export const makeAdmin = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/users/${id}/makeadmin`, {
        method: "PUT",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}

export const removeAdmin = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/users/${id}/removeadmin`, {
        method: "PUT",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}

export const addDemotion = (new_demotion) => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/demotions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(new_demotion)
    })
}

export const deleteDemotion = (demotionId) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/demotions/${demotionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
      })
}
