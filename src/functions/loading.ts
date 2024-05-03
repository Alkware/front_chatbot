export function loadingController(loading: boolean) {
    const components = document.querySelectorAll("[data-loading]");

    if (loading) {
        //Create Loading 
        const container = document.createElement("div");
        container.dataset.container = "loading"
        container.classList.add("w-full", "h-full", "bg-dark/20", "backdrop-blur-xl", "absolute", "top-0", "flex", "justify-center", "items-center")


        const loadingElement = document.createElement("div");
        loadingElement.classList.add("w-[20px]", "h-[20px]", "rounded-full", "bg-primary-200", "border-2", "neon-effect", "animate-loading");

        container.appendChild(loadingElement);

        components.forEach(component => {
            const isLoading = component.querySelector("div[data-container='loading']");
            if (!isLoading) {
                const containRelative = component.classList.contains("relative")
                const containOverflow = component.classList.contains("overflow")
                if (!containRelative) component.classList.add("relative")
                if (!containOverflow) component.classList.add("overflow-hidden")
                component.appendChild(container)
            }
        })
    } else {
        components.forEach(component =>{
            const loading = component.querySelector("div[data-container='loading']");
            if(loading) {
                loading.classList.add("transition-opacity", "duration-500");
                const removeFirstTimeOut = setTimeout(()=>{
                    loading.classList.add("opacity-0")
                    const removeTimeout = setTimeout(() => {
                        component.removeChild(loading);
                        clearTimeout(removeTimeout)
                    }, 2000);

                    clearTimeout(removeFirstTimeOut)
                }, 500);

            }
            
        })
    }
}