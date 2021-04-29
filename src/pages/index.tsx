/** Utilizando o modelo SSR (Server side rendering) */
export default function Home(props) {
  /**
   * Ao tentar exibir um console.log no navegador com o método de SSR, ele
   * não me retorna nada. Isso porque, como o arquivo está sendo executado no
   * servidor NEXT, o console.log será exibido no segundo servidor (NEXT server)
   * e não no browser.
   */
  // console.log(props.episodes);

  return (
    <>
      <h1>Index</h1>

      {/** Para isto acontecer, basta colocar o seguinte código. O servidor
       * NEXT carregará as informações e entregará para o client um "arquivo
       * estático com as informações"
       */}
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

/**
 * Apenas por exportar uma função com este nome, o NEXT entenderá que precisa
 * executar esta função antes da renderização acima
 */
export async function getServerSideProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
  };
}
