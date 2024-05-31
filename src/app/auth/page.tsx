"use client";
import { Container, Header, Content, Footer, Navbar, Nav, Button, Input } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { useState } from "react";
import styles from "./page.module.css";
import axios, { AxiosResponse } from "axios";

type AuthDataType = {
	login: string;
	password: string;
};

export default function Auth() {
	const [authData, setAuthData] = useState<AuthDataType>({} as AuthDataType);

	const handleSubmit = async (e: any) => {
		try {
            e.preventDefault();

			const response: AxiosResponse = await axios.post(
				`https://api-uae-test.ujin.tech/api/v1/auth/crm/authenticate?login=${authData.login}&password=${authData.password}`
			);

			if (response.status !== 200) throw new Error(response.statusText);
			if (response.data.error !== 0) {
				console.log("Неправильный логин или пароль");
                alert("Неправильный логин или пароль");
				return null;
			}

			console.log(response.data);
			alert("Успешная авторизация");

			localStorage.setItem("token", response.data.data.user.token);
		} catch (e) {
			console.log(e);
		}
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
							<Nav pullRight>
								<Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
							</Nav>
						</Navbar>
					</Header>
					<Content className="content-main">
						<form className={`${styles.form}`} onSubmit={handleSubmit}>
							<Input
								type="text"
								placeholder="Логин"
								value={authData.login}
								onChange={(e) => setAuthData({ ...authData, login: e })}
							/>
							<Input
								type="password"
								placeholder="Пароль"
								value={authData.password}
								onChange={(e) => setAuthData({ ...authData, password: e })}
							/>
							<Button type="submit">Войти</Button>
						</form>
					</Content>
					<Footer></Footer>
				</Container>
			</div>
		</main>
	);
}
