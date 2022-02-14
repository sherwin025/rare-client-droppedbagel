

export const getCategories = () => {
    return fetch(`http://localhost:8000/categories`)
    .then(res => res.json())
}

export const uploadCategory = (cat) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    }
    return fetch(`http://localhost:8000/categories`, fetchOptions)
    .then(response => response.json())

}

export const deleteCategory = (id) => {
    return fetch(`http://localhost:8000/categories/${id}`, {method: "DELETE"})
}