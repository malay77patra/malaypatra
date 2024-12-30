import { ThemeContext } from "../context/ThemeContext"
import { useContext } from "react"
import ThemeToggle from "../components/ThemeToggle"
import DockButton from "./DockButton";
import SvgIcon from "./SvgIcon";
import Github from "../assets/icons/github.svg?react";
import Linkedin from "../assets/icons/linkedin.svg?react";
import Mail from "../assets/icons/mail.svg?react";

const Dock = ({ ...props }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="dock" {...props} >
            <DockButton data-tooltip-content="Github" >
                <SvgIcon icon={Github} to="https://github.com/malay77patra" />
            </DockButton>
            <DockButton data-tooltip-content="Linkedin">
                <SvgIcon icon={Linkedin} to="https://www.linkedin.com/in/malaypatra/" />
            </DockButton>
            <DockButton data-tooltip-content="Mail">
                <SvgIcon icon={Mail} to="mailto:malay77patra@gmail.com" />
            </DockButton>
            <DockButton data-tooltip-content="Theme">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </DockButton>
        </div>
    );
};

export default Dock;
