import React, {createContext, useEffect, useState} from 'react'

const context = {
    authentication: {
        isAuthenticated: true,
        accessToken: localStorage.getItem("accessToken")
    },
    toggleAuthentication: () => {}
};

export const StoreContext = createContext(context);

export const StoreProvider = ({children}) => {
    const [authentication, setAuthentication] = useState(context);

    useEffect(() => {
        setAuthentication(prevState => {
            return {
                ...prevState,
                toggleAuthentication: (authorized, accessToken) => {
                    prevState.authentication.isAuthenticated = authorized;
                    prevState.authentication.accessToken = accessToken;
                    if (authorized) {
                        localStorage.setItem("accessToken", accessToken);
                    } else {
                        localStorage.removeItem("accessToken");
                    }
                }
            }
        });
    }, []);

    return (
        <StoreContext.Provider value={authentication}>
            {children}
        </StoreContext.Provider>
    )
};