type StandardCardProps = {
  id: string
  description: string
}
export const StandardCard: React.FC<StandardCardProps> = ({ id, description }) => (
  <div>
    <span className="text-xs font-extrabold">{id}: </span>
    <span className="text-xs">{description}</span>
  </div>
)
