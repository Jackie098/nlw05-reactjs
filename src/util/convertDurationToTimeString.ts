export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600); //Convertendo segundos em hrs e arredondando pra baixo
  const minutes = Math.floor((duration % 3600) / 60); //Pego o resto e divido por 60
  const seconds = duration % 60; // O resto da duration

  /**
   * A hora formatada será um vetor e estará em STRING.
   * A função a baixo serve para adicionar um 0 na frente da data que contiver
   * apenas um número, ex:
   *
   * 1hr = 01 hora
   * 5min = 05 min
   * 9seg = 09 seg
   *
   * No final fica assim:
   * --> 01:05:09
   *
   * Uma hora, cinco minutos e nove segundos
   */
  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  return timeString;
}
