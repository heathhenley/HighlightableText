import { useState } from "react";

type TTextSection = {
  text: string;
  highlighted: boolean;
};

// Represents the text as a series of sections, each of which is either
// highlighted or not. They get drawn into spans in order.
type TOrderedTextSection = TTextSection[];

const highlightedStyle = {
  backgroundColor: "yellow",
  cursor: "pointer",
};

const HighlightableText = ({
  text,
  onTextHighlighted,
}: {
  text: string;
  onTextHighlighted?: (s: string) => void;
}) => {
  const [highlighted, setHighlighted] = useState<TOrderedTextSection>([
    { text: text, highlighted: false },
  ]);

  const handleHighlightText = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    // These are relative to the span, not the whole text
    let start = selection.anchorOffset;
    let end = selection.focusOffset;
    // swap if the user selects from right to left
    if (start > end) {
      [start, end] = [end, start];
    }

    if (start === end) {
      return;
    }

    const tmpHighlighted: TOrderedTextSection = [];

    // check if selection crosses a span boundary
    const startNodeParent = selection.anchorNode?.parentNode;
    const endNodeParent = selection.focusNode?.parentNode;
    if (
      !startNodeParent ||
      !endNodeParent ||
      startNodeParent !== endNodeParent
    ) {
      // TODO - handle selection that spans multiple spans
      console.log("selection spans multiple spans");
      return;
    }

    // compensate the start/end offsets for the lengths of the previous spans
    let endOfLastSpanBeforeSelection = 0;
    let endOfSpanContainingSelection = 0;
    const grandpaNode = selection.anchorNode?.parentNode?.parentNode;
    grandpaNode?.childNodes.forEach((child, idx) => {
      // is this child before the selection?
      let position = selection.anchorNode?.compareDocumentPosition(child);
      if (position && position === Node.DOCUMENT_POSITION_PRECEDING) {
        start += child.textContent?.length || 0;
        end += child.textContent?.length || 0;
        endOfLastSpanBeforeSelection += child.textContent?.length || 0;
        tmpHighlighted.push({
          text: child.textContent || "",
          highlighted: highlighted[idx].highlighted,
        });
      }
      if (position && position === 10) {
        endOfSpanContainingSelection = child.textContent?.length || 0;
        // this is the existing span containing our selection - we need to add
        // the beginning of it before the selection as unhighlighted
        tmpHighlighted.push({
          text: text.slice(endOfLastSpanBeforeSelection, start) || "",
          highlighted: highlighted[idx].highlighted,
        });
      }
    });
    // add the current selection as highlighted, and rest of the text in the
    // span containing the selection as unhighlighted
    const endOfSpanContainingSelectionInText =
      endOfLastSpanBeforeSelection + endOfSpanContainingSelection;
    tmpHighlighted.push({ text: text.slice(start, end), highlighted: true });
    tmpHighlighted.push({
      text: text.slice(end, endOfSpanContainingSelectionInText),
      highlighted: false,
    });

    // add the rest of the spans back in
    grandpaNode?.childNodes.forEach((child, idx) => {
      // is this child before the selection?
      let position = selection.anchorNode?.compareDocumentPosition(child);
      if (position && position === Node.DOCUMENT_POSITION_FOLLOWING) {
        tmpHighlighted.push({
          text: child.textContent || "",
          highlighted: highlighted[idx].highlighted,
        });
      }
    });
    setHighlighted(tmpHighlighted);
    if (onTextHighlighted) {
      onTextHighlighted(selection.toString());
    }
  };

  return (
    <div onMouseUp={(e) => handleHighlightText(e)}>
      {highlighted.map((word, idx) => (
        <span key={idx} style={word.highlighted ? highlightedStyle : {}}>
          {word.text}
        </span>
      ))}
    </div>
  );
};

export default HighlightableText;