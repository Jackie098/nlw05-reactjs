/** Utilizando o modelo SSG (Static site generator) */
export default function Home(props) {
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

/**
 * Este método serve para salvar uma criação estática da página em questão e
 * salvá-la em cache.
 *
 * O atributo 'revalidate' dita a cada quanto tempo em segundos a página será
 * atualizada.
 *
 * NOTA: Este modelo só funciona em PRODUÇÃO (quando o servidor está "upado")
 */
export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // A cada 8hrs
  };
}
