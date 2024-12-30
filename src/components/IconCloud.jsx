import { ThemeContext } from "../context/ThemeContext"
import { useContext } from "react"
import { Cloud, renderSimpleIcon } from 'react-icon-cloud';
import { siPython, siReact, siJavascript, siMongodb, siExpress, siVite, siGit, siGithub, siVercel, siMui, siHtml5, siCss, siTailwindcss, siSelenium, siCanva, siHeroku, siGooglegemini, siOpenai, siHuggingface, siNodedotjs, siSupabase, siBootstrap, siFigma } from 'simple-icons';

const cloudIcons = [siPython, siReact, siJavascript, siMongodb, siExpress, siVite, siGit, siGithub, siVercel, siMui, siHtml5, siCss, siTailwindcss, siSelenium, siCanva, siHeroku, siGooglegemini, siOpenai, siHuggingface, siNodedotjs, siSupabase, siBootstrap, siFigma];


const IconCloud = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const icons = [...cloudIcons].map((icon) => {
        return renderSimpleIcon({
            minContrastRatio: 21,
            fallbackHex: (theme == 'dark') ? '#fff' : '#000',
            icon,
            size: 42,
            aProps: {
                onClick: (e) => e.preventDefault()
            }
        })
    });

    return (<>
        <Cloud options={{
            activeAudio: false,
            outlineMethod: 'none',
            pinchZoom: false,
            wheelZoom: false,
            initial: [0.1, 0.1],
            minSpeed: 0.01,
            clickToFront: 500,
            reverse: true,
        }}
        containerProps={{
            style: {
                display: 'inline-block'
            }
        }}
        >
            {icons}
        </Cloud>
    </>);
};

export default IconCloud;
