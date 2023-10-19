import "./App.css";
import HighlightableText from "./components/HighlightableText";

const dummyText =
  "This is a bunch of dummy text to test highlighting! This is a bunch of dummy text to test highlighting. Test text to highlight. This is a bunch of fake test to test highlighting. Test text to highlight. This is a bunch of fake test to test highlighting.";

function App() {
  return (
    <div className="App">
      <HighlightableText text={dummyText} />
    </div>
  );
}

export default App;
