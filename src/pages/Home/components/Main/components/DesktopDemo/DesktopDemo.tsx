import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Vimeo from '@vimeo/player';

const tabManagement = [
  {
    index: 0,
    title: "Plataforma",
    videoID: "930305005",
  },
  {
    index: 1,
    title: "Personalize seu chat",
    videoID: "930347091",
  },
  {
    index: 2,
    title: "Métricas",
    videoID: "930351765",
  },
  {
    index: 3,
    title: "Analises de Métricas",
    src: "https://i.ibb.co/M8Kcxym/Untitled-design.gif",
    alt: "Imagem da plataforma da wipzee"
  },
  {
    index: 4,
    title: "Histórico de conversas",
    src: "https://i.ibb.co/M8Kcxym/Untitled-design.gif",
    alt: "Imagem da plataforma da wipzee"
  },
]

export function DesktopDemo() {
  const [currentTab, setCurrentTab] = useState(0);
  const [player, setPlayer] = useState<any>();
  const playerRef = useRef(null);
  const playRef: RefObject<HTMLDivElement> = useRef(null);
  const currentVideo = tabManagement.find(tab => tab.index === currentTab)

  useEffect(() => {
    if (playerRef.current) {
      // Inicializa o player do Vimeo
      const playerData = new Vimeo(playerRef.current, {
        url: `https://player.vimeo.com/video/${currentVideo?.videoID}?controls=0&loop=1`, // Substitua VIDEO_ID pelo ID do vídeo do Vimeo
      });

      setPlayer(playerData)
    }

    return () => {
      // Limpa o player quando o componente for desmontado
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const handlePlay = (e: MouseEvent) => {
    if (player) {
      player.play();
      e.currentTarget.classList.add("hidden")
    }
  };

  const handleSelectTab = (e: MouseEvent<HTMLSpanElement>) => {
    const currentIndex = e.currentTarget.tabIndex;
    playRef.current?.classList.remove("hidden")
    setCurrentTab(currentIndex)
  }

  return (
    <div
      className="w-screen h-screen flex flex-col gap-12 items-center relative"
    >
      <h2 className="text-6xl font-bold py-12">Conheça nossa plataforma</h2>

      <div className="w-4/5 flex rounded-md z-10">

        <div className="w-1/4 flex flex-col items-center bg-primary-300">
          {
            tabManagement.map(tab =>
              <span
                key={tab.index}
                tabIndex={tab.index}
                data-active={tab.index === currentVideo?.index}
                className="p-2 border-b border-primary-100/50 w-full text-center cursor-pointer hover:bg-primary-100/30 data-[active=true]:bg-primary-100/30"
                onClick={handleSelectTab}
              >{tab.title}</span>
            )
          }
        </div>

        <div className="w-auto bg-dark">
          {
            currentVideo ?
              <div className="w-[900px] h-[513px] relative border-8 border-primary-300 ">
                <div
                  ref={playRef}
                  className=""
                  onClick={handlePlay}
                >
                  <FaPlayCircle
                    className="text-6xl fill-primary-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  />
                </div>
                <iframe
                  ref={playerRef}
                  src={`https://player.vimeo.com/video/${currentVideo.videoID}?controls=0&autopause=0&loop=1`}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title={currentVideo.title}
                  className="w-full h-full object-contain"
                ></iframe>
              </div>
              :
              <span>Nenhuma imagem a mostrar aqui</span>
          }

        </div>
      </div>

      <div className="w-[50vw] h-[40vw] absolute top-1/3 left-1/2 -z-0 flex justify-start items-center gap-2 -translate-x-1/2">
        <div className="w-full h-full radial-gradient flex gap-2 justify-center items-center">
          
        </div>
      </div>

    </div>
  )
};