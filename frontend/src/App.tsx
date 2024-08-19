// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Button } from "../src/@/components/ui/button";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Button
        onClick={() => {
          console.log("abc..c");
        }}
      >
        Click me
      </Button>
    </>
  );
}

export default App;
