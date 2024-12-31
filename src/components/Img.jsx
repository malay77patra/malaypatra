export default function Img({ src, alt, ...props }) {
    return (
        <div className="img1-wrapper" {...props}>
            <div>
                <img src={src} alt={alt} />
            </div>
        </div>
    )
}