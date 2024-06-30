import { db } from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    let systemErrorMessage;
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCanlled() {
        if (cancelled) {
            return;
        };
    };

    const createUser = async (data) => {
        checkIfIsCanlled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;

        } catch (error) {

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracters";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
            }
            setLoading(false);
            setError(systemErrorMessage);
        };
    };

    const logout = () => {
        checkIfIsCanlled();
        signOut(auth);
    };

    const login = async (data) => {
        checkIfIsCanlled(); // memory lik
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            if (error.message.includes("invalid-login-credentials")) {
                systemErrorMessage = "Usuario não existe ou a senha esta incorreta";
            } else {
                systemErrorMessage = "Ocorreu um erro tente mais tarde";
            }
        };
        setError(systemErrorMessage);
        setLoading(false);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        logout,
        loading,
        login
    };
};