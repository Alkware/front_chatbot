// import { MouseEvent, RefObject, useEffect, useRef } from "react"
// import { FaPlayCircle } from "react-icons/fa";
// import Vimeo from '@vimeo/player';

// // interface VimeoPlayerRef {
//   play: () => Promise<void>;
//   pause: () => Promise<void>;
//   destroy: () => void;
//   // adicione outras propriedades e métodos conforme necessário
// }


export function Desktop() {
  // const frameRef: RefObject<HTMLIFrameElement> = useRef(null);
  // let vimeoPlayer: VimeoPlayerRef | null = null;

  // useEffect(() => {
  //     if (frameRef.current) {
  //       // Initialize the Vimeo player
  //       vimeoPlayer = new Vimeo(frameRef.current, {
  //         url: 'https://vimeo.com/928087677', // Substitua VIDEO_ID pelo ID do vídeo do Vimeo
  //       });
  //     }

  //     return () => {
  //       // Cleanup the player when component unmounts
  //       if (vimeoPlayer) {
  //         vimeoPlayer.destroy();
  //       }
  //     };
  //   }, []);

  // const handleClickPlay = (e: MouseEvent)=>{
  //     vimeoPlayer?.play();
  //     e.currentTarget.classList.add("hidden")
  // }


  return (
    <div
      className="w-full h-full flex flex-col gap-4 justify-center items-center bg-black absolute top-0 invisible change-device"
    >

    </div>
  )
};