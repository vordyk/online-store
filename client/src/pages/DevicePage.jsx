import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from "../assets/pngwing.com.png"
import {useParams} from 'react-router-dom';
import {fetchOneDevice} from "../http/deviceApi";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, [])

    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + '/' + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 style={{textAlign: "center"}}>{device.name}</h2>
                        <div style={{
                            background: `url(${star}) no-repeat center center`,
                            width: "240px",
                            height: "240px",
                            fontSize: 100,
                            backgroundSize: "cover"
                        }} className={"d-flex align-items-center justify-content-center"}>
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className={"d-flex flex-column align-items-center justify-content-around"} style={{width: 300, height: 300, fontSize: 32, border: "5px solid light"}}>
                        <h3>От: {device.price}$</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-3"}>
                <h1>Характеристики:</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 18}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    )
}

export default DevicePage