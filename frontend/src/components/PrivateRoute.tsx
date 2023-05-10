import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
    render: () => JSX.Element;
}

type Props = PrivateRouteProps & RouteProps;


const PrivateRoute: React.FC<Props> = ({ render, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            element={
                user ? (
                    render()
                ) : (
                    <Navigate to="/login" replace />
                )
            }
        />
    );
};

export default PrivateRoute;
