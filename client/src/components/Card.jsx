

export default function Card({
    title,
    description,
    image,
    repo,
    demo,
 }) {
    return (
        <div className="flex h-full min-h-140 flex-col overflow-hidden rounded-2xl bg-black">
            <img src={image} className="w-full object-cover aspect-video" alt={title} />

            <div className="flex flex-1 flex-col p-6 mt-6 text-white">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-2">{description}</p>

                <div className="mt-auto flex justify-between pt-6 mb-4 text-xl">
                    {repo && (
                        <a href={repo} target="_blank" rel="noreferrer" className="hover:opacity-75 duration-300 transition-all ease-in-out">Repository</a>
                    )}
                    {demo && (
                        <a href={demo} target="_blank" rel="noreferrer" className="hover:opacity-75 duration-300 transition-all ease-in-out">Demo</a>
                    )}
                </div>

            </div>
        </div>
    )
}