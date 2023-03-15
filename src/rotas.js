import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Principal from './pages/PrincipalPagina';
import Entrada from './pages/Entrada';
import Cadastro from './pages/Cadastro';
import { getItem } from './utils/storage';

function RotasProtegidas({ redirecionar }) {
    const autenticado = getItem('token');
    return (autenticado ? <Outlet /> : <Navigate to={redirecionar} />)
}

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Entrada />} />

            <Route element={<RotasProtegidas redirecionar={'/'} />}>
                <Route path="/principal" element={<Principal />} />
            </Route>

            <Route path="/cadastro" element={<Cadastro />} />
            <Route path='*' element={<h1>404 - Not found teste hugo</h1>} />
        </Routes>
    )
}