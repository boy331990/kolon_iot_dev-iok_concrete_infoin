import {useCallback, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import defaultAxios from "axios";
import {StoreContext} from "../../context";


export const useAxios = (options, axiosInstance = defaultAxios) => {
    const history = useHistory();
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
    });
    const [trigger, setTrigger] = useState(0);
    const {authentication} = useContext(StoreContext);
    const defaultOptions = {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authentication.accessToken
        },
        validateStatus: function (status) {
            return status >= 200 && status <= 500;
        }
    };

    const refetch = useCallback(() => {
        setState({
            ...state,
            loading: true
        });
        setTrigger(Date.now());
    }, [state]);

    useEffect(() => {
        const option = {
            ...options,
            ...defaultOptions,
            headers: {
                ...options.headers,
                ...defaultOptions.headers
            }
        };
        console.log("axios options >> ", option);

        axiosInstance(option).then(data => {
            if (data.status === 200) {
                console.log(data, data.data.content);
                data.data.content ?
                    setState(state => {
                        return {
                            ...state,
                            loading: false,
                            data: data.data !== "" ? data : null
                        }
                    }) :
                    setState(state => {
                        return {
                            ...state,
                            loading: false,
                            data: {
                                data: {
                                    content: data.data !== "" ? data.data : null,
                                    totalElements: data.data.length
                                }
                            }
                        }
                    })
            } else if (data.status === 204) {
                setState(state => {
                    return {
                        ...state,
                        loading: false,
                        data: {data: {content: []}}
                    }
                });
            } else if (data.status === 401) {
                setState(state => {
                    return {...state, loading: false, error: data.statusText}
                });
                history.replace("/login");
            } else {
                setState(state => {
                    return {...state, loading: false, error: data.statusText}
                });
            }

        }).catch(reason => {
            setState(state => {
                return {...state, loading: false, error: reason}
            });
            console.debug(reason);
            history.replace("/login");
        });

        return () => {
            setState({
                loading: true,
                error: null,
                data: null,
            });
        }
    }, [axiosInstance, trigger, options.url]);

    return {...state, refetch};
};