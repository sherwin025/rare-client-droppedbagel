export const getAllTags = () => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/tags", {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
}

export const addTag = (new_tag) => {
    return fetch("https://dropped-bagels-media-co.herokuapp.com/tags", {
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
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/tags/${tagId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
      })
      .then(getAllTags)
}

export const updateTag = (editedTag, tagId) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/tags/${tagId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedTag)
    })
    .then(getAllTags)
}