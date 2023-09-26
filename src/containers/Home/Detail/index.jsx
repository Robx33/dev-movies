import Credits from "../../../components/Credits"
import SpanGenres from "../../../components/SpanGenres"
import { getMovieCredits, getMovieSimilar, getMovieVideos, getMovieById } from "../../../services/getData"
import { getImages } from "../../../utils/getImages"
import { Container, Background, Cover, Info, ContainerMovies } from "./styles"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from '../../../components/Slider'

function Detail() {

    const { id } = useParams()
    const [movie, setMovie] = useState()
    const [movieVideos, setMovieVideos] = useState()
    const [movieCredits, setMovieCredits] = useState()
    const [movieSimilar, setMovieSimilar] = useState()
    
    useEffect(() => {


        async function getAllData() {
            Promise.all([
                getMovieById(id),
                getMovieVideos(id),
                getMovieCredits(id),
                getMovieSimilar(id)
            ]).then(([movie, videos, credits, similar]) => {
                console.log({movie, videos, credits, similar});
                setMovie(movie)
                setMovieVideos(videos)
                setMovieCredits(credits)
                setMovieSimilar(similar)

            }).catch((error) => console.error(error))
        }

        getAllData()
    }, [])

    return (
        <>

            {movie &&
                <>
                    (<Background image={getImages(movie.backdrop_path)} />
                    <Container>
                        <Cover>
                            <img src={getImages(movie.poster_path)} alt="imagem-poster" />
                        </Cover>
                        <Info>
                            <h2>{movie.title}</h2>
                            <SpanGenres genres={movie.genres} />
                            <p>{movie.overview}</p>
                            <div>
                                <Credits credits={movieCredits} />
                            </div>
                        </Info>
                    </Container>
                    <ContainerMovies>
                        {movieVideos && 
                            movieVideos.map((videos) => (
                            <div key={videos.id}>
                                <h4>{videos.name}</h4>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videos.key}`}
                                    title='Youtube Video Player'
                                    height='500px'
                                    width='100%'
                                ></iframe>
                            </div>
                        ))}
                    </ContainerMovies>
                    {movieSimilar && <Slider info={movieSimilar} title={'Filmes Similares'} />}
                </>
            })
        </>
    )
}

export default Detail