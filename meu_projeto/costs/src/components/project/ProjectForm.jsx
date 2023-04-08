import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';
import { useEffect, useState } from 'react';

function ProjectForm({handleSubmit, btnText, projectData}){

    const [project, setProject] = useState(projectData || {})
    const[categories,setCategories]= useState([]);

    useEffect(()=>{
        fetch("http://localhost:5001/categories", {
        method: "GET",
        
    }).then((resp) => resp.json())
    .then((data)=> {
        setCategories(data);
    })
    .catch(err => console.log(err));
    }, []);

    const submit = (e) =>{
        e.preventDefault();
        console.log(project);
        handleSubmit(project);
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value});
        console.log(project);
    }

    function handleCategory(e){
        setProject({...project,categories: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
            
        });
        console.log(project);
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input handleOnChange={handleChange} type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" value={project.name ? project.name : ''}/>
            </div>
            <div>
            <Input handleOnChange={handleChange}  type="number" text="Orçamento do Projeto" name="budget" placeholder="Insira o orçamento total do projeto" value={project.budget ? project.budget : ''}/>
            </div>
            <div>
                <Select handleOnChange={handleCategory} name="category_id" text="Selecione a categoria" options={categories} value={project.categories ? project.categories.id : ''}/>
            </div>
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm