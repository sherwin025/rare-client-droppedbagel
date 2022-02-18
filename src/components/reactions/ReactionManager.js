export const getAllReactions = () => {
    return fetch("http://localhost:8000/reactions", {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
}

export const addReaction = (new_reaction) => {
    return fetch("http://localhost:8000/reactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(new_reaction)
    })
    .then(getAllReactions)
}

export const deleteReaction = (reactionId) => {
    return fetch(`http://localhost:8000/reactions/${reactionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
      })
      .then(getAllReactions)
}

export const updateReaction = (editedreaction, reactionId) => {
    return fetch(`http://localhost:8000/reactions/${reactionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedreaction)
    })
    .then(getAllReactions)
}