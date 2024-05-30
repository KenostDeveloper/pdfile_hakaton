"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Container, Header, Content, Footer, Navbar, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { CategoryScale, Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { getConsumptions, getDevices } from "@/api";
import { getActiveDevices } from "@/api/utils";
import PieChart from "@/components/PieChart";
import LineChart from "@/components/LineChart";

type ActiveDeviceType = {
	name: string;
};

export default function Home() {
	const [statistics, setStatistics] = useState<any>([]);
	const [activeDevices, setActiveDevices] = useState<ActiveDeviceType[]>([]);

	useEffect(() => {
		async function fetchStatistics() {
			const statisticsFetched: any = await getConsumptions();

			setStatistics(statisticsFetched.data);
		}

		fetchStatistics();
	}, []);

	useEffect(() => {
		async function fetchActiveDevices() {
			const activeDevicesFetched: any = await getActiveDevices();
			const activeDevicesFromFetch: any = [];

			activeDevicesFetched.data.forEach((device: any) => {
				activeDevicesFromFetch.push({
					name: device.title,
				});
			});

			setActiveDevices(activeDevicesFromFetch);
		}

		setInterval(() => {
			fetchActiveDevices();
		}, 5000);
	}, []);

	const checkDeviceIsActive = (name: string) => {
		console.log(activeDevices);

		return activeDevices.find((a) => a.name == name) != undefined ? "Да" : "Нет";
	};

	// const data = {
	//   labels: ['Пунктов выдачи заказов', 'Складов', 'Транзитных городов'],
	//   datasets: [
	//     {
	//       data: [statistics?.city?.PickPoint, statistics?.city?.Warehouse, statistics?.city?.Transit],
	//       backgroundColor: [
	//         "#3b82f6", "#eab308", "#22c55e"
	//       ],
	//       hoverBackgroundColor: [
	//         "#3b82f6", "#eab308", "#22c55e"
	//       ]
	//     }
	//   ]
	// };
	// const options = {
	//   cutout: '60%',
	//   plugins: false
	// };

	return (
		<main className={styles.main}>
			<div className="show-fake-browser navbar-page">
				<Container>
					<Header>
						<Navbar appearance="inverse">
							<Navbar.Brand>
								<p style={{ color: "#fff" }}>
									<img className="logo" src="/logo.svg" />
								</p>
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
								{/* <p>Среднее потребление: </p> */}
								<p className={`${checkDeviceIsActive("Лампа") === "Да" ? styles.on : styles.off}`}>
									Включено: {checkDeviceIsActive("Лампа")}
								</p>
							</div>
							{/* <Chart style={{ width: "100px" }} type="doughnut" data={data} options={options} /> */}
						</div>
						<div className="electr">
							<img src="/toaster.webp" alt="" />
							<div className="info">
								<b>Тостер</b>
								{/* <p>Среднее потребление: </p> */}
								<p className={`${checkDeviceIsActive("Тостер") === "Да" ? styles.on : styles.off}`}>
									Включено: {checkDeviceIsActive("Тостер")}
								</p>
							</div>
						</div>
						<div className="electr">
							<img src="/wentel.webp" alt="" />
							<div className="info">
								<b>Вентилятор</b>
								{/* <p>Среднее потребление: </p> */}
								<p
									className={`${
										checkDeviceIsActive("Вентилятор") === "Да" ? styles.on : styles.off
									}`}
								>
									Включено: {checkDeviceIsActive("Вентилятор")}
								</p>
							</div>
						</div>

						{/* <LineChart /> */}
					</Content>
					<Footer></Footer>
				</Container>
			</div>
		</main>
	);
}
