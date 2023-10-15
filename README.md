Trying to make a component that takes text and renders
it, but allows selections from the user to be highlighted.
I found: https://medium.com/unprogrammer/a-simple-text-highlighting-component-with-react-e9f7a3c1791a

Based on the approach there, I'm basically trying to generalize it.

It still has a lot of problems:
- select text that spans multiple spans
  - figured out how to detect this and just do nothing, but
    it would be better to merge them properly 

## Running the app
Just regular `npm install` and `npm run dev`