export const getAllTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
}

export const addTag = (new_tag) => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(new_tag)
    })
    .then(getAllTags)
}

export const deleteTag = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
      })
      .then(getAllTags)
}

export const updateTag = (editedTag, tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedTag)
    })
    .then(getAllTags)
}