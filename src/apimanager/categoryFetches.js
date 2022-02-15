

export const getCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}

export const uploadCategory = (cat) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(cat)
    }
    return fetch(`http://localhost:8000/categories`, fetchOptions)
    .then(response => response.json())

}

export const deleteCategory = (id) => {
    return fetch(`http://localhost:8000/categories/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}
