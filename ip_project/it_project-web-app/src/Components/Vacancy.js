import React from 'react';
import ApiService from '../Api/ApiService'

const link = 'rabota';
const apiService = new ApiService();

export default class Vacancy extends React.Component {

    constructor(props) {
        super(props)

        this.state={
            rabota:[]
        }
    }

    componentDidMount() {
        apiService.getDatas(link).then(response=>{
            this.setState({rabota:response.data})
            console.log(response.data)
        })
    }

    render(){
    return(
					<div className='admin'>
						<div className='table__description'>
								<h4 className='table__title'>Доступные вакансии</h4>
						</div>
						<table className='table'>
								<thead className='table__head'>
										<tr className='table__row'>
												<th scope='col'>Название</th>
												<th scope='col'>Описание</th>
												<th scope='col'>Требование</th>
												<th scope='col'>Условия</th>
												<th scope='col'>Обязанности</th>
										</tr>
								</thead>
								<tbody className='table__body'>
								{this.state.rabota.map((item)=>
											<tr className='table__row'>
													<td>{item.name}</td>
													<td>{item.opisanie}</td>
													<td>{item.trebovanie}</td>
													<td>{item.uslovia}</td>
													<td>{item.obyazannosti}</td>
											</tr>
										)}
								</tbody>
						</table>
					</div>
    )}
}