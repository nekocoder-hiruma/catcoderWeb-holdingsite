import { Routes, Route } from 'react-router-dom';
import Home from '../features/home/routes/Home';
import History from '../features/history/routes/History';
import Projects from '../features/projects/routes/Projects';
import Contact from '../features/contact/routes/Contact';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
};
