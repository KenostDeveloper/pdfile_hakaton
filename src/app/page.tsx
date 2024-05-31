"use client";

import styles from "./page.module.css";
import { Container, Header, Content, Footer, Navbar, Nav, SelectPicker } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useEffect, useState } from "react";
import { getConsumptions } from "@/api";
import { PeriodEnum, getActiveDevices, getHighVolts } from "@/api/utils";
import { CategoryScale, LinearScale, Chart as ChartJS } from "chart.js/auto";
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import axios, { AxiosResponse } from "axios";
import { headers } from "next/headers";

ChartJS.register(CategoryScale, LinearScale);

type ActiveDeviceType = {
	name: string;
};

export default function Home() {
	const [statistics, setStatistics] = useState<any>([]);
	const [activeDevices, setActiveDevices] = useState<ActiveDeviceType[]>([]);
	const [statisticsPeriod, setStatisticsPeriod] = useState<string>("");

	const statPeriods = [
		"За минуту",
		"За час",
		"За день",
		"За неделю",
		"За месяц",
		"За все время",
	].map((item) => {
		return {
			label: item,
			value: item,
		};
	});

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

	useEffect(() => {
		async function fetchStatistics() {
			let statisticsFetched: any = null;

			switch (statisticsPeriod) {
				case "За минуту":
					statisticsFetched = await getConsumptions(PeriodEnum.ONE_MINUTE);
					break;
				case "За час":
					statisticsFetched = await getConsumptions(PeriodEnum.ONE_HOUR);
					break;
				case "За день":
					statisticsFetched = await getConsumptions(PeriodEnum.ONE_DAY);
					break;
				case "За неделю":
					statisticsFetched = await getConsumptions(PeriodEnum.ONE_WEEK);
					break;
				case "За месяц":
					statisticsFetched = await getConsumptions(PeriodEnum.ONE_MONTH);
					break;
				case "За все время":
					statisticsFetched = await getConsumptions();
					break;
				default:
					statisticsFetched = await getConsumptions();
					break;
			}

			setStatistics(statisticsFetched.data);
		}

		fetchStatistics();
	}, [statisticsPeriod]);

	useEffect(() => {
		async function fetchHighVolts() {
			const highVolts: any = await getHighVolts();

			if(!localStorage.getItem("token")) {
				alert(highVolts.message + ": " + "Авторизуйтесь в системе для отправки заявки");
				return;
			}

			const response: AxiosResponse = await axios.post(
				`https://api-uae-test.ujin.tech/api/v1/tck/bms/tickets/create/?token=${localStorage.getItem(
					"token"
				)}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					title: "Предупреждение о скачке напряжения",
					description: "Обнаружен скачок напряжения",
					priority: "high",
					class: "inspection",
					status: "new",
					"initiator.id": parseInt(localStorage.getItem("token")!.toString().split("-")[1]),
					types: [],
					assignees: [],
					contracting_companies: [],
					objects: [
						{
							type: "building",
							id: 40,
						},
					],
					planned_start_at: null,
					planned_end_at: null,
					hide_planned_at_from_resident: null,
					extra: null,
				}
			);

			if (response.status !== 200) throw new Error(response.statusText);

			alert(highVolts.message);
		}

		fetchHighVolts();
	}, []);

	const checkDeviceIsActive = (name: string) => {
		return activeDevices.find((a) => a.name == name) != undefined ? "Да" : "Нет";
	};

	const formatDate = (date: Date) => {
		const newDate = new Date(date);

		const day = newDate.getDate().toString().padStart(2, "0");
		const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // добавляем 1, так как месяцы идут с 0 до 11
		const year = newDate.getFullYear();
		const hours = newDate.getHours().toString().padStart(2, "0");
		const minutes = newDate.getMinutes().toString().padStart(2, "0");

		return `${day}.${month}.${year} ${hours}:${minutes}`;
	};

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

						<div className={`${styles.stats}`}>
							<h2 className={`${styles.stats__title}`}>Общая статистика энергопотребления:</h2>
							<SelectPicker
								value={statisticsPeriod}
								searchable={false}
								data={statPeriods}
								placeholder="Выберите период"
								onChange={(value, e) => setStatisticsPeriod(value!)}
								defaultValue="За все время"
							/>
							<Line
								data={{
									labels: statistics.map((item: any) => formatDate(item.created_at)),
									datasets: [
										{
											label: "Энергопотребление",
											data: statistics.map((item: any) => item.power),
											backgroundColor: [
												"rgba(255, 99, 132, 0.2)",
												"rgba(54, 162, 235, 0.2)",
												"rgba(255, 206, 86, 0.2)",
											],
										},
									],
								}}
							/>
						</div>
					</Content>
					<Footer></Footer>
				</Container>
			</div>
		</main>
	);
}
