export const uploadSubscription = (sub) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sub)
    }
    return fetch(`http://localhost:8088/subscriptions`, fetchOptions)
    .then(response => response.json())

}