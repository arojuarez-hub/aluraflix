import { useEffect, useState } from "react";
import Titulo from "../Titulo";
import "./VideoDestacado.css";

const VideoDestacado = (color) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchRandomVideo = async () => {
      try {
        const response = await fetch(
          "https://66927881346eeafcf46d06de.mockapi.io/api/v1/videos"
        );
        const data = await response.json();
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setVideo(data[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchRandomVideo();
  }, []);

  const convertToEmbedLink = (url) => {
    const urlObj = new URL(url);
    if (urlObj.hostname === "www.youtube.com" && urlObj.pathname === "/embed") {
      return url;
    } else if (
      urlObj.hostname === "www.youtube.com" &&
      urlObj.pathname === "/watch"
    ) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
      }
    }
    return url;
  };

  return (
    <section className="destacado">
      {video && (
        <>
          <div className="description-video">
            <p></p>
            <div className="container-titulo">
              <Titulo color="#2271D1">
                <h1>{video.categoria}</h1>
              </Titulo>
            </div>
            <h2 className="titulo-video">{video.titulo}</h2>
            <p>{video.descripcion}</p>
          </div>
          <div className="video-destacado">
            <iframe
              width="100%"
              height="100%"
              src={convertToEmbedLink(video.link)}
              title={video.titulo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}
    </section>
  );
};

export default VideoDestacado;
