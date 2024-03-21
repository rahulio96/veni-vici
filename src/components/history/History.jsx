import './History.css'

function History({ historyList }) {

    return (
        <div className="history-container">
          <h2>History</h2>
          <p>Who have we seen so far?</p>
          <div>
            {historyList.map((obj, index) => (
                <div key={index} className='history-item-container'>
                    <img className='history-img' src={obj.url} />
                    <p className='description'>A {obj.breed} cat format {obj.country}</p>
                </div>
            ))}
          </div>
        </div>
      )
}

export default History