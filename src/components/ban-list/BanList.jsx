import './BanList.css'

function BanList( {excludedList, updateExcludedList} ) {

  function removeBan(itemToRemove) {
    const updatedList = excludedList.filter(item => item !== itemToRemove);
    updateExcludedList(updatedList);
  }

  return (
    <div className="ban-list-container">
      <h2>Ban List</h2>
      <p>Select an attribute in your listing to ban it</p>
      <div>
        {excludedList.map((item, index) => (
            <button className='banned' key={index} onClick={() => removeBan(item)}>{item}</button>
          ))}
      </div>
    </div>
  )
}
  
export default BanList
  