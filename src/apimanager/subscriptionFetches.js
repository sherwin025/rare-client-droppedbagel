export const uploadSubscription = (sub) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(sub)
    }
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/subscriptions`, fetchOptions)
    .then(response => response.json())

}

export const getSubscriptions = () => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/subscriptions`, {headers: {"Authorization": `Token ${localStorage.getItem("token")}`}})
    .then(res => res.json())
}

export const getUsersSubscriptions = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/subscriptions?author=${id}`, {headers: {"Authorization": `Token ${localStorage.getItem("token")}`}})
    .then(res => res.json())
}

export const deleteSubscription = (id) => {
    return fetch(`https://dropped-bagels-media-co.herokuapp.com/subscriptions/${id}`, {method: "DELETE", headers: {"Authorization": `Token ${localStorage.getItem("token")}`}})
}