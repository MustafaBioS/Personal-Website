import { useState ,useEffect } from 'react'
import './App.css'
import githubLogo from '../assets/github.webp'
import spotifyLogo from '../assets/spotify.png'

function App() {

    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [dots, setDots] = useState(0);

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true))

        const dotsInterval = setInterval(() => {
            setDots(prev => (prev + 1) % 4);
        }, 500);

        const getSong = () => {
            fetch("http://localhost:5000/api/now-playing")
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    console.log(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
            };
        getSong();

        const songInterval = setInterval(getSong, 5000);

        return() => {
            clearInterval(dotsInterval);
            clearInterval(songInterval);
        };
    }, [])

    const loadingText = "Loading" + ".".repeat(dots);

    function animate(index) {
        return {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 600ms ease-in-out ${index * 140}ms, transform 600ms`
        }
    }

  return (
    <>
        <div className="grid lg:grid-cols-[1fr_300px] py-20">
            <main>
                <section className="flex items-center flex-col">
                    <img
                        src="https://github.com/MustafaBioS.png?size=200"
                        alt="Profile Picture"
                        className="rounded-3xl "
                        style={animate(0)}
                    />
                    <h1 className="text-white text-lg text-center sm:text-3xl" style={animate(1)}>Hey, I'm <span className="text-[#9AD0DA]">Mustafa</span>!</h1>
                    <div className="flex flex-row items-center gap-6" style={animate(2)}>
                        <a href="https://github.com/MustafaBioS" target="_blank">
                            <img src={githubLogo} alt="Github Logo" className="w-9" />
                        </a>
                        <a href="https://open.spotify.com/user/31iornw33kqeejopjajqutfhv6ea?si=933c9d678194426c" target="_blank">
                            <img src={spotifyLogo} alt="Spotify Logo" className="w-9" />
                        </a>
                    </div>
                    <p className="text-white">I'm a 16 year old from Giza, Egypt, who has taken an interest in programming from such a young age!</p>
                </section>
            </main>

            <aside className="border-white border-2 sticky top-8 h-full items-center flex justify-center">
                <div className="text-white w-full min-w-0">
                    {loading ? (
                        loadingText
                    ) : data?.isPlaying ? (
                        <div className="flex items-center flex-col">
                            {/*<h1 className="text-xl mb-2">Currently Playing On <span className="text-green-600">Spotify</span>:</h1>*/}
                            <img src={data?.album_image} alt={data?.song} className="h-48 rounded-3xl" />
                            <div className="flex items-center flex-row text-xl m-2 max-w-full min-w-0">
                                <a href={data?.song_uri} target="_blank" className="truncate max-w-full">{data?.song}</a>
                                <h1 className="m-2"> - </h1>
                                <a href={data?.artist_uri} target="_blank" className="truncate max-w-full">{data?.artist}</a>
                            </div>
                        </div>
                    ) : (
                        "Nothing Is Playing"
                    )}
                </div>
            </aside>
        </div>
    </>
  )
}

export default App
