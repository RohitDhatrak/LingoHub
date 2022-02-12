import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(undefined);
                    setIsLoading(false);
                }
            }
        );

        return unsubscribeFromAuthStatuChanged;
    }, []);

    return {
        user,
        isLoading,
        setIsLoading,
    };
}
