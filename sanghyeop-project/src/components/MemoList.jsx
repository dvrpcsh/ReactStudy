function MemoList({memos}) {
    return <div>
            {memos.map((memo, index) => (
                <div key={index}>{memos.title}</div>
            ))}
           </div>
}

export default MemoList;