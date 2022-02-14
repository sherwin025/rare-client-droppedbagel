export const getAllUsers = () => {
    return fetch('http://localhost:8000/users')
    .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}`)
    .then(res => res.json())
}