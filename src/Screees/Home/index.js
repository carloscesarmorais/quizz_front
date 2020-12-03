import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Row} from 'react-bootstrap'

export default function Home() {
    const fontes = [
        {
            name: 'Redes Sociais',
            value: 'REDES_SOCIAS'
        }, {
            name: 'TV',
            value: 'TV'
        }, {
            name: 'Rádio',
            value: 'RADIO'
        }, {
            name: 'Jornais',
            value: 'JORNAIS'
        }, {
            name: 'Portal Noticiais',
            value: 'PORTAL_NOTICIAIS'
        }, {
            name: 'Podcast',
            value: 'PODCASTS'
        }
    ]

    const categorias = [
        {
            name: 'Meio Ambiente',
            value: 'meioAmbiente'
        }, {
            name: 'Política',
            value: 'politica'
        }, {
            name: 'Saúde',
            value: 'saude'
        }
    ]

    const [age, setAge] = useState('')
    const [schooling, setSchooling] = useState('')
    const [source, setSource] = useState([])
    const [categories, setCategories]  = useState([])
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [forceEffect, setForceEffect] = useState(false)

    const handleChange = (e) => {
        const listSources = source
        const value = e.target.id

        if (listSources.includes(value)) {
            listSources.splice(listSources.indexOf(value), 1)
        } else {
            listSources.unshift(value)
        }

        setForceEffect(!forceEffect)
        setSource(listSources)
    }

    const handleChangeCategorias = (e) => {
        const listCategories = categories
        const value = e.target.id

        if (listCategories.includes(value)) {
            listCategories.splice(listCategories.indexOf(value), 1)
        } else {
            listCategories.unshift(value)
        }

        setCategories(listCategories)
    }


    const openQuizz = () => {
        localStorage.setItem('ageUser', age)
        localStorage.setItem('schoolingUser', schooling)
        localStorage.setItem('sourceUser', source)
        localStorage.setItem('categories', categories)

        window.location.pathname = 'quizz'
    }

    useEffect(() => {
        setDisabledBtn(age && schooling && source.length > 0)
    }, [age, schooling, forceEffect])

    return (
        <>
            <div style={{
                display: 'flex',
                paddingTop: 40,
                paddingBottom: 40,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <div style={{
                    paddingBottom: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    justifyContent: 'center'
                }}>
                    <h1>
                        FATO OU FAKE
                    </h1>
                    <h6>
                        Seja bem vindo e muito obrigado por nos ajudar! Este é um estudo para um trabalho de conclusão
                        de curso, <br></br>
                        onde, o objetivo é identificar o quão cada indivíduo consegue supor o que é um fato ou
                        fake. <br></br><br></br>
                        Primeiramente iremos colher algumas informações sobre você para o nosso estudo <br></br>
                        e em seguida, você responderá um formulário com 10 questões sobre seu tema desejado, <br></br>
                        onde, deverá supor o que você imagina ser um fato ou fake.
                    </h6>
                </div>
                <Form>
                    <Form.Row>
                        <Form.Group sm={12} md={4} as={Col} controlId="formGridEmail">
                            <Form.Label><b>Informe sua idade</b></Form.Label>
                            <Form.Control
                                required
                                onChange={
                                    e => {
                                        setAge(e.target.value)
                                    }
                                }
                                type="number"
                                min="10"
                                max="120"
                                placeholder="..."
                            />
                        </Form.Group>

                        <Form.Group sm={12} md={8} as={Col} controlId="formGridState">
                            <Form.Label><b>Grau de escolaridade</b></Form.Label>
                            <Form.Control
                                required
                                onChange={
                                    e => setSchooling(e.target.value)
                                }
                                as="select"
                                defaultValue="Choose..."
                            >
                                <option value="">Escolher...</option>
                                <option value="ENSINO_FUNDAMENTAL_INCOMPLETO">Ensino fundamental incompleto</option>
                                <option value="ENSINO_FUNDAMENTAL_COMPLETO">Ensino fundamental completo</option>
                                <option value="ENSINO_MEDIO_INCOMPLETO">Ensino medio incompleto</option>
                                <option value="ENSINO_MEDIO_COMPLETO">Ensino medio completo</option>
                                <option value="SUPERIOR_INCOMPLETO">Ensino superior incompleto</option>
                                <option value="SUPERIOR_COMPLETO">Ensino superior completo</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <span><b>Por favor, selecione em quais dos itens você costuma buscar informações: </b></span>
                    <Card style={{marginBottom: 10, paddingLeft: 12, paddingRight: 12, paddingTop: 12}}>
                        {fontes.map(fonte => (
                            <Form.Group as={Row} key={fonte.value} onChange={handleChange} controlId={fonte.value}>
                                <Col sm={{span: 10}}>
                                    <Form.Check label={fonte.name}/>
                                </Col>
                            </Form.Group>
                        ))}
                    </Card>

                    <span style={{marginBottom: 10, fontWeight: 'bold'}}>Por favor, selecione sobre quais temas você deseja responder:</span>
                    <Card style={{marginBottom: 10, paddingLeft: 12, paddingRight: 12, paddingTop: 12, backgroundColor: 'rgba(241,146,0,0.07)'}}>
                        {categorias.map(categoria => (
                            <Form.Group as={Row} key={categoria.value} onChange={handleChangeCategorias} controlId={categoria.value}>
                                <Col sm={{span: 10}}>
                                    <Form.Check label={categoria.name}/>
                                </Col>
                            </Form.Group>
                        ))}
                    </Card>


                    <Button disabled={!disabledBtn} onClick={() => openQuizz()} variant="primary" size="lg" block>
                        Continuar
                    </Button>
                </Form>


            </div>
        </>
    )
}