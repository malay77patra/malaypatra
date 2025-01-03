export const H1 = ({ children, ...props }) => (
    <h1 className="typo-h1" {...props}>{children}</h1>
);

export const H2 = ({ children, ...props }) => (
    <h2 className="typo-h2" {...props}>{children}</h2>
);

export const H3 = ({ children, ...props }) => (
    <h3 className="typo-h3" {...props}>{children}</h3>
);

export const P = ({ children, ...props }) => (
    <p className="typo-p" {...props}>{children}</p>
);

export const H = ({ variant = 1, children }) => {

    return (
        <span className={`typo-h${variant}`}>
            {children}
        </span>
    )
}
