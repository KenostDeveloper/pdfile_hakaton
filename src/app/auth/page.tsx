'use client';

import { useState } from "react";
import styles from "./page.module.css";

type AuthDataType = {
    login: string,
    password: string,
}

export default function Auth() {
    const [authData, setAuthData] = useState<AuthDataType>({} as AuthDataType);

    return (
        <main>
            <p>as'd;alsd</p>
        </main>
    )
}