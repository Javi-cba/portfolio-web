import SubTittle from '../SubTittle';
import Project from './Project';
import './projects.css';

export default function ListProjects() {
  return (
    <div className="projects-container">
      <SubTittle text="Proyectos" />

      <section className="list-projects">
        <Project
          name="Ecommerce"
          description="Desarrollé una página web con el objetivo de mostrar mis habilidades en la creación de componentes reutilizables, diseño web y funcionalidades utilizando ReactJS. La aplicación cuenta con un catálogo de varias categorías, con un carrito de compras para confirmar el pedido y guardarlo en base de datos."
          tecnology={[
            'JavaScript',
            'ReactJS',
            'Flexbox',
            'NodeJS',
            'MongoDB',
            'MVC',
            'Microservices',
          ]}
          urlProject="https://frontend-lake-rho.vercel.app/"
          urlRepo="https://github.com/Javi-cba/EComerce-MERN.git"
          urlImg="https://mi-proyect1.s3.us-east-2.amazonaws.com/EComerce.jpeg"
        />
        <Project
          name="Taskify"
          description="He desarrollado una aplicación web que incluye un sistema completo de gestión de tareas (CRUD), el cual permite a los usuarios crear, visualizar, modificar y eliminar sus propias tareas de manera eficiente. La autenticación de usuarios está gestionada a través de Auth0, lo que asegura un inicio de sesión seguro."
          tecnology={[
            'JavaScript',
            'ReactJS',
            'Auth0',
            'Flexbox',
            'NodeJS',
            'MongoDB',
            'MVC',
          ]}
          urlProject="https://web-taskfy-abm.vercel.app"
          urlRepo="https://github.com/Javi-cba/abm-task-frontend.git"
          urlImg="https://mi-proyect1.s3.us-east-2.amazonaws.com/taskify.jpeg"
        />
        <Project
          name="Convert Docx to PDF"
          description="He creado una aplicación web que permite convertir archivos DOCX a PDF de forma rápida y sencilla. Los usuarios pueden cargar sus documentos DOCX, y la app los convierte en PDFs manteniendo el formato original, incluyendo imágenes y estilos."
          tecnology={[
            'HTML',
            'CSS',
            'JavaScript',
            'ReactJS',
            'Bootstrap',
            'Axios',
          ]}
          urlProject="https://convert-docs-word-pdf.vercel.app/home"
          urlRepo="https://github.com/Javi-cba/convert-docs-word_pdf.git"
          urlImg="https://mi-proyect1.s3.us-east-2.amazonaws.com/convertPDF.jpeg"
        />
      </section>
    </div>
  );
}
