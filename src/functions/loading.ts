interface Options {
    blur?: "sm" | "md" | "lg" | "xl"
}


export function loading(container: Element | null | undefined, loading: boolean, options?: Options) {

    if (!container) return null;

    if (loading) {
        //Create Loading 
        const containerLoading = document.createElement("div");
        containerLoading.dataset.container = "loading"
        containerLoading.classList.add("w-full", "h-full", "bg-dark/20", `backdrop-blur-${options?.blur || "md"}`, "absolute", "top-0", "flex", "justify-center", "items-center", "z-50")


        const loadingElement = document.createElement("div");
        loadingElement.classList.add("w-[20px]", "h-[20px]", "rounded-full", "bg-primary-200", "border-2", "neon-effect", "animate-loading");

        containerLoading.appendChild(loadingElement);

        const containRelative = container.classList.contains("relative")
        const containOverflow = container.classList.contains("overflow")
        if (!containRelative) container.classList.add("relative")
        if (!containOverflow) container.classList.add("overflow-hidden");

        container.appendChild(containerLoading);

    } else {
        const loading = container.querySelector("div[data-container='loading']");
        if (loading) {
            loading.classList.add("transition-opacity", "duration-500");
            const removeFirstTimeOut = setTimeout(() => {
                loading.classList.add("opacity-0")
                const removeTimeout = setTimeout(() => {
                    container.removeChild(loading);
                    clearTimeout(removeTimeout)
                }, 2000);

                clearTimeout(removeFirstTimeOut)
            }, 500);

        }
    }
}