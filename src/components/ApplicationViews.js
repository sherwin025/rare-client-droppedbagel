import React from "react"
import { Route } from "react-router-dom"
import { PostDetail } from "./posts/Postdetail"
import { PostList } from "./posts/Postlist"

export const ApplicationViews = () => {
  return (<>
    <h1 >Welcome to Rare Publishing</h1>
    <Route exact path="/posts" >
        <PostList/>
    </Route>
    <Route exact path="/posts/:postId(\d+)" >
        <PostDetail/>
    </Route>
  
  </>
    
  )
}
