export function formatTextAI(message: string) {
    const splitMessage = message.split("");
    let messageFormated = ""

    splitMessage.forEach(msg => {
        if (msg.includes("\n") && !!messageFormated.length) {
            messageFormated += msg + "<br />";
        }else if (msg.includes(":")) {
            messageFormated += msg + "<br />";
        }else messageFormated += msg
    })


    return messageFormated
}