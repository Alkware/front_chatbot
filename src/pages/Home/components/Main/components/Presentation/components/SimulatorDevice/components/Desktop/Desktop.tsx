import { MouseEvent, RefObject, useEffect, useRef } from "react"
import { FaPlayCircle } from "react-icons/fa";
import Vimeo from '@vimeo/player';

interface VimeoPlayerRef {
    play: () => Promise<void>;
    pause: () => Promise<void>;
    destroy: () => void;
    // adicione outras propriedades e métodos conforme necessário
  }
  

export function Desktop() {
    const frameRef: RefObject<HTMLIFrameElement> = useRef(null);
    let vimeoPlayer: VimeoPlayerRef | null = null;

    useEffect(() => {
        if (frameRef.current) {
          // Initialize the Vimeo player
          vimeoPlayer = new Vimeo(frameRef.current, {
            url: 'https://vimeo.com/923468323', // Substitua VIDEO_ID pelo ID do vídeo do Vimeo
          });
        }
    
        return () => {
          // Cleanup the player when component unmounts
          if (vimeoPlayer) {
            vimeoPlayer.destroy();
          }
        };
      }, []);

    const handleClickPlay = (e: MouseEvent)=>{
        vimeoPlayer?.play();
        e.currentTarget.classList.add("hidden")
    }


    return (
        <div
            className="w-full h-full flex flex-col gap-4 justify-center items-center bg-black absolute top-0 invisible change-device"
        >
            <h2 className="font-bold text-3xl uppercase text-center z-50 relative p-4">Veja como é simples criar seu primeiro chat</h2>

            <div className="w-full h-4/5 rounded-md overflow-hidden relative ">
                <iframe
                    ref={frameRef}
                    src="https://player.vimeo.com/video/923468323?badge=0&amp;controls=0&amp;player_id=0&amp;app_id=58479&amp;loop=1"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", }}
                    title="Agora é só proceguir )"
                ></iframe>

                <div className="w-[200px] h-[200px] flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <FaPlayCircle
                        className="text-6xl fill-primary-100 cursor-pointer "
                        onClick={handleClickPlay}
                    />
                </div>
            </div>
        </div>
    )
};