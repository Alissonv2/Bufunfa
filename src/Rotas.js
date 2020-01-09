import Home from './Home';
import Cadastro from './Cadastro';
import Interna from './Interna';
import Preload from './Preload';
import Receita from './Receita';
import Despesas from './Despesas';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Navegador = createStackNavigator({
    Preload:{
        screen: Preload,
    },
    Interna: {
        screen: Interna,
    },
    
    Home: {
        screen: Home,
    },

    Cadastro: {
        screen: Cadastro,
    },

    Receita: {
        screen: Receita,
    },

    Despesas: {
        screen: Despesas,
    }
});

export default createAppContainer(Navegador);