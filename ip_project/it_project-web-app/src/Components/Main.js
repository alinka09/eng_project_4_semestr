import React from 'react'
import Vacancy from './Vacancy'
import Admin from './Admin'

export default class Main extends React.Component {
    render() {
        return(
        <main>
            <div className='mainPage'>
                <h1 className="mainPage__title">Добро пожаловать, {localStorage.getItem('username')}!</h1>
            </div>
            {this.props.is_staff===true||localStorage.getItem('is_staff')==="true"
            ? <Vacancy/>
            : null
            }
            {this.props.is_superuser===true||localStorage.getItem('is_superuser')==="true"
            ? <Admin/>
            : null
            }
        </main>
    )}
}