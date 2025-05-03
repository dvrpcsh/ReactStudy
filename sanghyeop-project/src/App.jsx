import CourseCard from './components/CourseCard';

function App() {
    return (
        <div style={{ padding: 30}}>
            <CourseCard
                img="https://dst6jalxvbuf5.cloudfront.net/media/images/Course/cover_image/210909_191531/23.png"
                tags={['발표','패키지','최대할인']}
                title="비즈니스 올인원, 방구석 어학연수 패키지"
                startPrice={349000}
                types={['동영상강의']}
            >
            </CourseCard>
        </div>
    )
}

export default App;