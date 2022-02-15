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