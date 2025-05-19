import './CourseCard.css';

function CourseCard({
        img,
        tags,
        title,
        startPrice,
        types
    }) {
        return (
            /*1.배열 props는 for문으로 구현하셔야합니다.
              2.가격은 세자릿수 단위로 콤마(,)를 찍습니다.
            */
            <div className="CourseCard" >
                <div className="cover">
                    <img src={img}></img>
                </div>
                <div className="info">
                    <ul className="tags">
                        {tags.map((tag, i)=>
                            <li key={i} className="tag">
                                {tag}
                            </li>
                        )}
                    </ul>
                    <h4 className="name">{title}</h4>
                    <p className="price">{startPrice.toLocaleString()}원부터</p>
                    <ul className="types">
                        {types.map((type, i)=>
                            <li key={i} className="type">
                                {type}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }

export default CourseCard;