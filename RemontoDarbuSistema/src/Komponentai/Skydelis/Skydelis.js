import React from 'react';
import './Skydelis.css';
import {
    Switch,
    Route,
    NavLink,
    useRouteMatch,
    useHistory
} from "react-router-dom";
import Mokejimas from '../Mokejimas/Mokejimas';
import useAuth from '../../Hooks/useAuth';
import PagrindinioLangoAtsiliepimai from '../PagrindinioLangoAtsiliepimai/PagrindinioLangoAtsiliepimai';
import PridetiProdukta from '../PridetiProdukta/PridetiProdukta';
import ProduktuTvarkymas from '../ProduktuTvarkymas/ProduktuTvarkymas';
import PaverstiAdmin from '../PaverstiAdmin/PaverstiAdmin';
import SkydelioDuomenys from '../SkydelioDuomenys/SkydelioDuomenys';
import Administratorius from '../VartotojuTipuRoutes/Administratorius';
import Meistras from '../VartotojuTipuRoutes/Meistras';
import VartotojoRezervacijos from '../VartotojoRezervacijos/VartotojoRezervacijos';
import MeistroRezervacijos from '../MeistroRezervacijos/MeistroRezervacijos';


const Skydelis = () => {
    const { path, url } = useRouteMatch();
    const { logout, isMeistras, isAdmin } = useAuth();
    const history = useHistory();
// atvaizduoja skydelio funkcionaluma pagal kokio tipo paskyra
    return (
        <div className="Skydelis">
            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">
                <div className="col-12 col-sm-12 col-md-12 col-lg-3">
                    <div className=" h-100 bg-transparent border-0">
                       
                        <h1 className="fs-3 fst-italic text-center">
                            <span className="text-info cursive-text">Skydelis</span>
                        </h1>

                        <div className="mt-5">
                            <ul className="nav flex-column">
                                {
                                    isAdmin ?
                                        <>

                                            <li className="nav-item p-1 side-item-active mb-3">
                                                <NavLink to={url}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-chart-pie text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Apžvalga</span>
                                                </NavLink>
                                            </li>

                                            <li className="nav-item p-1 side-item-active mb-3">
                                                <NavLink to={`${url}/PaverstiAdmin`}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-users-cog text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Paversti adminu</span>
                                                </NavLink>
                                            </li>

                                            <li className="nav-item p-1 side-item-active mb-3">
                                                <NavLink to={`${url}/ProduktuTvarkymas`}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-server text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Tvarkyti produktus</span>
                                                </NavLink>
                                            </li>
                                        </>
                                        :
                                        isMeistras ?
                                        <>

                                            <li className="nav-item p-1 mb-3 side-item-active">
                                                <NavLink to={url}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-shopping-cart text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Mano paslaugos rezervacijos</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item p-1 side-item-active mb-3">
                                                <NavLink to={`${url}/PridetiProdukta`}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-plus text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Pridėti paslaugą</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item p-1 mb-3 side-item-active">
                                                 <NavLink to={`${url}/Mokejimas`}
                                                     className="nav-link d-flex justify-content-start align-items-center side-bar-icon">
 
                                                     <i className="fas fa-money-bill-wave text-white fs-5 side-icon me-4"></i>
                                                     <span className="fw-bold">Mokejimas</span>
                                                 </NavLink>
                                             </li>
 
                                             <li className="nav-item p-1 mb-3 side-item-active">
                                                 <NavLink to={`${url}/PagrindinioLangoAtsiliepimai`}
                                                     className="nav-link d-flex justify-content-start align-items-center side-bar-icon">
 
                                                     <i className="fas fa-user-edit text-white fs-5 side-icon me-4"></i>
                                                     <span className="fw-bold">Palikti atsiliepima</span>
                                                 </NavLink>
                                             </li>                                       
                                            
                                            
                                             </>
                                        :

                                        <>

                                            <li className="nav-item p-1 mb-3 side-item-active">
                                                <NavLink to={url}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-shopping-cart text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Mano rezervacijos</span>
                                                </NavLink>
                                            </li>

                                            <li className="nav-item p-1 mb-3 side-item-active">
                                                <NavLink to={`${url}/Mokejimas`}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-money-bill-wave text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Mokejimas</span>
                                                </NavLink>
                                            </li>

                                            <li className="nav-item p-1 mb-3 side-item-active">
                                                <NavLink to={`${url}/PagrindinioLangoAtsiliepimai`}
                                                    className="nav-link d-flex justify-content-start align-items-center side-bar-icon">

                                                    <i className="fas fa-user-edit text-white fs-5 side-icon me-4"></i>
                                                    <span className="fw-bold">Palikti atsiliepima</span>
                                                </NavLink>
                                            </li>
                                        </>
                                }
                            </ul>
                        </div>

                        <button
                            onClick={
                                () => logout(history)}

                            className="btn btn-info logout-btn mt-4 text-white d-flex justify-content-center align-items-center">
                            <i className="fas fa-sign-out-alt fs-5 me-2"></i>
                            
                            <span>Atsijungti</span>
                        </button>
                    </div>
                </div>

                <div className="col-12 col-lg-9 col-sm-12 col-md-12 ">
                    <div className=" h-100 bg-transparent border-0">
                        <Switch>
                            {isAdmin
                                ?
                                <>
                                    <Administratorius exact path={path} >
                                        <SkydelioDuomenys />
                                    </Administratorius>

                                    <Administratorius exact path={`${path}/PaverstiAdmin`} >
                                        <PaverstiAdmin />
                                    </Administratorius>

                                    <Administratorius exact path={`${path}/ProduktuTvarkymas`} >
                                        <ProduktuTvarkymas />
                                    </Administratorius>
                                </>
                                :

                                isMeistras
                                ?
                                <>
                                    <Route exact path={path}>
                                        <MeistroRezervacijos />
                                    </Route>
                                    <Meistras exact path={`${path}/PridetiProdukta`} >
                                        <PridetiProdukta />
                                    </Meistras> 

                                    <Meistras exact path={`${path}/Mokejimas`}>
                                        <Mokejimas />
                                    </Meistras>

                                    <Meistras exact path={`${path}/PagrindinioLangoAtsiliepimai`}>
                                        <PagrindinioLangoAtsiliepimai />
                                    </Meistras>
                                </>

                                :
                                <>
                                    <Route exact path={path}>
                                        <VartotojoRezervacijos />
                                    </Route>
                                    <Route exact path={`${path}/Mokejimas`}>
                                        <Mokejimas />
                                    </Route>

                                    <Route exact path={`${path}/PagrindinioLangoAtsiliepimai`}>
                                        <PagrindinioLangoAtsiliepimai />
                                    </Route>
                                </>
                            }
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skydelis;