import './CourseCard.css';

function CourseCard({
        img,
        tags,
        title,
        startPrice,
        types
    }) {
        return (
            <div className="CourseCard">
                <div className="cover">
                    <img src={img} />
                </div>
                <div className="info">
                    <ul className="tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                            </span>
                        ))}
                    </ul>
                    <h4 className="name">{title}</h4>
                    <p className="price">{startPrice.toLocaleString()}원부터</p>
                    <ul className="types">
                        {types.map((type, index) => (
                            <span key={index} className="type">
                                {type}
                            </span>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

export default CourseCard;