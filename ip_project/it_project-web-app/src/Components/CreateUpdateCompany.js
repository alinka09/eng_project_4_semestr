import React from 'react'
import ApiService from '../Api/ApiService';
import {Link} from 'react-router-dom'
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'

const apiService = new ApiService();
const url = 'company'
class CreateUpdateCompany extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            compan:{
                name: '',
                opisanie: '',
                pochta: '',
                telephon: '',
								fio:'',
								login:'',
								password:''
            },
            company:[],
            params: queryString.parse(this.props.location.search)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCreate() {
        let compan = this.state.compan
        let value = {
            "name": compan.name,
            "opisanie": compan.opisanie,
            "telephon": compan.telephon,
            "pochta": compan.pochta,
            "fio": compan.fio,
            "login": compan.login,
            "password": compan.password,
        }
        apiService.createData(value,url)
        this.props.history.push("/Main")
    }

    handleSubmit(event) {
        let params = this.state.params;
        event.preventDefault()
        if(params&&params.id) {
            this.handleUpdate(params.id)
        } else {
            this.handleCreate();
        }
    }
    handleChange(e) {
        this.setState(state=>{
            let compan = Object.assign({},state.compan);
            compan[e.target.name] = e.target.value
            return {
                compan
            }
        })
        console.log(this.state.compan)
    }
    handleUpdate(e) {
        this.props.history.push("/Main")
        apiService.updateData(this.state.compan,url)
    }
    componentDidMount() {
        let params = this.state.params;
        if(params && params.id) {
            apiService.getData(params.id,url).then((companreq)=>{
                this.setState({compan:companreq})
            })
        }
    }

    render(){
        return(
            <form className='createUpdateForm' onSubmit={this.handleSubmit}>
                <h4 className='createUpdateForm__title'>Добавить компанию</h4>
                <label className='createUpdateForm__label' for ='name'> Название:</label>
                <input
                    id='name'
                    className="createUpdateForm__input"
                    name='name'
                    type="text"
                    value={this.state.compan.name}
                    onChange={e=>this.handleChange(e)}
                />
                <label className='createUpdateForm__label' for='opisanie'> Описание:</label>
								<input
                    id='opisanie'
                    className="createUpdateForm__input"
                    name='opisanie'
                    type="text"
                    value={this.state.compan.opisanie}
                    onChange={e=>this.handleChange(e)}
                />
                <label className='createUpdateForm__label' for='pochta'> E-mail:</label>
								<input
                    id='pochta'
                    className="createUpdateForm__input"
                    name='pochta'
                    type="text"
                    value={this.state.compan.pochta}
                    onChange={e=>this.handleChange(e)}
                />

                <label className='createUpdateForm__label' for='telephon'> Номер телефона:</label>
                <input
                    id='telephon'
                    className="createUpdateForm__input"
                    name='telephon'
                    type="text"
                    value={this.state.compan.telephon}
                    onChange={e=>this.handleChange(e)}
                />


							<label className='createUpdateForm__label' for='fio'> Описание:</label>
								<input
                    id='fio'
                    className="createUpdateForm__input"
                    name='fio'
                    type="text"
                    value={this.state.compan.fio}
                    onChange={e=>this.handleChange(e)}
                />
                <label className='createUpdateForm__label' for='login'> E-mail:</label>
								<input
                    id='login'
                    className="createUpdateForm__input"
                    name='login'
                    type="text"
                    value={this.state.compan.login}
                    onChange={e=>this.handleChange(e)}
                />

                <label className='createUpdateForm__label' for='password'> Номер телефона:</label>
                <input
                    id='password'
                    className="createUpdateForm__input"
                    name='password'
                    type="text"
                    value={this.state.compan.password}
                    onChange={e=>this.handleChange(e)}
                />
                <div className='createUpdateForm__buttons'>
                    <input className="createUpdateForm__button button__save" type="submit" value="Сохранить" />
                    <Link className='createUpdateForm__button button__back' to='/Main'>Назад</Link>
                </div>
            </form>
        )
    }
}


const CreateUpdateCompanyWithRouter = withRouter(CreateUpdateCompany)
export default CreateUpdateCompanyWithRouter