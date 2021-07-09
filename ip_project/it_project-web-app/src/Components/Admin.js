import React from 'react'
import ApiService from '../Api/ApiService';
import {Link} from 'react-router-dom'

const apiService = new ApiService();
const link = 'company'
export default class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            compan:{
                name: '',
                opisanie: '',
                pochta: "",
                telephon: '',
            },
            company:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        let compan = this.state.compan
        let value = {
            "name": compan.name,
            "opisanie": compan.opisanie,
            "telephon": compan.telephon,
            "pochta": compan.pochta,
        }
        apiService.createData(value,link)
    }
    handleChange(e) {
        // this.setState({...this.state.name,name: e.target.value})
        this.setState(state=>{
            let compan = Object.assign({},state.compan);
            compan[e.target.name] = e.target.value
            return {
                compan
            }
        })
        console.log(this.state.compan)
    }

    getData() {
        apiService.getDatas(link).then(response=> {
            this.setState({company: response.data})
        })
    }

    handleDelete(id) {
        apiService.deleteData(id,link)
        this.getData();
    }
    componentDidMount() {
        this.getData()
    }
    handleSort(e) {
        this.state.company.sort()
    }
    render(){
        return(
            <div className='admin'>
                <div className='table__description'>
                    <h4 className='table__title'>Список компаний</h4>
                    <Link className='admin__button' to='/CreateUpdateCompany'><b>+</b> добавить компанию</Link>
                </div>
                <table className='table'>
                    <thead className='table__head'>
                        <tr className='table__row'>
                            <th onClick={()=>this.handleSort('id')} scope='col'>id</th>
                            <th scope='col'>Название</th>
                            <th scope='col'>Описание</th>
                            <th scope='col'>Телефон</th>
                            <th scope='col'>Почта</th>
                            <th scope='col'>ФИО представителя</th>
                            <th scope='col'>Логин</th>
                            <th scope='col'>Пароль</th>
                            <th scope='col'>Действие</th>
                        </tr>
                    </thead>
                    <tbody className='table__body'>
                        {this.state.company.map((compan)=>
                           <tr className='table__row'>
                               <td>{compan.id}</td>
                               <td>{compan.name}</td>
                               <td>{compan.opisanie}</td>
                               <td>{compan.telephon}</td>
                               <td>{compan.pochta}</td>
                               <td>{compan.fio}</td>
                               <td>{compan.login}</td>
                               <td>{compan.password}</td>
                               <td><button className='table__delete' onClick={e=>{
                                this.handleDelete(compan.id)
                            }}>Удалить</button>
                               <Link className='table__update' to={'/CreateUpdateCompany/?id='+compan.id}>Изменить</Link></td>
                           </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}