import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";

export const DispositivoContext = createContext();

export const DispositivoProvider = ({ children }) => {
    const [dispositivos, setDispositivos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const JSONdevices = await AsyncStorage.getItem("userDispositivos");
            const devices = JSONdevices ? JSON.parse(JSONdevices) : null;
            console.log("async disps. ", devices);

            if (devices) {
                const promises = devices.map(async (dispositivo) => {
                    try {
                        const response = await axios.post(`http://${dispositivo.ip}:8081/zeroconf/info`, {
                            "deviceid": "", 
                            "data": {}
                        }, {
                            timeout: 3000,
                        });
                        return {
                            name: dispositivo.name,
                            desc: dispositivo.desc,
                            id: dispositivo.id,
                            data: response.data.data,
                            ip: dispositivo.ip,
                            potencia: dispositivo.potencia,
                            logs: dispositivo.logs
                        };
                    } catch (apiError) {
                        console.error(`Erro ao buscar dados do dispositivo ${dispositivo.id}`, apiError);
                        return {
                            name: dispositivo.name,
                            desc: dispositivo.desc,
                            id: dispositivo.id,
                            data: null,
                            ip: dispositivo.ip,
                            potencia: dispositivo.potencia,
                            logs: dispositivo.logs
                        };
                    }
                });

                const resultados = await Promise.all(promises);
                setDispositivos(resultados);
            }
        } catch (error) {
            Alert.alert("Erro ao resgatar dispositivos armazenados: ", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    useEffect(() => {
        console.log("dispositivos atualizados: ", dispositivos)
    }, [dispositivos])

    return (
        <DispositivoContext.Provider value={{ dispositivos, setDispositivos, fetchData, isLoading }}>
            {children}
        </DispositivoContext.Provider>
    );
};
