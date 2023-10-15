Trying to make a component that takes text and renders
it, but allows selections from the user to be highlighed.
I found: https://medium.com/unprogrammer/a-simple-text-highlighting-component-with-react-e9f7a3c1791a

Based on the approach there, I'm basically trying to generalize it.

It still has a lot of problems:
- select text that spans multiple spans
- sometimes it doesn't seem to highlight
- not working when last character selected is one of the ends of the whole text