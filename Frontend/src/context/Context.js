import React, { useState, useEffect } from "react";

const Context = React.createContext([{}, () => { }]);

const Provider = props => {
    const initialAuthState = JSON.parse(localStorage.getItem('auth')) || {
        user_id: '',
        name: '',
        email: '',
        role: '',
        token: '',
        image_url: '',
        auth: false,
    };

    const [auth, saveAuth] = useState(initialAuthState);

    useEffect(() => {
        // Guardar el estado de autenticación en localStorage cuando cambie
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <Context.Provider value={[auth, saveAuth]}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provider }