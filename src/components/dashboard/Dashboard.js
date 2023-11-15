
import React from "react";
import Layout from "../Layout";
import { useAuth } from "../../helpers/auth/AuthProvider";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <Layout>
            <h1>Dashboard</h1>
            <p>Welcome</p>
        </Layout>
    );
};

export default Dashboard;
