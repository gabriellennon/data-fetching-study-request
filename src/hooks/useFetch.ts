//Criando um Hook
//Create a Hook

import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";


const api = axios.create({
    baseURL: 'https://api.github.com'
})

// defining that type is general
// Is different of the any, because here he is unknown (desconhecido)
export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null)
    // Loading
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        api.get(url)
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => {
            setIsFetching(false);
        })
    }, [])

    return { data, error, isFetching }
}