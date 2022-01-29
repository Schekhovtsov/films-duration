import { Routes, Route } from "react-router-dom";
import FilmsPage from "./films";
import HomePage from "./home";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/top" element={<FilmsPage mode='top' />} />
        </Routes>
    );
};