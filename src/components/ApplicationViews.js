import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/CategoryList"

export const ApplicationViews = () => {
  return (
    <>
    <Route exact path="/categories">
          <CategoryList />
    </Route>

    <h1 >Welcome to Rare Publishing</h1>
    </>
  )
}
