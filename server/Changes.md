### Book.Model.JS
1. change `lent` in **status enum** to `borrowed`. 
2. Also from `service functions` in each file.

### Changes in Book Condition
1. I've written in Schema
  ```js
    `enum`=['new', 'like_new', 'good', 'fair'],
  ```
2. but in frontend 
  ```js
    `condition`=['new', 'good', 'fair', 'poor']
  ```
- I need to change backend's enum into the frontend's enum;