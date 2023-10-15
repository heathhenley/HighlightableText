import { useState } from "react";
import "./App.css";

const dummyText =
  "This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex.";

type TWord = {
  text: string;
  highlighted: boolean;
};
const highlightedStyle = {
  backgroundColor: "yellow",
  cursor: "pointer",
};

const HighlightableText = ({text}: {text: string}) => {
  const [highlighted, setHighlighted] = useState<TWord[]>(
    [
      { text: text, highlighted: false },
    ]
  );

  const handleHighlightText = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection) {
      console.log(selection);
      let start = selection.anchorOffset;
      let end = selection.focusOffset;
      // this is if the user selects from right to left
      if (start > end) {
        [start, end] = [end, start];
      }
      const highlightedText = selection.toString();
      // correct offsets for parent elements
      const parent = selection.anchorNode?.parentElement;
      if (parent?.getAttribute("data-order") === "middle") {
        console.log("middle");
        // we need the start of the select in the actual text, but
        // we have them in separate spans to highlight, so we
        // need to add the length of the first span (not highlighted)
        // to the start and end offsets
        start += highlighted[0].text.length;
        end += highlighted[0].text.length;
      } else if (parent?.getAttribute("data-order") === "last") {
        console.log("last");
        // same as above but need both the first and second spans
        start += highlighted[0].text.length + highlighted[1].text.length;
        end += highlighted[0].text.length + highlighted[1].text.length;
      }
      setHighlighted([
        { text: text.slice(0, start), highlighted: false },
        { text: highlightedText, highlighted: true },
        { text: text.slice(end), highlighted: false },
      ]);
    }
  };
  return (
    <div onMouseUp={(e) => handleHighlightText(e)}>
        <span data-order="first">{highlighted[0].text}</span>
        <span style={highlightedStyle} data-order="middle">{highlighted[1]?.text}</span>
        <span data-order="last">{highlighted[2]?.text}</span>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <HighlightableText text={dummyText} />
    </div>
  );
}

export default App;
