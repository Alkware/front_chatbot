import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Vimeo from '@vimeo/player';
import { Button } from "../../../../../../components/button/Button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      className="w-screen h-auto py-12 flex flex-col gap-0 md:gap-12 items-center relative"
    >
      <h2 className="max-2xs:text-2xl text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold py-12 text-center md:text-left">Conheça nossa plataforma</h2>

      <div className="flex flex-col md:flex-row rounded-md z-10">

        <div className="w-full md:w-1/4 min-w-[200px] flex flex-col justify-between md:justify-start p-2 md:p-0 items-center bg-primary-100 dark:bg-primary-300">
          {
            tabManagement.map(tab =>
              <span
                key={tab.index}
                tabIndex={tab.index}
                data-active={tab.index === currentVideo?.index}
                className="w-full p-1 md:p-2 md:border-b border-primary-100/50 md:w-full text-center text-sm md:text-md text-light dark:text-primary-100 cursor-pointer hover:bg-primary-200/30 data-[active=true]:bg-primary-200/30"
                onClick={handleSelectTab}
              >{tab.title}</span>
            )
          }
        </div>

        <div className="bg-dark">
          {
            currentVideo ?
              <div className="relative border-8 border-primary-100 dark:border-primary-300 ">
                <div
                  ref={playRef}
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
                  className="w-[90vw] md:w-[70vw] h-[51vw] md:h-[39.5vw] object-contain"
                ></iframe>
              </div>
              :
              <span>Nenhuma imagem a mostrar aqui</span>
          }

        </div>

      </div>

      <Button 
        customClass="neon-effect-hover z-50 max-sm:my-8"
        onClick={()=> navigate("/register")}
    
      >Conhecer a plataforma</Button>


      <div className="w-[90vw] md:w-[50vw] h-[40vw] absolute top-[20%] md:top-1/3 left-1/2 -z-0 flex justify-start items-center gap-2 -translate-x-1/2 ">
        <div className="w-full h-full radial-gradient flex gap-2 justify-center items-center"></div>
      </div>

    </div>
  )
};