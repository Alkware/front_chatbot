interface TitleSelect {
    title: string;
    hide: boolean
}

export function TitleSelect({ title, hide }: TitleSelect) {
    return (
        <h2
            data-hide={hide}
            className="opacity-80 dark:opacity-60 w-full text-sm data-[hide=true]:hidden"
        >
            {title}
        </h2>
    )
};