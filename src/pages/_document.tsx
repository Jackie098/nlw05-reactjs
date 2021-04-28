/* Para evitar que sempre carregue todos todos arquivos indexados no '_app.tsx'
utilizamos este arquivo para carregar somente uma vez arquivos que serão utilizados
em todo o sistema, como: fontes */

import Document, { Html, Head, Main, NextScript } from "next/document";

// Possui o formato de classe porque o NEXT exige isso
export default class MyDocument extends Document {
  render() {
    return (
      // TAG's importadas do NEXT para definir os 'documentos' da aplicação
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main /> {/** Aqui ficará todo o conteúdo da aplicação */}
          <NextScript />
          {/** Aqui ficará todos os scripts necessários para que o next
           * rode no nosso projeto. Eles serão importados no NEXT.
           */}
        </body>
      </Html>
    );
  }
}
