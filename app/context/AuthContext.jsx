'use client';
import { auth } from "../firebase.config";
import { useState, useEffect } from "react";
import React, { createContext, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
} from "firebase/auth";

// restablecimiento de contraseña
const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};

export const AuthContext = createContext();

// hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// proveedor del contexto de autenticacion
export function AuthProvider({ children }) {

    const [user, setUser] = useState("");

    // registro manual
    const register = async (email, password) => {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // if (response.user) {
        //     sendEmailVerification(auth.currentUser)
        //         .then(() => {
        //             console.log("Se ha enviado un correo electrónico de verificación");
        //         })
        //         .catch((error) => {
        //             console.error(
        //                 "Error al enviar el correo electrónico de verificación:",
        //                 error
        //             );
        //         });
        // }
        // //console.log(response);
    };

    // inicio de sesion manual
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        //console.log(response);
    };

    // inicio de sesion con google
    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider);
    };

    // cerrar sesion
    const logout = async () => {
        await signOut(auth);
    };

    useEffect(() => {
        const registered = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => registered();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                register,
                login,
                loginWithGoogle,
                resetPassword,
                logout,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}