
interface CardProps {
  image: string;
  title: string;
  href: string;
}
 export const CardLink: React.FC<CardProps>= ({
    image,title,href
 }) => {
    return(
    <div className="cardLink">
    <a href={href}>
        <img className="boton" src={image} alt={title} height="250px" />
    </a>
    </div>
    )
 }

