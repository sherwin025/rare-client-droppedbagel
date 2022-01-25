import React from "react"
import { Route } from "react-router-dom"
import { Users } from "./Users/Users"
import { UserPage } from "./Users/UserPage"
import { PostDetail } from "./posts/Postdetail"
import { PostList } from "./posts/Postlist"
import { CategoryList } from "./categories/CategoryList"
import { TagManagement } from "./tags/TagManagement"

export const ApplicationViews = () => {
  return (<>
    <h1 >Welcome to Rare Publishing</h1>
    <Route exact path="/posts" >
        <PostList/>
    </Route>
    <Route exact path="/posts/:postId(\d+)" >
        <PostDetail/>
    </Route>
    <Route exact path="/categories">
          <CategoryList />
    </Route>
    <Route exact path="/tags">
      <TagManagement />
    </Route>
          
    <Route exact path="/users">
        <Users />
      </Route>
    <Route exact path="/users/:userId">
        <UserPage />
    </Route>

  </>)
}
