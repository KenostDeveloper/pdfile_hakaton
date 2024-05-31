const BASE_URL = "http://localhost:3000";

const endpoints: Record<string, string> = {
    devices: `${BASE_URL}/devices`,
    consumptions: `${BASE_URL}/consumptions`,
    active: `${BASE_URL}/devices/active`,
    highVolts: `${BASE_URL}/high-volts`,
    devicesActivities: `${BASE_URL}/devices/activity`
};

export default endpoints;