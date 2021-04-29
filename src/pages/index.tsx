import { useEffect } from "react";

/** Utilizando o modelo SPA's */
export default function Home() {
  useEffect(() => {
    fetch("http://localhost:3333/episodes")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <h1>Index</h1>;
}
