import { MouseEvent, useState } from "react";

const tabManagement = [
  {
    index: 0,
    title: "Plataforma",
    src: "https://i.ibb.co/M8Kcxym/Untitled-design.gif",
    alt: "Imagem da plataforma da wipzee"
  },
  {
    index: 1,
    title: "Personalize seu chat",
    src: "https://i.ibb.co/M8Kcxym/Untitled-design.gif",
    alt: "Imagem da plataforma da wipzee"
  },
  {
    index: 2,
    title: "Métricas",
    src: "https://i.ibb.co/M8Kcxym/Untitled-design.gif",
    alt: "Imagem da plataforma da wipzee"
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
  const currentImage = tabManagement.find(tab => tab.index === currentTab)

  const handleSelectTab = (e: MouseEvent<HTMLSpanElement>) => {
    const currentIndex = e.currentTarget.tabIndex;
    setCurrentTab(currentIndex)
  }

  return (
    <div
      className="w-screen h-screen flex flex-col gap-12 items-center"
    >
      <h2 className="text-4xl font-bold">Conheça nossa plataforma</h2>

      <div className="w-4/5 flex border border-primary-100 rounded-md">
        <div className="w-1/4 flex flex-col items-center border-r border-primary-100/50">
          {
            tabManagement.map(tab =>
              <span
                key={tab.index}
                tabIndex={tab.index}
                className="p-2 border-b border-primary-100/50 w-full text-center cursor-pointer hover:bg-primary-100"
                onClick={handleSelectTab}
              >{tab.title}</span>
            )
          }


        </div>
        <div className="w-3/4">
          {
            currentImage ?
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full object-cover"
              />
              :
              <span>Nenhuma imagem a mostrar aqui</span>
          }

        </div>
      </div>

    </div>
  )
};