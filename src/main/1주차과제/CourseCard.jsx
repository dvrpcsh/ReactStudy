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
            <div className="CourseCard">
                <div className="cover">

                </div>
                <div className="info">
                    <ul className="tags">
                    </ul>
                    <h4 className="name"></h4>
                    <p className="price"></p>
                    <ul className="types">
                    </ul>
                </div>
            </div>
        )
    }

export default CourseCard;