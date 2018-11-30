import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Upgrade from "views/Upgrade/Upgrade";
import Home from "../layouts/Home/Home";
import CadastroEdital from "views/Cadastro/CadastroEdital";
import CadastroAcelera from "views/Cadastro/CadastroAcelera";
import CadastroPreInc from "views/Cadastro/CadastroPreInc";
import CadastroInc from "views/Cadastro/CadastroInc";
import VisualizarEditais from "views/Visualizar/VisualizarEditais"
import VisualizarAcelerandos from "views/Visualizar/VisualizarAcelerandos"
import VisualizarPreInc from "views/Visualizar/VisualizarPreInc"
import VisualizarInc from "views/Visualizar/VisualizarInc"
import VisualizarDesativados from "views/Visualizar/VisualizarDesativados"
import VisualizarMetas from "views/Visualizar/VisualizarMetas"
import CadastroMeta from "views/Cadastro/CadastroMeta";
import CadastroChaveOKR from "views/Cadastro/CadastroChaveOKR";
import Historico from "../layouts/Metas/Historico";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: "pe-7s-home",
    component: Home
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    icon: "pe-7s-plus",
    routes: [
      {
        path:"/gru",
        name: "GRU",
        icon: "pe-7s-credit",
        component: CadastroAcelera
      },
      {
        path:"/edital",
        name: "Edital",
        icon: "pe-7s-portfolio",
        component: CadastroEdital
      },
      {
        path:"/acelera",
        name: "Acelera",
        icon: "pe-7s-portfolio",
        component: CadastroAcelera
      },
      {
        path:"/preinc",
        name: "Pré-Incubada",
        icon: "pe-7s-portfolio",
        component: CadastroPreInc
      },
      {
        path:"/inc",
        name: "Incubada",
        icon: "pe-7s-portfolio",
        component: CadastroInc
      }
    ]
  },
  {
    path: "/visualizar",
    name: "Visualizar",
    icon: "pe-7s-glasses",
    routes: [
      {
        path:"/gru",
        name: "GRUS",
        icon: "pe-7s-news-paper",
        component: CadastroEdital
      },
      {
        path:"/edital",
        name: "Editais",
        icon: "pe-7s-portfolio",
        component: VisualizarEditais
      },
      {
        path:"/acelera",
        name: "Acelerandos",
        icon: "pe-7s-portfolio",
        component: VisualizarAcelerandos
      },
      {
        path:"/preinc",
        name: "Pré-Incubadas",
        icon: "pe-7s-portfolio",
        component: VisualizarPreInc
      },
      {
        path:"/inc",
        name: "Incubadas",
        icon: "pe-7s-portfolio",
        component: VisualizarInc
      },
      {
        path:"/desativados",
        name: "Desativados",
        icon: "pe-7s-portfolio",
        component: VisualizarDesativados
      }
    ]
  },
  {
    path: "/metas",
    name: "Metas",
    icon: "pe-7s-display1",
    routes: [
      {
        path:"/visualizar",
        name: "Visualizar",
        icon: "pe-7s-glasses",
        component: VisualizarMetas
      },
      {
        path:"/cadastrar",
        name: "Objetivo",
        icon: "pe-7s-plus",
        component: CadastroMeta
      },
      {
        path:"/cadastroChave",
        name: "Resultado Chave",
        icon: "pe-7s-plus",
        component: CadastroChaveOKR
      },
      {
        path:"/historico",
        name: "Histórico",
        icon: "pe-7s-plus",
        component: Historico
      }
    ]
  },
  // {
  //   path: "/edital",
  //   name: "Edital",
  //   icon: "pe-7s-note2",
  //   component: CadastroEdital
  // },
  // {
  //   path: "/acelera",
  //   name: "Acelera",
  //   icon: "pe-7s-note2",
  //   component: CadastroAcelera
  // },
  // {
  //   path: "/preincubada",
  //   name: "Pré-Incubada",
  //   icon: "pe-7s-note2",
  //   component: CadastroPreInc
  // },
  // {
  //   path: "/incubada",
  //   name: "Incubada",
  //   icon: "pe-7s-note2",
  //   component: CadastroInc
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "pe-7s-user",
  //   component: UserProfile
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography
  // },
  //{ path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade
  // },
  //{ redirect: true, path: "/", to: "/home", name: "Home" }
];

export default routes;