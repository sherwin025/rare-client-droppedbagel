

export const getCategories = () => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/categories`, {
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
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/categories`, fetchOptions)
    .then(response => response.json())

}

export const deleteCategory = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/categories/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}
