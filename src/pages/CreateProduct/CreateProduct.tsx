import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DatabaseSchema, databaseSchema } from "../../schema/zod/databaseSchema";
import { Root } from "../../components/Form/FormRoot";
import { StepBasicProductInfo } from "./components/StepBasicProductInfo/StepBasicProductInfo"
import { setThemePage } from "../../functions/setThemePage";

export function CreateProduct() {
    const { category_name, client_id } = useParams();
    const createDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
    });
    const { handleSubmit } = createDatabaseForm

    const handleCreateDatabase = () => {
        // let prompt_name: string | null = null;

        alert("Esse prompt é experimental, ainda não é possivel criar a fonte de dados")

        // setModalContent({
        //     componentName: "modal_create_name",
        //     components:
        //         <PopUp>
        //             <div
        //                 ref={containerCreateDatabaseRef}
        //                 className="flex flex-col gap-4 p-4"
        //             >
        //                 <h2>De um nome a essa fonte de dados:</h2>
        //                 <input
        //                     type="text"
        //                     placeholder="Ex: Minha fonte de dados"
        //                     className="bg-primary-100/30 dark:bg-zinc-800"
        //                     onChange={(e) => { prompt_name = e.target.value }}
        //                 />
        //                 <Button
        //                     onClick={async () => {
        //                         if (prompt_name) {
        //                             // Busca o botão para ser adicionado o loading...
        //                             const button = containerCreateDatabaseRef.current?.querySelector("button");
        //                             // Adiciona o loading no botão...
        //                             loading(button, true);
        //                             // Transforma os dados do cliente em um prompt para ser enviado para IA...
        //                             const prompt = transformSchemaInText(data);
        //                             // Obtem a descrição do cliente
        //                             const client_describe = data.step_4.client_describe;
        //                             // Transforma em um json  stringfy para que futuramente possa ser transformado em objeto novamente...
        //                             const prompt_query = JSON.stringify(data);

        //                             try {
        //                                 // Cria a fonte de dados...
        //                                 const response: void | AxiosResponse<Database, any> = await createNewDatabase({ prompt_name, prompt, client_describe, prompt_query, plan_management_id });

        //                                 if (response?.status === 201) {

        //                                     // Salva as imagens dos produtos no banco de dados...
        //                                     data.step_0.products.forEach(async (product) => {
        //                                         await saveImage({
        //                                             client_id: response.data.plan_management.client_id,
        //                                             prompt_id: response.data.id,
        //                                             url: product.image.url,
        //                                             description: `Imagem/Imagens/foto/fotos de ${product.image.description}`
        //                                         });
        //                                     })
        //                                     // Remove os dados salvos no localstorage...
        //                                     localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
        //                                     // Desativa o loading...
        //                                     loading(button, false)
        //                                     // Envia uma mensagem que a fonte de dados foi criada com sucesso...
        //                                     setModalContent({
        //                                         componentName: "modal_created_database",
        //                                         components:
        //                                             <PopOver
        //                                                 componentName="modal_created_database"
        //                                                 message="Fonte de dados criada com sucesso!"
        //                                                 type="INFORMATION"
        //                                                 functionAfterComplete={() => window.location.href = "/panel?tab=my_chats"}
        //                                             />
        //                                     })
        //                                 }
        //                             } catch (error) {
        //                                 console.error(error)
        //                             }
        //                         }
        //                     }}
        //                 >Salvar</Button>
        //             </div>
        //         </PopUp>
        // })
    }


    useEffect(() => {
        (async () => {


            // define o thema da página de login
           setThemePage();
        })()
    }, [])

  

    return (
        <div className="w-screen min-h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col justify-start items-center">
            <div className="w-[90%] flex flex-col gap-2 justify-start items-center">
                <Root.Form
                    onSubmit={handleSubmit(handleCreateDatabase)}
                    form={createDatabaseForm}
                >
                    <StepBasicProductInfo 
                        client_id={client_id}
                    />
                </Root.Form>
            </div>
        </div >
    )
};




