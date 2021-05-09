import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;

  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode; //Pode ser qualquer TAG HTML
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  /**
   * @param episode
   *
   * Passa somente uma música para ser executada. Esta função será executada ao exibir
   * os detalhes de um podcast específico e clicar no botão PLAY.
   */
  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  /**
   * @param list
   * @param index
   *
   * Passa sempre uma lista de áudios e é reproduzido aquela em que ele clicar
   * através do parâmetro INDEX.
   *
   * Esta função será utilizada na página HOME.
   */
  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  // Mudar sempre para o oposto (TRUE ou FALSE) a imagem do botão PLAY/PAUSE
  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  // Mudar sempre para o oposto (TRUE ou FALSE) a cor do botão BRANCO/VERDE
  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  // Mudar sempre para o oposto (TRUE ou FALSE) a imagem do botão BRANCO/VERDE
  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  // Muda o estado da música (se está tocando ou não)
  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  // Limpa a lista de áudios
  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  // Verifica se tem algum item anterior
  const hasPrevious = currentEpisodeIndex > 0;
  // Verifica se há um próximo item
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      // Seta um index aleatório com limite do tamanho do array
      const nextRadomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );

      setCurrentEpisodeIndex(nextRadomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    // Se a música for a primeira, não é possível voltar para a anterior
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
        hasNext,
        hasPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
