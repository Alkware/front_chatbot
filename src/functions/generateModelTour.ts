import { Client } from "../@types/Client.types";
import { Model } from "../components/Tour/Tour";

export function generateModelToTour(client: Client | undefined): Model[] {
    if (!client) return [];

    return [
        {
            title: "Crie sua primeira inteligência artificial:",
            stages: [
                {
                    title: `No canto esquerdo da sua tela existe um menu de navegação, procure por "Inteligência artificial."`,
                    image: "https://wipzee-files.online/create-ai.png"
                },
                {
                    title: `Agora basta clicar em cima de um slot vazio para criar sua primeira inteligência artificial."`,
                    image: "https://wipzee-files.online/tour-create-ai.png"
                }
            ],
            buttons: [{
                url: `/create-ai/${client.plan_management.id}`,
                target: "_parent"
            }],
            completed: !!client.plan_management.artificial_intelligence.length,
            display: !client.plan_management.artificial_intelligence.length,
        },
        {
            title: "Crie seu primeiro chat:",
            stages: [
                {
                    title: `Agora no menu de navegação procure por "meus chats"`,
                    image: "https://wipzee-files.online/tour-create-chat.png"
                },
                {
                    title: `Basta clicar em cima de um slot vazio para criar seu primeiro chat."`,
                    image: "https://wipzee-files.online/tour-create-chat-2.png"
                }
            ],
            buttons: [{
                url: `/create-chat/${client.plan_management.id}`,
                target: "_parent"
            }],
            completed: !!client.plan_management.project.length,
            display: !!client.plan_management.artificial_intelligence.length && !client.plan_management.project.length,
        },
        {
            title: "Teste seu chat:",
            stages: [
                {
                    title: `Agora no menu de navegação procure por "meus chats"`,
                    image: "https://wipzee-files.online/tour-create-chat.png"
                },
                {
                    title: `Clique no icone mostrado abaixo:"`,
                    image: "https://wipzee-files.online/tour-get-link.png"
                },
                {
                    title: `Agora aqui no link para abrir seu chat"`,
                    image: "https://wipzee-files.online/tour-get-link-3.png"

                },
                {
                    title: `Você também pode usar o atalho que fica sobre a imagem do seu chat`,
                    image: "https://wipzee-files.online/tour-get-link-2.png"

                }
            ],
            buttons: [{
                url: `https://chat.wipzee.com/${client.plan_management.project[0]?.slug}`,
                target: "_blank"
            }],
            completed: !!client.plan_management.project[0]?.message_manager[0]?.messages.length,
            display: !!client.plan_management.project.length && !client.plan_management.project[0]?.message_manager[0]?.messages.length
        },
        {
            title: "Adicione seus produtos:",
            stages: [
                {
                    title: `Agora no menu de navegação procure por "meus produtos"`,
                    image: "https://wipzee-files.online/tour-add-product.png"
                },
                {
                    title: `Clique em "Adicionar categoria"`,
                    image: "https://wipzee-files.online/tour-add-product-1.png"
                },
                {
                    title: `Escolha o nome da categoria do seu produto/serviço e clique em "Criar categoria"`,
                    image: "https://wipzee-files.online/tour-add-product-2.png"

                },
                {
                    title: `Agora você escolhe o tipo de oferta, se seu produto é um produto fisico ou se é um serviço.`,
                    image: "https://wipzee-files.online/tour-add-product-3%20(1).png"

                }
            ],
            buttons: [
                {
                    url: `/create-product/${client.plan_management.id}/null`,
                    target: "_parent",
                    text: "Crie seu produto"
                },
                {
                    url: `/create-service/${client.plan_management.id}/null`,
                    target: "_parent",
                    text: "Crie seu serviço"
                }
            ],
            completed: (!!client.plan_management.products.length || !!client.plan_management.services.length),
            display: (!client.plan_management.products.length && !client.plan_management.services.length) && !!client.plan_management.project[0]?.message_manager[0]?.messages.length
        },
        {
            title: "Vincule seus produtos a sua inteligência artificial:",
            stages: [
                {
                    title: `Agora no menu de navegação procure por "Inteligência artificial"`,
                    image: "https://wipzee-files.online/create-ai.png"
                },
                {
                    title: `Selecione sua inteligência artificial`,
                    image: "https://wipzee-files.online/tour-linked-product.png"
                },
                {
                    title: `Na aba "Vincule seus produtos", Clique no botão "+"`,
                    image: "https://wipzee-files.online/tour-linked-product%20(1).png"

                },
                {
                    title: `Agora basta clicar sobre os produtos e serviços que você deseja que sua IA tenha conhecimento.`,
                    image: "https://wipzee-files.online/tour-linked-product%20(2).png"
                },
                {
                    title: `No canto inferior esquerdo, basta clicar no icone de salvar e pronto! seu chat está pronto para o uso!`,
                    image: "https://wipzee-files.online/tour-linked-product%20(3).png"
                }
            ],
            buttons: [
                {
                    url: `/panel?tab=artificial_intelligence`,
                    target: "_parent",
                }
            ],
            completed: !!client.plan_management.artificial_intelligence[0]?.ai_products_Services.length,
            display: (!!client.plan_management.products.length || !!client.plan_management.services.length) && !client.plan_management.artificial_intelligence[0]?.ai_products_Services.length
        },
    ]
};