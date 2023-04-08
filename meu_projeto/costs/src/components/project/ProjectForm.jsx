import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';
import { useEffect, useState } from 'react';

function ProjectForm({btnText}){

    const[categories,setCategories]= useState([]);

    useEffect(()=>{
        fetch("https://cursojavascript.pedro-lucaslu55.repl.co/", {
        method: "GET",
        
    }).then((resp) => resp.json())
    .then((data)=> {
        setCategories(data)
    })
    .catch(err => console.log(err));
    }, []);


    return(
        <form className={styles.form}>
            <div>
                <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto"/>
            </div>
            <div>
            <Input type="number" text="Orçamento do Projeto" name="budget" placeholder="Insira o orçamento total do projeto"/>
            </div>
            <div>
                <Select name="category_id" text="Selecione a categoria" options={categories}/>
            </div>
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm