import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Quizz.css'
import {Button, Card, Carousel, Modal} from 'react-bootstrap'

export default function Quizz() {
    const [manchetes, setManchetes] = useState([])
    const [acertos, setAcertos] = useState([])
    const [tituloErro] = useState([])
    const [linkErro] = useState([])
    const [erros, setErros] = useState([])
    const [show, setShow] = useState(false)
    const [showError, setShowError] = useState(false)

    const imprimirLinksErros = () => {
        let rows = []
        for (let i = 0; linkErro.length; i++) {
            rows.push(<li><a href={linkErro[i]}>tituloErro[i]</a></li>)
        }
        return (
            <div>
                <h1>Notícias:</h1>
                <ul>
                    {rows}
                </ul>
            </div>
        )
    }


    useEffect(() => {
        if (!localStorage.getItem('schoolingUser')) {
            window.location.pathname = '/home'
        }

        getManchetes()
    }, [])

    const handleClose = () => {
        setShow(false)
        window.location.pathname = '/fim'
    }

    const handleShow = () => setShow(true)

    const getManchetes = async () => {
        const categories = localStorage.getItem('categories')

        axios.request({
            method: 'GET',
            url: 'https://59mj4amdhi.execute-api.us-east-1.amazonaws.com/quizz/manchetes?categorias='+categories,
            headers: {
                "Content-type": "application/json"
            }
        }).then(resp => {
            setManchetes(resp.data)
        })
            .catch(error => {
                console.log('Err: ', error)
                setShowError(true)
            })
    }

    const savePerfil = async () => {
        const age = parseInt(localStorage.getItem('ageUser'))
        const sourceUser = localStorage.getItem('sourceUser').split(',')
        const schoolingUser = localStorage.getItem('schoolingUser')

        await axios.post(
            'https://59mj4amdhi.execute-api.us-east-1.amazonaws.com/quizz/perfil',
            {
                "idade": age,
                "grauEscolaridade": schoolingUser,
                "fonteInformacoes": sourceUser,
                "acertos": acertos,
                "desacertos": erros
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => {
                handleShow()
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Chamada de button
    const handleChange = (fatoOrFake, index, id) => {
        correctOrNot(index, id, fatoOrFake)
    }

    const changeText = (i) => {
        const atualText = document.getElementById('titulo-' + i).textContent

        const changeText = atualText.replace("____", manchetes[i].manchete[0].tipoNoticia)
        document.getElementById('titulo-' + i).innerHTML = changeText
    }

    //Adiciona no array acertos e desacertos e estilos
    const correctOrNot = (i, id, fatoOrFake) => {
        if (manchetes[i].manchete[0].tipoNoticia.indexOf(fatoOrFake) === 0) {
            const acertosContabilizados = acertos
            acertosContabilizados.push(id)

            changeText(i)

            const card = document.getElementById('card-' + i)
            card.setAttribute("style", "border: 3px solid green; font-family: Lucida Console, Courier, monospace;");
            card.style.borderRadius = "3px"

            const btns = document.getElementById("btns-" + i)
            btns.setAttribute("style", "display: none")

            const btn = document.getElementById("continue-btn-" + i)
            btn.setAttribute("style", "display: block");

            setAcertos(acertosContabilizados)
        } else {
            const errosContabilizados = erros
            errosContabilizados.push(id)

            tituloErro.push((manchetes[i].manchete[0].titulo).replace("####", manchetes[i].manchete[0].tipoNoticia))
            linkErro.push((manchetes[i].manchete[0].urlManchete))

            changeText(i)

            const card = document.getElementById('card-' + i)
            card.setAttribute("style", "border: 3px solid red");
            card.style.borderRadius = "3px"

            const btns = document.getElementById("btns-" + i)
            btns.setAttribute("style", "display: none")

            const btn = document.getElementById("continue-btn-" + i)
            btn.setAttribute("style", "display: block");

            setErros(errosContabilizados)
        }
    }

    //Passa para o próximo card
    const nextCard = (index) => {
        if (manchetes.length - 1 > index) {
            const card = document.getElementsByClassName('card-' + index)
            card[0].classList.remove('active');

            const indexAdd = index + 1
            const cardActice = document.getElementsByClassName('card-' + indexAdd)
            cardActice[0].classList.add('active')
        } else {
            savePerfil()
        }
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: 25
                }}
            >
                <h2 style={{marginBottom: 10, textAlign: 'center'}}>
                    Formulário
                </h2>
                <h5 style={{marginBottom: 50, textAlign: 'center'}}>
                    Segundo seu entendimento, selecione fake ou fato para cada notícia.
                </h5>
                <Carousel
                    interval={999999}
                    controls={false}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    indicators={false}
                >
                    {manchetes.map((manchete, i) => {
                        const {titulo, id} = manchete.manchete[0]

                        return (
                            <Carousel.Item className={'card-' + i} id={'card-' + i} key={id}>
                                <Card style={{width: '24rem'}}>
                                    <Card.Body style={{
                                        backgroundColor: 'rgba(255,156,0,0.07)'
                                    }}>

                                        <Card.Title style={{
                                            textAlign: 'center',
                                            fontFamily: 'Open Sans',
                                            fontSize: 30,
                                            fontWeight: 'bold'
                                        }}>
                                            Notícia {i + 1}
                                        </Card.Title>

                                        <Card.Text
                                            id={'titulo-' + i}
                                            style={{
                                                fontFamily: 'Arial',
                                                fontSize: 20,
                                                padding: 10,
                                                textAlign: 'justify',
                                                borderLeft: '1px solid cornflowerblue'
                                            }}>
                                            {titulo.replace("####", "____")}
                                        </Card.Text>
                                        <div id={"btns-" + i}
                                             style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <Button
                                                onClick={() => handleChange('FAKE', i, id)}
                                                style={{width: '45%'}}
                                                variant="danger">
                                                Fake
                                            </Button>
                                            <Button
                                                onClick={() => handleChange('FATO', i, id)}
                                                style={{width: '45%'}}
                                                variant="success">
                                                Fato
                                            </Button>
                                        </div>
                                        <div id={"continue-btn-" + i} style={{display: 'none'}}>
                                            <Button
                                                onClick={() => nextCard(i)}
                                                style={{width: '100%'}}
                                                variant="outline-primary">
                                                Continuar
                                            </Button>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 10}}>
                    <span style={{marginRight: 10}}>Ao clicar, irá trocar a cor da borda: </span>
                    <div style={{display: 'flex', marginRight: 10, alignItems: 'center'}}>
                        <div style={{background: 'green', width: 10, height: 10, marginRight: 5}}></div>
                        Acertou
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{background: 'red', width: 10, height: 10, marginRight: 5}}></div>
                        Errou
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Obrigado por nos ajudar!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Voce acertou {acertos.length} de 10 questões</h4>

                    <h6>Caso queira conferir as notícias que você errou, estão logo abaixo: </h6>

                    <ul>
                        {linkErro.map((value, index) => {
                            return <li style={{
                                fontSize: 12,
                                padding: 4,
                                textAlign: 'justify',
                            }}><a href={value}>{tituloErro[index]}</a></li>;
                        })}
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showError} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ops</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Aconteceu algo que não estavamos esperando, por favor tente novamente mais tarde.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Concluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
