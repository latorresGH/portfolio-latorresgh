/* 
    English:
    This file contains the skills used in the project. 
    Each skill is an object with a name and an icon.
    The icon is imported from the assets folder.
    The name is used to display the skill in the UI.

    Español:
    Este archivo contiene las habilidades utilizadas en el proyecto.
    Cada habilidad es un objeto con un nombre y un icono.
    El icono se importa desde la carpeta de recursos.
    El nombre se utiliza para mostrar la habilidad en la interfaz de usuario.
*/

import React from '../../assets/skills/react.svg';
import NodeJS from '../../assets/skills/nodejs.svg';
import NextJS from '../../assets/skills/nextjs.svg';
import Express from '../../assets/skills/express.svg';
import Astro from '../../assets/skills/astro.svg';
import TypeScript from '../../assets/skills/typescript.svg';
import JavaScript from '../../assets/skills/javascript.svg';
import HTML from '../../assets/skills/html5.svg';
import CSS from '../../assets/skills/css.svg';
import Tailwind from '../../assets/skills/tailwindcss.svg';
import MongoDB from '../../assets/skills/mongodb.svg';
import PostgreSQL from '../../assets/skills/postgresql.svg';
import MySQL from '../../assets/skills/mysql.svg';
import Figma from '../../assets/skills/figma.svg';
import GitHub from '../../assets/skills/github.svg';
import Vercel from '../../assets/skills/vercel.svg';

export const Skills = [
    { name: 'React', Icon: React },
    { name: 'NodeJS', Icon: NodeJS },
    { name: 'NextJS', Icon: NextJS },
    { name: 'Express', Icon: Express },
    { name: 'Astro', Icon: Astro },
    { name: 'TypeScript', Icon: TypeScript },
    { name: 'JavaScript', Icon: JavaScript },
    { name: 'HTML5', Icon: HTML },
    { name: 'CSS3', Icon: CSS },
    { name: 'Tailwind CSS', Icon: Tailwind },
    { name: 'MongoDB', Icon: MongoDB },
    { name: 'PostgreSQL', Icon: PostgreSQL },
    { name: 'MySQL', Icon: MySQL },
    { name: 'Figma', Icon: Figma },
    { name: 'GitHub', Icon: GitHub },
    { name: 'Vercel', Icon: Vercel }
]