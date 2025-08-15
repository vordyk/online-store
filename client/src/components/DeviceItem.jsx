import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/pngwing.com.png'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: "150px", cursor: "pointer"}} border={"light"}>
                <Image src={process.env.REACT_APP_API_URL + "/" + device.img} width={150} height={150} alt="device image" />
                <div className="d-flex text-black-50 justify-content-between">
                    <div>Samsung</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} width={18} height={18} alt="star" />
                    </div>
                </div>
                <div>
                    {device.name}
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;