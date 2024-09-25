import { useFieldArray, useFormContext } from "react-hook-form";
import { RefObject, useContext, useRef } from "react";
import { MdAdd, MdDelete, MdLink } from "react-icons/md";
import { Root } from "../../../../../../components/Form/FormRoot";
import { ChatSchema } from "../../../../../../schema/zod/chatSchema";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../components/modal/templates/PopOver";
import { Input } from "../../../../../../components/Form/components/Fields/Input/Input";
import { Title } from "../../../../../../components/Title/Title";
import { Link } from "../../../../../../@types/Project";
import { TextArea } from "../../../../../../components/Form/components/Fields/TextArea/TextArea";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { Button } from "../../../../../../components/button/Button";
import { SubTitle } from "../../../../../../components/SubTitle/SubTitle";

interface Field extends Link {
    id: string,
}

export function LinkFormChat() {
    const formLinkRef: RefObject<HTMLDivElement> = useRef(null);
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { control } = useFormContext<ChatSchema>();
    const { fields, remove, append }: any = useFieldArray({
        control,
        name: "links"
    })

    const handleAddCTA = () => {
        const title = (formLinkRef.current?.querySelector("input[name=title]") as HTMLTextAreaElement);
        const url = (formLinkRef.current?.querySelector("input[name=url]") as HTMLInputElement);
        const description = (formLinkRef.current?.querySelector("textarea[name=description]") as HTMLTextAreaElement);

        if (url && description && title) {
            if (description.value.length > 30) {
                append({ url: url.value, description: description.value, title: title.value })
                title.value = "";
                url.value = "";
                description.value = "";
                clearModal("modal_display_add_link")
            } else setModalContent({
                componentName: "modal_error_min_text",
                components:
                    <PopOver
                        componentName="modal_error_min_text"
                        message="Digite uma descrição maior para sua CTA, lembre-se que ela é muito importante para nossa IA entender o contexto da conversa."
                        type="WARNING"
                    />
            })

        } else {
            setModalContent({
                componentName: "modal_error_add_product",
                components:
                    <PopOver
                        componentName="modal_error_add_product"
                        message="Preencha todos os dados antes de adicionar um novo link"
                        type="WARNING"
                    />
            })
        }
    }

    const displayModalAddLink = () => {

        setModalContent({
            componentName: "modal_display_add_link",
            components:
                <PopUp>
                    <div
                        ref={formLinkRef}
                        className="w-full flex flex-col gap-6 p-4"
                    >
                        <Title>Adicione um novo link</Title>

                        <Input
                            name={`title`}
                            title={`Digite o titulo da url`}
                        />

                        <Input
                            name={`url`}
                            title={`Digite a url do link`}
                            onChange={({ currentTarget }) => {
                                if (!currentTarget.value.toLowerCase().includes("http"))
                                    currentTarget.value = `https://${currentTarget.value.replace("http", "")}`
                            }}
                        />
                        <TextArea
                            name={`description`}
                            title={`Digite uma descrição do link`}
                            minText={30}
                        />

                        <Button
                            onClick={() => handleAddCTA()}
                        >
                            <MdAdd />
                            Adicionar link
                        </Button>
                    </div>
                </PopUp>
        })

    };


    return (
        <div className="w-full md:w-autoflex flex-col border-2 md:border-none border-primary-100 rounded-md md:rounded-none p-2 md:p-0">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Title className="text-left md:text-base">Adicione links que podem ser relevantes para seu chat</Title>
                    <span className="text-sm opacity-80 md:opacity-70">(Esses links podem ser usados no contexto da conversa)</span>
                </div>
            </div>

            <Root.Container
                data-linkisempty={!fields.length}
                className="group flex gap-6 my-4 justify-end data-[linkisempty=true]:items-center data-[linkisempty=true]:flex-col"
            >

                <SubTitle
                    className="group-data-[linkisempty=false]:hidden text-xl opacity-70"
                >Você ainda não adicionou nenhum link</SubTitle>
                <Button
                    type="button"
                    className="p-1 size-10 fill-primary-100 bg-primary-200 rounded-full cursor-pointer"
                    onClick={displayModalAddLink}
                >
                    <MdAdd />
                    {!!fields.length ? "Adicionar mais": "Adicionar primeiro link" }
                </Button>

            </Root.Container>

            <Root.Container
                className="flex flex-col my-4"
                hiddenContainer={!fields.length}
            >
                <Title className="font-bold my-2 text-left">Seus links:</Title>
                <div className="max-h-[120px] overflow-auto flex justify-center gap-4">
                    {fields.map((field: Field, index: number) =>
                        <div
                            key={field.id}
                            data-display={!!field.url}
                            className="py-1 bg-primary-300 border border-primary-50/50 rounded-md flex justify-between items-center px-2 data-[display=false]:hidden"
                        >
                            <div className="flex gap-2 items-center">
                                <MdLink />
                                <span className="font-bold pr-2">{field.title}</span>
                            </div>
                            <MdDelete
                                className="text-2xl fill-red-400 rounded-full cursor-pointer"
                                onClick={() => remove(index)}
                            />
                        </div>
                    )}
                </div>
            </Root.Container>


        </div>
    )
};
