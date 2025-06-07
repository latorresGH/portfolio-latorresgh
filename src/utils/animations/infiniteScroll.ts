import { gsap } from 'gsap';

export class SkillsCarousel {
  private animation: any = null;
  private isDragging = false;
  private startX = 0;
  private dragProgress = 0;
  private container: HTMLElement | null = null;

  constructor(containerId: string) {
    this.initialize(containerId);
  }

  private initialize(containerId: string): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.container = document.querySelector(containerId) as HTMLElement;
      
      if (!this.container) return;
      
      this.createAnimation();
      this.setupEventListeners();
    });
  }

  private createAnimation(): void {
    if (!this.container) return;

    this.animation = gsap.to(this.container, {
      x: '-50%',
      duration: 50,
      ease: 'none',
      repeat: -1
    });
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    // Hover events - ralentizar suavemente
    this.container.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    
    // Click/drag events
    this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // Touch events para móviles
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    document.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // Prevenir selección de texto
    this.container.addEventListener('selectstart', this.preventTextSelection);
  }

  private handleMouseEnter(): void {
    if (this.isDragging || !this.animation) return;
    gsap.to(this.animation, {
      timeScale: 0, // Pausa completa
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  private handleMouseLeave(): void {
    if (this.isDragging || !this.animation) return;
    gsap.to(this.animation, {
      timeScale: 1, // Velocidad normal
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  private handleMouseDown(e: MouseEvent): void {
    if (!this.animation || !this.container) return;
    this.isDragging = true;
    this.startX = e.clientX;
    this.dragProgress = this.animation.progress();
    this.animation.pause();
    this.container.style.cursor = 'grabbing';
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging || !this.animation || !this.container) return;
    const deltaX = e.clientX - this.startX;
    const containerWidth = this.container.scrollWidth / 2;
    const progress = this.dragProgress - (deltaX / containerWidth);
    const normalizedProgress = ((progress % 1) + 1) % 1;
    this.animation.progress(normalizedProgress);
  }

  private handleMouseUp(): void {
    if (!this.isDragging || !this.animation || !this.container) return;
    this.isDragging = false;
    this.animation.play();
    this.container.style.cursor = 'grab';
  }

  private handleTouchStart(e: TouchEvent): void {
    const touch = e.touches[0];
    if (!this.animation) return;
    this.isDragging = true;
    this.startX = touch.clientX;
    this.dragProgress = this.animation.progress();
    this.animation.pause();
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.isDragging || !this.animation || !this.container) return;
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.startX;
    const containerWidth = this.container.scrollWidth / 2;
    const progress = this.dragProgress - (deltaX / containerWidth);
    const normalizedProgress = ((progress % 1) + 1) % 1;
    this.animation.progress(normalizedProgress);
  }

  private handleTouchEnd(): void {
    if (!this.isDragging || !this.animation) return;
    this.isDragging = false;
    this.animation.play();
  }

  private preventTextSelection(e: Event): void {
    e.preventDefault();
  }

  // Métodos públicos para control externo
  public pause(): void {
    if (this.animation) {
      this.animation.pause();
    }
  }

  public play(): void {
    if (this.animation) {
      this.animation.play();
    }
  }

  public destroy(): void {
    if (this.animation) {
      this.animation.kill();
    }
  }
}