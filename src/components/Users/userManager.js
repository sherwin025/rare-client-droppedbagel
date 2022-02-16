export const getAllUsers = () => {
    return fetch('http://localhost:8000/users', {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}

export const activateUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}/activate`, {
        method: "PUT",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}

export const deactivateUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}/deactivate`, {
        method: "PUT",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}