import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { fetchCharacter, MessageComponent } from "./components/MessageComponent";

const characterPromise = fetchCharacter();

// Error code below
// const characterPromise = fetchCharacter(-1);

function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Suspense fallback="Your shite is loading">
        <MessageComponent messagePromise={characterPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
