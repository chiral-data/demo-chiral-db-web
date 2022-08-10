import React, { ReactElement } from "react"
import { useLocation } from "react-router"
import DemoDesc from "../Demos/Desc"
import DemoSim from "../Demos/Sim"
import Home from "../Components/Home"
import SideBar from "../Components/SideBar"
import { Container, Row, Col } from "react-bootstrap"
import { Layout } from "./style"
import DemoSub from "../Demos/Sub"


const AppLayout: React.FC = () => {
    const { pathname } = useLocation()

    function DemoShown(pn: string): ReactElement {
        switch (pn) {
            case '/':
                return <Home />
            case '/demo-desc':
                return <DemoDesc />
            case '/demo-sim':
                return <DemoSim />
            case '/demo-sub':
                return <DemoSub /> 
            default:
                return <p>No Demo</p>
        }
    }

    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col sm={2}><SideBar /></Col>
                    <Col sm={5} className="demo">
                        {DemoShown(pathname)}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
} 

export default AppLayout;