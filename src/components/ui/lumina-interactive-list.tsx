"use client";

import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const THREE: any;

export function Component() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- DYNAMIC SCRIPT LOADING ---
    const loadScripts = async () => {
      const loadScript = (src: string, globalName: string) => new Promise<void>((res, rej) => {
        if ((window as any)[globalName]) { res(); return; }
        if (document.querySelector(`script[src="${src}"]`)) {
          const check = setInterval(() => {
            if ((window as any)[globalName]) { clearInterval(check); res(); }
          }, 50);
          setTimeout(() => { clearInterval(check); rej(new Error(`Timeout waiting for ${globalName}`)); }, 10000);
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { setTimeout(() => res(), 100); };
        s.onerror = () => rej(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
      } catch (e) {
        console.error('Failed to load base scripts:', e);
      }
      
      initApplication();
    };

    const initApplication = async () => {
        // --- PRELOADER REMOVED ---
        
        // --- MAIN LOGIC ---
        const SLIDER_CONFIG: any = {
            settings: {
                transitionDuration: 2.5, autoSlideSpeed: 5000, currentEffect: "glass", currentEffectPreset: "Default",
                globalIntensity: 1.0, speedMultiplier: 1.0, distortionStrength: 1.0, colorEnhancement: 1.0,
                glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0,
                frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0,
                rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0,
                plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0,
                timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4
            },
            effectPresets: {
                glass: { Subtle: { glassRefractionStrength: 0.6, glassChromaticAberration: 0.5, glassBubbleClarity: 1.3, glassEdgeGlow: 0.7, glassLiquidFlow: 0.8 }, Default: { glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0 }, Crystal: { glassRefractionStrength: 1.5, glassChromaticAberration: 1.8, glassBubbleClarity: 0.7, glassEdgeGlow: 1.4, glassLiquidFlow: 0.5 }, Liquid: { glassRefractionStrength: 0.8, glassChromaticAberration: 0.4, glassBubbleClarity: 1.2, glassEdgeGlow: 0.8, glassLiquidFlow: 1.8 } },
                frost: { Light: { frostIntensity: 0.8, frostCrystalSize: 1.3, frostIceCoverage: 0.6, frostTemperature: 0.7, frostTexture: 0.8 }, Default: { frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0 }, Heavy: { frostIntensity: 2.2, frostCrystalSize: 0.7, frostIceCoverage: 1.4, frostTemperature: 1.5, frostTexture: 1.3 }, Arctic: { frostIntensity: 2.8, frostCrystalSize: 0.5, frostIceCoverage: 1.8, frostTemperature: 2.0, frostTexture: 1.6 } },
                ripple: { Gentle: { rippleFrequency: 15.0, rippleAmplitude: 0.05, rippleWaveSpeed: 0.7, rippleRippleCount: 0.8, rippleDecay: 1.2 }, Default: { rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0 }, Strong: { rippleFrequency: 35.0, rippleAmplitude: 0.12, rippleWaveSpeed: 1.4, rippleRippleCount: 1.3, rippleDecay: 0.8 }, Tsunami: { rippleFrequency: 45.0, rippleAmplitude: 0.18, rippleWaveSpeed: 1.8, rippleRippleCount: 1.6, rippleDecay: 0.6 } },
                plasma: { Calm: { plasmaIntensity: 0.8, plasmaSpeed: 0.5, plasmaEnergyIntensity: 0.2, plasmaContrastBoost: 0.1, plasmaTurbulence: 0.6 }, Default: { plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0 }, Storm: { plasmaIntensity: 1.8, plasmaSpeed: 1.3, plasmaEnergyIntensity: 0.7, plasmaContrastBoost: 0.5, plasmaTurbulence: 1.5 }, Nuclear: { plasmaIntensity: 2.5, plasmaSpeed: 1.8, plasmaEnergyIntensity: 1.0, plasmaContrastBoost: 0.8, plasmaTurbulence: 2.0 } },
                timeshift: { Subtle: { timeshiftDistortion: 0.5, timeshiftBlur: 0.6, timeshiftFlow: 0.5, timeshiftChromatic: 0.4, timeshiftTurbulence: 0.6 }, Default: { timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4 }, Intense: { timeshiftDistortion: 2.2, timeshiftBlur: 2.0, timeshiftFlow: 2.0, timeshiftChromatic: 2.2, timeshiftTurbulence: 2.0 }, Dreamlike: { timeshiftDistortion: 2.8, timeshiftBlur: 2.5, timeshiftFlow: 2.5, timeshiftChromatic: 2.6, timeshiftTurbulence: 2.5 } }
            }
        };

        // --- GLOBAL STATE ---
        let currentSlideIndex = 0;
        let isTransitioning = false;
        let shaderMaterial: any, renderer: any, scene: any, camera: any;
        let slideTextures: any[] = [];
        let texturesLoaded = false;
        let autoSlideTimer: any = null;
        let progressAnimation: any = null;
        let sliderEnabled = false;

        const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

        const slides = [
            { 
                title: "AI in Finance", 
                description: "Exploring the promises and pitfalls of artificial intelligence reshaping the financial landscape.", 
                media: "/images/headway-F2KRf_QfCqw-unsplash.jpg",
                findings: [
                    "AI is making finance and business processes faster and more accurate across many areas",
                    "It is not eliminating the need for financing jobs—it is fundamentally changing how jobs in the field are completed",
                    "Banks are now implementing AI for tasks such as algorithmic trading and risk assessment",
                    "Most AI applications in Finance are working together with human inputs rather than replacing humans entirely"
                ]
            },
            { 
                title: "The New Business Major", 
                description: "How AI is transforming what it means to study business in college today.", 
                media: "/images/aditya-vyas-mHdATQY9fIU-unsplash.jpg",
                findings: [
                    "AI is going to replace certain tasks not careers—automate routine entry level work, lower costs, expand outputs, and create new higher value roles by augmenting human labor",
                    "AI kills jobs = ignoring basic economics. When productivity rises, demand grows and creates more need for employment. Jobs adapt rather than disappear",
                    "Business education needs to shift from routines to judgment. Programs that train students for mechanical repeatable tasks will fail. Systems emphasizing human judgment will thrive",
                    "Understanding how firms, markets, and incentives connect enables students to use AI strategically, not be replaced by it"
                ]
            },
            { 
                title: "Modeling Revolution", 
                description: "The rise of AI-powered financial modeling and its impact on traditional analysis.", 
                media: "/images/adam-nir-wTO6MWpMrJk-unsplash.jpg",
                findings: [
                    "AI financial modelling is a new type of technology that has caused concern for many students looking into jobs in the space",
                    "Many analysts at banks and accounting firms spend the majority of their early careers working on models and reading financial statements",
                    "Predictive models use historical data and machine learning algorithms to forecast future financial results like revenue or cash flows",
                    "Optimization models leverage AI to find the best solutions for complex financial problems such as portfolio allocation or capital budgeting",
                    "Risk assessment models analyze multiple risk factors and scenarios to evaluate potential financial risks and suggest mitigation strategies"
                ]
            },
            { 
                title: "The Hiring Shift", 
                description: "How analytics recruitment is evolving in an AI-driven world.", 
                media: "/images/jeff.png",
                findings: [
                    "Traditional analyst tasks (spreadsheets, calculations, reports) are now largely automated by AI",
                    "Hiring has shifted toward judgment, with employers seeking analysts who can interpret and act on AI outputs",
                    "The World Economic Forum ranks AI and big data as top in-demand skills by 2027, signaling a major hiring shift",
                    "With 23% of jobs expected to churn, employers favor analysts who can work effectively alongside AI tools"
                ]
            },
            { 
                title: "Jobs in Flux", 
                description: "Are opportunities shrinking or simply transforming in finance?", 
                media: "/images/matt-nelson-z4X3yABcf5g-unsplash.jpg",
                findings: [
                    "AI is rapidly reshaping analytics-focused hiring as automation becomes faster and more capable",
                    "Goldman Sachs estimates up to 300 million jobs globally could be exposed to automation",
                    "Routine, repeatable roles (e.g., bank tellers, payroll and research assistants) face the highest risk",
                    "BLS finds AI mainly impacts jobs with easily automated core tasks, not entire professions"
                ]
            },
            { 
                title: "The Ideal Analyst", 
                description: "What skills and qualities companies are seeking in their next generation of talent.", 
                media: "/images/jamie.png",
                findings: [
                    "Financial judgment over automation—strong understanding of accounting, valuation, and financial statements, with the ability to interpret and challenge AI-generated outputs",
                    "AI-augmented modeling and data skills—can build, adapt, and stress-test financial models while using AI and data tools to speed analysis and explore scenarios",
                    "Systems-level analytical thinking—understands how markets, firms, incentives, and risk interact, rather than working in isolated spreadsheets",
                    "Clear, decision-focused communication—translates complex analysis into concise, visually clear, and actionable recommendations for stakeholders"
                ]
            },
            { 
                title: "Rise of EQ", 
                description: "Why emotional intelligence is becoming the ultimate competitive advantage.", 
                media: "/images/anthony-tyrrell-Bl-LiSJOnlY-unsplash.jpg",
                findings: [
                    "71% of employers now give EQ top priority over IQ",
                    "59% would reject a technically excellent applicant lacking interpersonal skills",
                    "90% of top performers have strong emotional intelligence",
                    "Companies that stress EQ have almost 90% employee retention and 21% more profitability"
                ]
            },
            { 
                title: "Future-Proofing", 
                description: "Actionable steps to prepare yourself for the evolving business landscape.", 
                media: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=1200&fit=crop",
                findings: [
                    "Build T-shaped skills: deep expertise + broad AI literacy",
                    "Practice working alongside AI tools daily",
                    "Develop your unique human edge: creativity, judgment, empathy",
                    "Stay curious—the landscape will keep evolving"
                ]
            }
        ];
        
        // Phase state: false = phase 1 (title only), true = phase 2 (findings visible)
        let isPhaseTwo = false;

        // --- SHADERS ---
        const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
        const fragmentShader = `
            uniform sampler2D uTexture1, uTexture2;
            uniform float uProgress;
            uniform vec2 uResolution, uTexture1Size, uTexture2Size;
            uniform int uEffectType;
            uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
            uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
            uniform float uFrostIntensity, uFrostCrystalSize, uFrostIceCoverage, uFrostTemperature, uFrostTexture;
            uniform float uRippleFrequency, uRippleAmplitude, uRippleWaveSpeed, uRippleRippleCount, uRippleDecay;
            uniform float uPlasmaIntensity, uPlasmaSpeed, uPlasmaEnergyIntensity, uPlasmaContrastBoost, uPlasmaTurbulence;
            uniform float uTimeshiftDistortion, uTimeshiftBlur, uTimeshiftFlow, uTimeshiftChromatic, uTimeshiftTurbulence;
            varying vec2 vUv;

            vec2 getCoverUV(vec2 uv, vec2 textureSize) {
                vec2 s = uResolution / textureSize;
                float scale = max(s.x, s.y);
                vec2 scaledSize = textureSize * scale;
                vec2 offset = (uResolution - scaledSize) * 0.5;
                return (uv * uResolution - offset) / scaledSize;
            }
            float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
            
            vec4 glassEffect(vec2 uv, float progress) {
                float time = progress * 5.0 * uSpeedMultiplier;
                vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
                float maxR = length(uResolution) * 0.85; float br = progress * maxR;
                vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
                float d = length(p - c); float nd = d / max(br, 0.001);
                float param = smoothstep(br + 3.0, br - 3.0, d); // Inside circle
                vec4 img;
                if (param > 0.0) {
                     float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
                     vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
                     vec2 distUV = uv2 - dir * ro;
                     distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
                     float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
                     img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
                     if (uGlassEdgeGlow > 0.0) {
                        float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
                        img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
                     }
                } else { img = texture2D(uTexture2, uv2); }
                vec4 oldImg = texture2D(uTexture1, uv1);
                if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
                return mix(oldImg, img, param);
            }
            // Simplified stubs for other effects (to save space, logic is in glassEffect mainly for demo)
            vec4 frostEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 rippleEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 plasmaEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 timeshiftEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }

            void main() {
                if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
                else if (uEffectType == 1) gl_FragColor = frostEffect(vUv, uProgress);
                else if (uEffectType == 2) gl_FragColor = rippleEffect(vUv, uProgress);
                else if (uEffectType == 3) gl_FragColor = plasmaEffect(vUv, uProgress);
                else gl_FragColor = timeshiftEffect(vUv, uProgress);
            }
        `;

        // --- CORE FUNCTIONS ---
        const getEffectIndex = (n: string) => ({ glass: 0, frost: 1, ripple: 2, plasma: 3, timeshift: 4 } as any)[n] || 0;
        
        const updateShaderUniforms = () => {
             if (!shaderMaterial) return;
             const s = SLIDER_CONFIG.settings, u = shaderMaterial.uniforms;
             for (const key in s) {
                 const uName = 'u' + key.charAt(0).toUpperCase() + key.slice(1);
                 if (u[uName]) u[uName].value = s[key];
             }
             u.uEffectType.value = getEffectIndex(s.currentEffect);
        };

        const splitText = (text: string) => {
            return text.split('').map(char => `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        };
        
        // Toggle findings visibility - SUPER SIMPLE
        const togglePhase = () => {
            const findingsEl = document.getElementById('slideFindings');
            const hintEl = document.getElementById('expandHint');
            const overlay = document.getElementById('expandOverlay');
            const contentEl = document.querySelector('.slide-content');
            
            if (!findingsEl || !hintEl || !overlay) return;
            
            isPhaseTwo = !isPhaseTwo;
            
            if (isPhaseTwo) {
                // Show blur overlay
                overlay.classList.add('visible');
                contentEl?.classList.add('expanded');
                
                // Show findings
                const currentFindings = slides[currentSlideIndex].findings;
                findingsEl.innerHTML = currentFindings.map((f) => 
                    `<li class="finding-item">${f}</li>`
                ).join('');
                findingsEl.style.opacity = '1';
                hintEl.textContent = '← Back';
            } else {
                // Hide blur overlay
                overlay.classList.remove('visible');
                contentEl?.classList.remove('expanded');
                
                // Hide findings
                findingsEl.innerHTML = '';
                findingsEl.style.opacity = '0';
                hintEl.textContent = 'Click to explore ↓';
            }
        };
        
        // Reset phase when changing slides
        const resetPhase = () => {
            isPhaseTwo = false;
            const findingsEl = document.getElementById('slideFindings');
            const hintEl = document.getElementById('expandHint');
            const contentEl = document.querySelector('.slide-content');
            const overlay = document.getElementById('expandOverlay');
            
            if (findingsEl) {
                findingsEl.innerHTML = '';
                gsap.set(findingsEl, { opacity: 0 });
            }
            if (hintEl) hintEl.textContent = 'Click to explore ↓';
            contentEl?.classList.remove('expanded');
            overlay?.classList.remove('visible');
        };

        const updateContent = (idx: number) => {
            resetPhase(); // Reset to phase 1 when changing slides
            const titleEl = document.getElementById('mainTitle');
            const descEl = document.getElementById('mainDesc');
            if (titleEl && descEl) {
                 // Universal animate out (fade up)
                 gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
                 gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });
                 
                 setTimeout(() => {
                     // Set new content
                     titleEl.innerHTML = splitText(slides[idx].title);
                     descEl.textContent = slides[idx].description; 
                     
                     // Reset state (general reset, specific animations might override)
                     gsap.set(titleEl.children, { opacity: 0 });
                     gsap.set(descEl, { y: 20, opacity: 0 });

                     // 8 Different Animations
                     const children = titleEl.children;
                     switch(idx) {
                        case 0: // Stagger Up
                            gsap.set(children, { y: 20 });
                            gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                            break;
                        case 1: // Stagger Down
                            gsap.set(children, { y: -20 });
                            gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                            break;
                        case 2: // Blur Reveal
                            gsap.set(children, { filter: "blur(10px)", scale: 1.5, y: 0 });
                            gsap.to(children, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power2.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
                            break;
                        case 3: // Scale In
                            gsap.set(children, { scale: 0, y: 0 });
                            gsap.to(children, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.5)" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                            break;
                        case 4: // Rotate X (Flip)
                            gsap.set(children, { rotationX: 90, y: 0, transformOrigin: "50% 50%" });
                            gsap.to(children, { rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" });
                            break;
                        case 5: // Side Reveal (Slide Left)
                            gsap.set(children, { x: 30, y: 0 });
                            gsap.to(children, { x: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                            break;
                        case 6: // Wave Effect
                            gsap.set(children, { y: 40, rotationZ: 10 });
                            gsap.to(children, { y: 0, rotationZ: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: "elastic.out(1, 0.5)" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" });
                            break;
                        case 7: // Typewriter Effect
                            gsap.set(children, { opacity: 0, y: 0 });
                            gsap.to(children, { opacity: 1, duration: 0.1, stagger: 0.05, ease: "none" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" });
                            break;
                        default: // Fallback
                            gsap.set(children, { y: 20 });
                            gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                     }

                 }, 500); 
            }
        };

        const navigateToSlide = (targetIndex: number) => {
            if (isTransitioning || targetIndex === currentSlideIndex) return; // BLOCKING LOGIC
            
            const currentTexture = slideTextures[currentSlideIndex];
            const targetTexture = slideTextures[targetIndex];
            if (!currentTexture || !targetTexture) return;

            isTransitioning = true;
            shaderMaterial.uniforms.uTexture1.value = currentTexture;
            shaderMaterial.uniforms.uTexture2.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
            shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;
            
            updateContent(targetIndex);

            currentSlideIndex = targetIndex;
            updateCounter(currentSlideIndex);
            updateNavigationState(currentSlideIndex);
            
            gsap.fromTo(shaderMaterial.uniforms.uProgress, 
                { value: 0 },
                {
                    value: 1,
                    duration: TRANSITION_DURATION(),
                    ease: "power2.inOut",
                    onComplete: () => {
                        shaderMaterial.uniforms.uProgress.value = 0;
                        shaderMaterial.uniforms.uTexture1.value = targetTexture;
                        shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
                        isTransitioning = false;
                    }
                }
            );
        };

        const createSlidesNavigation = () => {
            const nav = document.getElementById("slidesNav"); if (!nav) return;
            nav.innerHTML = "";
            slides.forEach((slide, i) => {
                const item = document.createElement("div");
                item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
                item.dataset.slideIndex = String(i);
                // Show filled progress for first slide
                const fillWidth = i === 0 ? "100%" : "0%";
                item.innerHTML = `<div class="slide-progress-line"><div class="slide-progress-fill" style="width: ${fillWidth}"></div></div><div class="slide-nav-title">${slide.title}</div>`;
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (!isTransitioning && i !== currentSlideIndex) {
                         navigateToSlide(i);
                    }
                });
                nav.appendChild(item);
            });
        };

        const updateNavigationState = (idx: number) => {
            document.querySelectorAll(".slide-nav-item").forEach((el, i) => {
                el.classList.toggle("active", i === idx);
                // Show filled line for active slide
                const fill = el.querySelector(".slide-progress-fill") as HTMLElement;
                if (fill) {
                    fill.style.width = i === idx ? "100%" : "0%";
                }
            });
        };
        const updateSlideProgress = () => {};
        const fadeSlideProgress = () => {};
        const quickResetProgress = () => {};
        const updateCounter = (idx: number) => { 
            const sn = document.getElementById("slideNumber"); if (sn) sn.textContent = String(idx + 1).padStart(2, "0"); 
            const st = document.getElementById("slideTotal"); if (st) st.textContent = String(slides.length).padStart(2, "0"); 
        };

        // Auto-slide disabled - manual navigation only
        const startAutoSlideTimer = () => {};
        const stopAutoSlideTimer = () => { if (progressAnimation) clearInterval(progressAnimation); if (autoSlideTimer) clearTimeout(autoSlideTimer); progressAnimation = null; autoSlideTimer = null; };
        const safeStartTimer = () => {};

        const loadImageTexture = (src: string) => new Promise<any>((resolve, reject) => {
             const l = new THREE.TextureLoader();
             l.load(src, (t: any) => { t.minFilter = t.magFilter = THREE.LinearFilter; t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) }; resolve(t); }, undefined, reject);
        });

        const initRenderer = async () => {
            const canvas = document.querySelector(".webgl-canvas") as HTMLCanvasElement; if (!canvas) return;
            scene = new THREE.Scene(); camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
            renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture1: { value: null }, uTexture2: { value: null }, uProgress: { value: 0 },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uTexture1Size: { value: new THREE.Vector2(1, 1) }, uTexture2Size: { value: new THREE.Vector2(1, 1) },
                    uEffectType: { value: 0 },
                    uGlobalIntensity: { value: 1.0 }, uSpeedMultiplier: { value: 1.0 }, uDistortionStrength: { value: 1.0 }, uColorEnhancement: { value: 1.0 },
                    uGlassRefractionStrength: { value: 1.0 }, uGlassChromaticAberration: { value: 1.0 }, uGlassBubbleClarity: { value: 1.0 }, uGlassEdgeGlow: { value: 1.0 }, uGlassLiquidFlow: { value: 1.0 },
                    // Init others defaults
                    uFrostIntensity: { value: 1.0 }, uFrostCrystalSize: { value: 1.0 }, uFrostIceCoverage: { value: 1.0 }, uFrostTemperature: { value: 1.0 }, uFrostTexture: { value: 1.0 },
                    uRippleFrequency: { value: 25.0 }, uRippleAmplitude: { value: 0.08 }, uRippleWaveSpeed: { value: 1.0 }, uRippleRippleCount: { value: 1.0 }, uRippleDecay: { value: 1.0 },
                    uPlasmaIntensity: { value: 1.2 }, uPlasmaSpeed: { value: 0.8 }, uPlasmaEnergyIntensity: { value: 0.4 }, uPlasmaContrastBoost: { value: 0.3 }, uPlasmaTurbulence: { value: 1.0 },
                    uTimeshiftDistortion: { value: 1.6 }, uTimeshiftBlur: { value: 1.5 }, uTimeshiftFlow: { value: 1.4 }, uTimeshiftChromatic: { value: 1.5 }, uTimeshiftTurbulence: { value: 1.4 }
                },
                vertexShader, fragmentShader
            });
            scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));
            
            for (const s of slides) { try { slideTextures.push(await loadImageTexture(s.media)); } catch { console.warn("Failed texture"); } }
            if (slideTextures.length >= 2) {
                shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
                shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
                texturesLoaded = true; sliderEnabled = true;
                updateShaderUniforms(); // Apply config
                document.querySelector(".slider-wrapper")?.classList.add("loaded"); // Fade in immediately
            }
            
            const render = () => { requestAnimationFrame(render); renderer.render(scene, camera); };
            render();
        };
        
        createSlidesNavigation(); updateCounter(0); 
        
        // Init text content
        const tEl = document.getElementById('mainTitle');
        const dEl = document.getElementById('mainDesc');
        if (tEl && dEl) {
            tEl.innerHTML = splitText(slides[0].title);
            dEl.textContent = slides[0].description;
            // animate initial in
            gsap.fromTo(tEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.5 });
            gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });
        }

        initRenderer();
        
        // Listeners
        window.addEventListener("resize", () => { if (renderer) { renderer.setSize(window.innerWidth, window.innerHeight); shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight); } });
        
        // Click to toggle phase - set up after a delay to ensure DOM is ready
        setTimeout(() => {
            const contentArea = document.querySelector('.slide-content');
            const overlay = document.getElementById('expandOverlay');
            
            if (contentArea) {
                contentArea.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!isTransitioning) {
                        togglePhase();
                    }
                });
            }
            
            // Click overlay to close
            if (overlay) {
                overlay.addEventListener('click', () => {
                    if (isPhaseTwo && !isTransitioning) {
                        togglePhase();
                    }
                });
            }
        }, 100);
    };

    loadScripts();
    return () => {};
  }, []);

  return (
    <>
      <main className="slider-wrapper" ref={containerRef}>
        <canvas className="webgl-canvas"></canvas>
        <div className="expand-overlay" id="expandOverlay"></div>
        
        <header className="site-header">
          <div className="company-logo">
            <span className="company-name">Apex</span>
            <span className="company-suffix">Capital Management</span>
          </div>
          <a href="#" className="investor-login">
            Investors Login
          </a>
        </header>
        
        
        <div className="slide-content">
            <h1 className="slide-title" id="mainTitle"></h1>
            <p className="slide-description" id="mainDesc"></p>
            <ul className="slide-findings" id="slideFindings"></ul>
            <span className="expand-hint" id="expandHint">Click to explore ↓</span>
        </div>
       
        <nav className="slides-navigation" id="slidesNav"></nav>
      </main>
    </>
  );
}
