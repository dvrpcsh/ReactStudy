/*useEffect*/
useEffect(() => {
    console.log("컴포넌트가 마운트 될 때 한번만 실행/ value 변경 시");

    const eventHandler = () => {
        console.log("click body");
    }``

    document.body.addEventListener(
        'click',
        eventHandler
    );

    return () => {
        console.log("useEffect호출 전에 실행")

        document.body.removeEventListener(
            'click',
            eventHandler
        );
    }
}, [value]);

/*useCallback
  메모이제이션: 리렌더링 시 기존의 함수를 재활용 함
*/

const resetValue = () => {
    setValue(0);
}

const resetValue = useCallback(() => {
    setValue(0);
}, []);
