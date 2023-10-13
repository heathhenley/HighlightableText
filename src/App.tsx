import { useEffect, useState } from "react";
import "./App.css";

const text =
  "This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex.";

type TWord = {
  text: string;
  highlighted: boolean;
};

function App() {
  const [highlighted, setHighlighted] = useState<TWord[]>();

  useEffect(() => {
    setHighlighted(
      text.split(" ").map((t) => ({ text: t, highlighted: false }))
    );
  }, []);

  const handleHighlightText = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection) {
      const t = selection.getRangeAt(0).toString();
      console.log(t);
      if (t && t.length > 0) {
        setHighlighted(
          highlighted?.map((h) => {
            if (t.includes(h.text)) {
              return { ...h, highlighted: true };
            }
            return h;
          })
        );
      }
    }
  };
  const highlightedStyle = {
    backgroundColor: "yellow",
    cursor: "pointer",
  };
  const normalStyle = {
    backgroundColor: "transparent",
  };
  return (
    <div onMouseUp={(e) => handleHighlightText(e)}>
      {highlighted?.map((h, i) => (
        <span key={i} style={h.highlighted ? highlightedStyle : normalStyle}>
          {" "}
          {h.text}{" "}
        </span>
      ))}
    </div>
  );
}

export default App;
