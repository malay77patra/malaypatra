import IconCloud from '../components/IconCloud'
import { ThemeContext } from "../context/ThemeContext"
import { useEffect, useState, useContext } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particleNasaTheme } from '../utils/utils'
import Sparkles from '../components/Sparkles'
import Malay from '../assets/malay.jpg'
import { HL } from '../components/Typography';



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

                        }}>
                            <div className='malay-img-cont'>
                                <img src={Malay} alt="Malay" className='malay-img' />
                            </div>
                            <div>Hi, I'm Malay<span className="wave">👋</span></div>
                        </div>
                        <div>
                            <h1><HL variant={1}>FULLSTACK</HL></h1>
                            <h1><HL variant={2}>DEVELOPER</HL> &</h1>
                            <h1><HL variant={3}>API</HL> EXPERT</h1>
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