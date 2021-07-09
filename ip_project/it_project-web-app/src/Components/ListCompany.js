import React from 'react';
import ApiService from '../Api/ApiService'

const apiService = new ApiService();
const link = 'company';
export default class ListCompany extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            company:[]
        }
    }
    componentDidMount() {
        apiService.getDatas(link).then(response=> {
            this.setState({company: response.data})
        })

    }


    render()  {
        return (
            <main className='apiTest'>
                <h2 className='apiTest__title'>Список компаний</h2>
                <ul className='apiTest__list'>
                {this.state.company.map((compan)=>
                    <li className='apiTest__item' key={compan.id}>
                        id:{compan.id}<br/>
												 Наименование: {compan.name}<br/>
												 Описание: {compan.opisanie}<br/>
												 Телефон: {compan.telephon}<br/>
												 Фио: {compan.fio}<br/>
                    </li>
                )}
                </ul>
            </main>
        )
    }
}