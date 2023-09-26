import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api"
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Slider from "../../../components/Slider";
import {
    getMovies,
    getTopMovies,
    getTopSeries,
    getPopularSeries,
    getPersonPopular
} from "../../../services/getData"
import { getImages } from "../../../utils/getImages";
import { Background, Info, Poster, Container, ContainerButtons } from "./styles";

function Home() {

    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [personPopular, setPersonPopular] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function getAllData() {
            
            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getPopularSeries(),
                getPersonPopular()
            ]).then(([movie, topMovies, topSeries, popularSeries, personPopular]) => {

                setMovie(movie)
                setTopMovies(topMovies)
                setTopSeries(topSeries)
                setPopularSeries(popularSeries)
                setPersonPopular(personPopular)

            }).catch( (error) => console.error(error))
        }

        getAllData()
    }, [])


    return (
        <>
            {movie && (
                <Background img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red onClick={() => navigate(`detalhe/${movie.id}`)}>
                                    Assista Agora
                                </Button>

                                <Button onClick={() => setShowModal(true)}>
                                    Assista o Trailer
                                </Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img src={getImages(movie.poster_path)} alt="capa-do-filme" />
                        </Poster>
                    </Container>
                </Background>
            )}

            {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
            {topSeries && <Slider info={topSeries} title={'Top Séries'} />}
            {popularSeries && (<Slider info={popularSeries} title={'Séries Populares'} />)}
            {personPopular && <Slider info={personPopular} title={'Top Artistas'} />}

        </>
    )
}

export default Home