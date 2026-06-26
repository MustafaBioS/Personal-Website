import { useState ,useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './App.css'
import githubLogo from '../assets/github.webp'
import spotifyLogo from '../assets/spotify.png'
import instaLogo from '../assets/insta-white.webp';
import Navbar from "./components/Navbar.jsx";

function App() {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [dots, setDots] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    const lenis = useLenis((lenis) => {
        console.log(lenis)
    });

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
        <ReactLenis root />
        <div className="inset-0 bg-[#070707] bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_2px,transparent_2px)] bg-size-[50px_50px]">
            <Navbar></Navbar>
            <section id="home" className="section1 flex h-screen items-center justify-center flex-col">
                <div className="relative">
                    {!imageLoaded && (
                        <div className="w-50 h-50 rounded-3xl bg-gray-500 animate-pulse" />
                    )}

                    <img
                        src="https://github.com/MustafaBioS.png?size=200"
                        alt="Profile Picture"
                        className={`rounded-3xl`}
                        style={animate(0)}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <h1 className="text-white text-[clamp(1.5rem,2vw,2rem)] text-center pt-6" style={animate(1)}>Hey, I'm <span className="text-[#9AD0DA]">Mustafa</span>!</h1>
                {/*<p className="text-white text-2xl md:w-[60%] w-[75%] xl:w-[35%] pt-6 text-center" style={animate(2)}>I'm a 16 year old from Giza, Egypt, who has taken an interest in programming from such a young age!</p>*/}
                <div className="text-white flex flex-col items-center w-full pt-2 text-[clamp(1rem,2vw,1.35rem)]" style={animate(2)}>
                    {loading ? (
                        loadingText
                    ) : data?.isPlaying ? (
                        <div className="flex items-center flex-col">
                            {/*<h1 className="text-xl mb-2">Currently Playing On <span className="text-green-600">Spotify</span>:</h1>*/}
                            {/*<img src={data?.album_image} alt={data?.song} className="h-36 md:h-48 rounded-3xl pb-2 md:pb-4" />*/}
                            <div className="flex items-center flex-row w-full">
                                <a href={data?.song_uri} target="_blank" className="transition-all duration-300 ease-in-out hover:opacity-70 truncate max-w-full">{data?.song}</a>
                                <h1 className="mx-2"> - </h1>
                                <p className="truncate max-w-full">
                                    {data.artists.map((artist, index) => (
                                        <span key={artist.id}>
                                            <a
                                                href={artist.uri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-all duration-300 ease-in-out hover:opacity-70"
                                            >
                                                {artist.name}
                                            </a>
                                            {index < data.artists.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ) : (
                        "No Songs Are Currently Playing"
                    )}
                </div>
                <div className="flex flex-row items-center gap-6 pt-4" style={animate(3)}>
                    <a href="https://github.com/MustafaBioS" target="_blank">
                        <img src={githubLogo} alt="Github Logo" className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:opacity-75 w-9" />
                    </a>
                    <a href="https://open.spotify.com/user/31iornw33kqeejopjajqutfhv6ea?si=933c9d678194426c" target="_blank">
                        <img src={spotifyLogo} alt="Spotify Logo" className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:opacity-75 w-9" />
                    </a>
                    <a href="https://www.instagram.com/mustafa_elarabyy/" target="_blank">
                        <img src={instaLogo} alt="Instagram Logo" className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:opacity-75 w-9" />
                    </a>
                </div>
            </section>

            <section id="projects" className="section2 flex h-screen items-center pb-24 justify-center flex-col">
                <div className="relative">
                    {!imageLoaded && (
                        <div className="w-50 h-50 rounded-3xl bg-gray-500 animate-pulse" />
                    )}

                    <img
                        src="https://github.com/MustafaBioS.png?size=200"
                        alt="Profile Picture"
                        className={`rounded-3xl`}
                        style={animate(0)}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <h1 className="text-white text-lg text-center sm:text-3xl pt-6" style={animate(1)}>Hey, I'm <span className="text-[#9AD0DA]">Mustafa</span>!</h1>
                <p className="text-white text-2xl md:w-[60%] w-[75%] xl:w-[35%] pt-6 text-center" style={animate(2)}>I'm a 16 year old from Giza, Egypt, who has taken an interest in programming from such a young age!</p>
                <div className="flex flex-row items-center gap-6 pt-6" style={animate(3)}>
                    <a href="https://github.com/MustafaBioS" target="_blank">
                        <img src={githubLogo} alt="Github Logo" className="w-9" />
                    </a>
                    <a href="https://open.spotify.com/user/31iornw33kqeejopjajqutfhv6ea?si=933c9d678194426c" target="_blank">
                        <img src={spotifyLogo} alt="Spotify Logo" className="w-9" />
                    </a>
                </div>
            </section>

            {/*<div className="sticky w-full items-center flex bottom-10 justify-center">*/}
            {/*    <div className="text-white flex flex-col items-center w-full">*/}
            {/*        {loading ? (*/}
            {/*            loadingText*/}
            {/*        ) : data?.isPlaying ? (*/}
            {/*            <div className="flex items-center flex-col">*/}
            {/*                /!*<h1 className="text-xl mb-2">Currently Playing On <span className="text-green-600">Spotify</span>:</h1>*!/*/}
            {/*                <img src={data?.album_image} alt={data?.song} className="h-36 md:h-48 rounded-3xl pb-2 md:pb-4" />*/}
            {/*                <div className="flex items-center flex-row text-[clamp(1rem,2vw,1.5rem)] m-2 w-full">*/}
            {/*                    <a href={data?.song_uri} target="_blank" className="truncate max-w-full">{data?.song}</a>*/}
            {/*                    <h1 className="m-2"> - </h1>*/}
            {/*                    <a href={data?.artist_uri} target="_blank" className="truncate max-w-full">{data?.artist}</a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ) : (*/}
            {/*            "Nothing Is Playing"*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    </>
  )
}

export default App
