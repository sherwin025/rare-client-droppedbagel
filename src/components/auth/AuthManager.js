export const loginUser = (user) => {
  return fetch("https://dropped-bagels-media-co.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  }).then(res => res.json())
}

export const registerUser = (newUser) => {
  return fetch("https://dropped-bagels-media-co.herokuapp.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newUser)
    
  }).then(res => res.json())
}
