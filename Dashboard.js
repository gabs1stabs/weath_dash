function Dashboard({forecast}){
    return (
        <div style={{textAlign:"center"}}>
           {forecast && (
            <div className="d-flex justify-content-center " style={{marginTop: "20px" , marginBottom: "20px"}}>
                <table className="text-center table-info table-hover table-striped  rounded" style={{width:"90%"}} >
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Temperature</th>
                      </tr>
                    </thead>
                {forecast.map((item, index) => (
                    
                    <tbody key={index}>
                      <tr>
                        <td>{item.date}</td>
                        <td>
                            <img
                                src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                alt={forecast.description}
                                style={{ width: "40px", marginRight: "10px" }}/>
                            {item.description}
                        </td>
                        <td>{item.temp}°C</td>
                      </tr>
                    </tbody>
                 
                    
                ))}
                 </table>
            </div>
            )}  
        </div>
    )
    
}
export default Dashboard;