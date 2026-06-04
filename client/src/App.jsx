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
      <section className="flex items-center flex-col pt-24 gap-4 h-screen">
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
        <div className="fixed right-12 ">
            <h1 className="text-white">
            {loading ? (
                loadingText
            ) : data?.isPlaying ? (
                <div className="flex items-center">
                    <img src={data?.album_image} alt={data?.song} className="" />
                    <a href={data?.song_uri} target="_blank">{data?.song}</a>
                    <h1 className="m-2"> - </h1>
                    <a href={data?.artist_uri} target="_blank">{data?.artist}</a>
                </div>
            ) : (
                "Nothing Is Playing"
            )}
            </h1>
        </div>
      </section>
    </>
  )
}

export default App
