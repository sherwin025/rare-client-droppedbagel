import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/CategoryList"
import { TagManagement } from "./tags/TagManagement"


export const ApplicationViews = () => {
  return (
    <>
    <h1 >Welcome to Rare Publishing</h1>
    <Route exact path="/categories">
          <CategoryList />
    </Route>
    <Route exact path="/tags">
      <TagManagement />
    </Route>
    </>
  )
}
