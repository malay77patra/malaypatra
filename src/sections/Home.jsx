import IconCloud from '../components/IconCloud'
import { ThemeContext } from "../context/ThemeContext"
import { useEffect, useState, useContext } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particleNasaTheme } from '../utils/utils'
import Sparkles from '../components/Sparkles'



export default function Home() {
    const { theme, _ } = useContext(ThemeContext);
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <>
            <div className="hero-container">
                <div className='hero-1'>
                    <IconCloud />
                </div>
                <div className='hero-2'>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            fontSize: '1.5rem',
                        }}>
                            <img src="https://media.licdn.com/dms/image/v2/D5635AQEIG1eYWusPZA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1733298619562?e=1736319600&v=beta&t=Dpr62Rr00xLukX_T_dTNlml3Gw-R5BgX5_Aq-skuX_Y" alt="Malay" className='malay-img' />
                            <div>Hi, I'm Malay<span className="wave">👋</span></div>
                        </div>
                    </div>
                </div>

                <div id="space-container" className='space-container'>
                    {init && (
                        <Particles
                            id="tsparticles"
                            loaded={particlesLoaded}
                            options={particleNasaTheme(theme)}
                        />
                    )}
                </div>

            </div>
        </>
    )
}