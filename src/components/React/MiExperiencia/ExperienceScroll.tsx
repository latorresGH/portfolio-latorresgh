// src/components/ExperienceScroll.tsx
import { useEffect } from 'react';
import { initExperienciaScroll } from '../../../utils/animations/experienceAnimation';

export default function ExperienceScroll() {
  useEffect(() => {
    console.log('Ejecutando animación desde componente');
    initExperienciaScroll();
  }, []);

  return null; // No renderiza nada visible
}
