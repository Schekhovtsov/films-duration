import { Routes, Route } from "react-router-dom";
import HomePage from "./home";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};