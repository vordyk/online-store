import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices().then(data => device.setDevices(data.rows));
    }, []);
    const {device} = useContext(Context);
    const [info, setInfo] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const removeInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    }

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", device.selectedBrand.id);
        formData.append("typeId", device.selectedType.id);
        formData.append("info", JSON.stringify(info));

        createDevice(formData).then(data =>
            onHide()
        )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить Девайс
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={"mt-3"}>
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => device.setSelectedType(type)}
                                               key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-3"}>
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите брэнд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item onClick={() => device.setSelectedBrand(brand)}
                                               key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control className={"mt-3"} value={name} onChange={e => setName(e.target.value)}
                                  placeholder={"Введите название"} type=""/>
                    <Form.Control className={"mt-3"} value={price} onChange={e => setPrice(Number(e.target.value))}
                                  placeholder={"Введите стоимость"} type="number"/>
                    <Form.Control className={"mt-3"} onChange={selectFile} placeholder={"Добавте изображение"}
                                  type="file"/>
                    <hr/>
                    <Button
                        className="mb-3"
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >Добавить новое свойство</Button>
                    {
                        info.map(item =>
                            <Row key={item.number} className="mb-3">
                                <Col className="mb-3" md={4}>
                                    <Form.Control
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.number)}
                                        placeholder={"Введите название свойства"}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={item.description}
                                        placeholder={"Введите описание свойства"}
                                        onChange={e => changeInfo('description', e.target.value, item.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button className="mt-3" onClick={() => removeInfo(item.number)}
                                            variant={"outline-danger"}>Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;