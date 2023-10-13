import { useState } from "react";
import "./App.css";

const text =
  "This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex. This is a bunch of text that we want to render, in the real system this comes from Convex.";

type TSelection = {
  text: string;
  startIdx: number;
};

const mergeHighlighted = (
  highlighted: TSelection[],
  newStart: number,
  newEnd: number
) => {
  // if the new selection overlaps with an existing selection,
  // we need to merge them
  for (let i = 0; i < highlighted.length; i++) {
    let h = highlighted[i];
    let existingEnd = h.startIdx + h.text.length;
    let existingStart = h.startIdx;
    // is there an overlap?
    if (
      (newStart >= existingStart && newStart <= existingEnd) ||
      (newEnd >= existingStart && newEnd <= existingEnd)
    ) {
      // there is an overlap, so we need to merge
      // we need to find the new start and end
      newStart = Math.min(newStart, existingStart);
      newEnd = Math.max(newEnd, existingEnd);
      highlighted[i] = {
        text: text.substring(newStart, newEnd),
        startIdx: newStart,
      };
    }
  };
  return highlighted;
};

function App() {
  const [highlighted, setHighlighted] = useState<TSelection[]>([]);

  const handleHighlightText = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection) {
      // if any previous selections overlap, we need to remove them
      let start = selection.anchorOffset;
      let end = selection.toString().length + start;
      const tmpHighlighted = mergeHighlighted(highlighted, start, end);
      setHighlighted(tmpHighlighted);
    }
  };
  console.log(highlighted);
  return <div onMouseUp={(e) => handleHighlightText(e)}>{text}</div>;
}

export default App;
