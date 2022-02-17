export const postProfilePic = (picObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(picObj)
    }
    return fetch(`http://localhost:8000/profilePics`, fetchOptions)
    .then(response => response.json())

}