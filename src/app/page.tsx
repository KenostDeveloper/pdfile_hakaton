'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Container, Header, Content, Footer, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {

  const [statistics, setStatistics] = useState<any>([]);

  useEffect(() => {
    axios.get(`/api/statistics`).then((res) => {
          if(res.data.success){
              setStatistics(res.data.data);
          }
      });
  }, [])

  const data = {
    labels: ['Пунктов выдачи заказов', 'Складов', 'Транзитных городов'],
    datasets: [
        {
            data: [statistics?.city?.PickPoint, statistics?.city?.Warehouse, statistics?.city?.Transit],
            backgroundColor: [
                "#3b82f6", "#eab308", "#22c55e"
            ],
            hoverBackgroundColor: [
                "#3b82f6", "#eab308", "#22c55e"
            ]
        }
    ]
  };
  const options = {
      cutout: '60%',
      plugins: false
  };

  return (
    <main className={styles.main}>
      <div className="show-fake-browser navbar-page">
        <Container>
          <Header>
            <Navbar appearance="inverse">
              <Navbar.Brand>
                <a style={{ color: '#fff' }}><img className="logo" src="/logo.svg"/></a>
              </Navbar.Brand>
              {/* <Nav>
                <Nav.Item>Home</Nav.Item>
                <Nav.Item>News</Nav.Item>
                <Nav.Item>Products</Nav.Item>
                <Nav.Menu title="About">
                  <Nav.Item>Company</Nav.Item>
                  <Nav.Item>Team</Nav.Item>
                  <Nav.Item>Contact</Nav.Item>
                </Nav.Menu>
              </Nav> */}
              <Nav pullRight>
                <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
              </Nav>
            </Navbar>
          </Header>
          <Content className="content-main">
            <h1>Активные приборы:</h1>
            <div className="electr">
              <img src="/lamp.png" alt="" />
              <div className="info">
                <b>Лампа</b>
                <p>Среднее потреблоение: </p>
              </div>
              <Chart style={{width: "100px"}} type="doughnut" data={data} options={options} />
            </div>
            <div className="electr">
              <img src="/toaster.webp" alt="" />
              <div className="info">
                <b>Тостер</b>
                <p>Среднее потреблоение: </p>
              </div>
            </div>
            <div className="electr">
              <img src="/wentel.webp" alt="" />
              <div className="info">
                <b>Вентилятор</b>
                <p>Среднее потреблоение: </p>
              </div>
            </div>
          </Content>
          <Footer></Footer>
        </Container>
      </div>
    </main>
  );
}
