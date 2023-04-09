import Message from "../layout/Message";
import { useLocation } from 'react-router-dom';
import styles from './Projects.module.css';
import Container from '../layout/Container';
import LInkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";

function Projects(props){

    const [projects, setProjects] = useState([]);
    const [removeLoading,setRemoveLoading] = useState(false);
    const [projectMessage,setProjectMessage] = useState('')

    const location = useLocation();
    let message = '';

    if(location.state){
        message = location.state.message;
    }

    useEffect(()=>
{
        setTimeout(()=>{
            fetch("http://localhost:5001/projects",{
            method: "GET",
            headers: {"Content-Type" : "application/json",},
        }).then(resp => resp.json())
        .then(data=>{
            setProjects(data);
            setRemoveLoading(true);
        }).catch(err => console.log(err))},300)

    }, []);

    function removeProject(id){
        fetch(`http://localhost:5001/projects/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(resp => resp.json())
        .then(data=>{
            setProjects(projects.filter((project)=> project.id !== id));
            setProjectMessage("Projeto Removido com Sucesso!")
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LInkButton to="/NewProject" text="Criar Novo Projeto" />
            </div>
            {projectMessage && <Message type= "success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project)=>(
                        <ProjectCard 
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.categories ? project.categories.name : ''}
                        key={project.id}
                        handleRemove={removeProject} />
                    )
                    )
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )
                     
                }
            </Container>
        </div>
    )
}

export default Projects