import React from "react"
import { Route } from "react-router-dom"
import { Users } from "./Users/Users"
import { UserPage } from "./Users/UserPage"
import { PostDetail } from "./posts/Postdetail"
import { PostList } from "./posts/Postlist"
import { CategoryList } from "./categories/CategoryList"
import { TagManagement } from "./tags/TagManagement"
import { UserPostList } from "./posts/UserPosts"
import { NewPost } from "./posts/NewPost"
import { EditCategory } from "./categories/EditCategory"
import { CommentList } from "./comments/CommentList"
import { CommentForm } from "./comments/CommentForm"
import { EditPost } from "./posts/EditPost"
import { Landing } from "./home/Landing"
import { AdminPostList } from "./posts/adminPostList" 
import { ReactionManagement } from "./reactions/ReactionManagement"


export const ApplicationViews = () => {
  const admin = localStorage.getItem('isStaff') === "true"
  return (<>

    <Route exact path="/posts" >
      <PostList/>
    </Route>
    <Route exact path="/adminposts" >
      <AdminPostList/>
    </Route>
    <Route exact path="/posts/:postId(\d+)" >
      <PostDetail/>
    </Route>
    <Route exact path="/categories">
      <CategoryList />
    </Route>
    <Route exact path="/categories/:catId(\d+)">
      <EditCategory />
    </Route>
    <Route exact path="/tags">
      <TagManagement />
    </Route>
    <Route exact path="/reactions">
      <ReactionManagement />
    </Route>
    <Route exact path="/userposts">
      <UserPostList />
    </Route>
    <Route exact path="/new-post">
      <NewPost/>
    </Route>          
    <Route exact path="/users">
      {
        admin
        ? <Users /> 
        : ""
      }

    </Route>
    <Route exact path="/users/:userId">
        <UserPage />
    </Route>
    <Route exact path="/comments/:postId(\d+)">
        <CommentList />
    </Route>
    <Route exact path="/commentForm/:postId(\d+)">
        <CommentForm />
    </Route>
    <Route exact path="/editPost/:postId(\d+)">
      <EditPost />
    </Route>
    <Route exact path="/">
        <Landing />
      </Route>

  </>)
}
