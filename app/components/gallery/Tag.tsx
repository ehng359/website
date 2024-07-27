
interface TagType {
    description: String,
    color: string,
}

const colors = {
    "technical": "red",
}
export default function Tag({ color, description }: TagType) {
    return (
        <div className="flex flex-row justify-center items-center rounded-3xl gap-x-2 text-base py-1 px-4 bg-white text-dark border-[1px] border-dark">
            <div className={`rounded-full bg-dark w-[0.5em] h-[0.5em]`}>
            </div>
            <div>
                {description}
            </div>
        </div>
    )
}