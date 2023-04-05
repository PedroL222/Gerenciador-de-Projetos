import styles from './Home.module.css';
import savings from '../../img/savings.svg';
import LInkButton from '../layout/LinkButton';

function Home(){
    return(
        <section className = {styles.home_container}>
            <h1>Bem Vindo ao <span>Costs</span></h1>
            <p>Começe a gerenciar seus projetos agora mesmo</p>
            <LInkButton to="/NewProject" text="Criar Novo Projeto" />
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home