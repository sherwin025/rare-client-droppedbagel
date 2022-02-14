export const uploadSubscription = (sub) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sub)
    }
    return fetch(`http://localhost:8000/subscriptions`, fetchOptions)
    .then(response => response.json())

}

export const getSubscriptions = () => {
    return fetch(`http://localhost:8000/subscriptions`)
    .then(res => res.json())
}

export const getUsersSubscriptions = (id) => {
    return fetch(`http://localhost:8000/subscriptions?user_id=${id}`)
    .then(res => res.json())
}

export const deleteSubscription = (id) => {
    return fetch(`http://localhost:8000/subscriptions/${id}`, {method: "DELETE"})
}