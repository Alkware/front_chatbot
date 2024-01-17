type Target = {
    dataset: {
        field_name: string
    },
    value: string,
}

export function registerDataLocalStorage(target: Target, formName: string | undefined) {
    if(!formName) throw new Error("FormName is missing!")
    const formData = JSON.parse(localStorage.getItem(formName) || "{}")

    if (target) {
        const fieldName = target.dataset.field_name

        Object.keys(formData).forEach((_, index) => {
            if(!formData[index]) return

            if (fieldName in formData[index]) {
                formData[index][fieldName] = target.value
            } else {
                const [firstKey, secondKey, thirdKey] = fieldName.split(".")

                if (firstKey in formData[index]) {
                    const numTest = parseFloat(secondKey)

                    if ((!Number.isNaN(numTest) && Number.isFinite(numTest))) {
                        // Verifica se existe um array, se não existir será criado um.
                        if(!formData[index][firstKey][secondKey])formData[index][firstKey][secondKey] = []
                        // Verifica se existe uma 3° key, caso existir, significa que esse array é um array de objeto, 
                        // Então será criado mais uma chave.
                        if (thirdKey) formData[index][firstKey][secondKey][thirdKey] = target.value
                        else formData[index][firstKey][secondKey] = target.value
                    } else formData[index][firstKey][secondKey] = target.value

                }
            }
        })

    }

    localStorage.setItem(formName, JSON.stringify(formData))
}