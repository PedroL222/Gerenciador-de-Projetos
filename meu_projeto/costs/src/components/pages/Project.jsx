import {parse, v4 as uuidv4} from 'uuid';

import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project(){

    const {id} = useParams();
    
    const [project,setProject] = useState([]);

    const [showProjectForm, setShowProjectForm]= useState(false);

    const [showServiceForm, setShowServiceForm]= useState(false);

    const [message,setMessage]= useState("");
    
    const [type,setType]= useState();

    const [services,setServices] = useState([])

    useEffect(()=>{
        setTimeout(()=>{

            fetch(`http://localhost:5001/projects/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(resp => resp.json())
        .then((data) =>{
            setProject(data);
            setServices(data.services);
        })
        .catch(err => console.log(err))

        }, 300)
    }, [id]);

    function editPost(project){
        setMessage("");
        if(project.budget < project.cost){
            setMessage("O Orçamento não pode ser menor que o custo do projeto");
            setType("error");
            return false;
        }

        fetch(`http://localhost:5001/projects/${project.id}`,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(project),
        })
        .then(resp =>resp.json())
        .then((data)=>{
            setProject(data);
            setShowProjectForm(false);
            setMessage("Projeto Atulaizado!");
            setType("success");
            return false;
        })
        .catch(err => console.log(err))
    }

    function creatService(){

        
        setMessage("");
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastService.cost);

        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType("error");
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5001/projects/${project.id}`,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(project),
        })
        .then(resp =>resp.json())
        .then((data)=>{
            showServiceForm(false);
        })
        .catch(err => console.log(err));

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    function removeService(id, cost){
        const serviceUpdated = project.services.filter((service)=> service.id != id);
        const projectUpdated = project;

        projectUpdated.services = serviceUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        
        fetch(`http://localhost:5001/projects/${projectUpdated.id}`,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(projectUpdated),
        })
        .then(resp =>resp.json())
        .then((data)=>{
            setProject(projectUpdated);
            setServices(serviceUpdated);
            setMessage("Serviço removido com sucesso");
            setType("success");
        })
        .catch(err => console.log(err));
    }

    return(
        <>
            {project.name ? (
            <div  className={styles.project_details}>
                <Container customClass="collumn">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria: </span>{project.categories.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText={"Concluir Edição"} projectData={project} />
                            </div>
                        )}
                    </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}</button>
                            <div  className={styles.project_info}>
                                {showServiceForm &&(
                                    <ServiceForm 
                                    handleSubmit={creatService}
                                    btnText={"Adicionar Serviço"}
                                    projectData={project} />
                                )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                            services.map((service)=>(
                                <ServiceCard
                                id={service.id} 
                                name={service.name} 
                                cost={service.cost} 
                                description={service.description} 
                                key={service.id}
                                handleRemove={removeService} 
                                
                                />
                        ))}
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                </Container>
            </div> ) : (
                <Loading />
            )}
        </>
    )
}

export default Project