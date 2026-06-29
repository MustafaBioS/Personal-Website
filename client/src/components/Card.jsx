

export default function Card({
    title,
    description,
    image,
    repo,
    demo,
 }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-black">
            <img src={image} className="w-full object-cover" alt={title} />

            <div className="p-6 text-white">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-2">{description}</p>
                <div className="p-6 text-white flex flex-col flex-1">
                    <div className="mt-4 flex gap-4">
                        {demo && (
                            <a href={demo} target="_blank" rel="noreferrer" className="hover:opacity-75 duration-300 transition-all ease-in-out">Demo</a>
                        )}
                        {repo && (
                            <a href={repo} target="_blank" rel="noreferrer" className="hover:opacity-75 duration-300 transition-all ease-in-out">Repository</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}