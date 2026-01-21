// Helper hook untuk mengakses server settings
export function useServerSettings() {
    const getServerUrl = () => {
        const ip = localStorage.getItem('serverIp') || '192.168.1.1';
        const port = localStorage.getItem('serverPort') || '8080';
        return `http://${ip}:${port}`;
    };

    const getIp = () => localStorage.getItem('serverIp') || '192.168.1.1';
    const getPort = () => localStorage.getItem('serverPort') || '8080';

    return {
        getServerUrl,
        getIp,
        getPort
    };
}
