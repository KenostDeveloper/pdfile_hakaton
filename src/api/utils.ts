import axios, { AxiosResponse } from "axios";
import endpoints from "./config";

const getDevices = async () => {
    try {
        const response: Response = await fetch(endpoints.devices);

        if (response.status !== 200) throw new Error(response.statusText);

        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
};

enum PeriodEnum {
    ONE_MINUTE = "1min",
    ONE_HOUR = "1h",
    ONE_DAY = "1d",
    ONE_WEEK = "1w",
    ONE_MONTH = "1m",
}

const getConsumptions = async (period: PeriodEnum | null = null) => {
    try {
        const fetchUrl = period ? `${endpoints.consumptions}?period=${period}` : endpoints.consumptions;

        const response: Response = await fetch(fetchUrl);

        if (response.status !== 200) throw new Error(response.statusText);

        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

const getActiveDevices = async (): Promise<any> => {
    try {
        const response: Response = await fetch(endpoints.active);

        if (response.status !== 200) throw new Error(response.statusText);

        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

const getHighVolts = async (): Promise<any> => {
    try {
        const response: Response = await fetch(endpoints.highVolts);

        if (response.status !== 200) throw new Error(response.statusText);

        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

const getDevicesActivities = async (): Promise<any> => {
    try {
        const response: Response = await fetch(endpoints.devicesActivities);

        if (response.status!== 200) throw new Error(response.statusText);

        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

export {
    getDevices,
    getConsumptions,
    PeriodEnum,
    getActiveDevices,
    getHighVolts,
    getDevicesActivities,
}