/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import '../Styles/Style.css'

export default class AboutUs extends React.Component {

    logout = event => {
        event.preventDefault();
        this.props.setLogged(false)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('is_staff')
        localStorage.removeItem('is_superuser')
        this.props.history.push("/");
    }

    render() {

        const bootstrap = <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

        return(
        <div className='container'>
            {bootstrap}
            <div className='mt-4'>
									<h1 className='text-center'>Информация о проекте</h1>
						</div>
            <p>
								Здравствуйте!
								Здесь вы можете найти всю информацию о данном сайте. Меня зовут Тишкина Алина Федоровна, я студентка группы 191-322.
								Представляю вашему вниманию мой инженерный проект.
						</p>
						<p>
								В шапке страницы вы видите 4 вкладки: Главная, Список компаний, RestApi, О проекте.
								Названия этих страниц говорят сами за себя. На главной стрнице происходит вывод данных из таблицы Работа и Компании.
						</p>
						<p>
								Если пользователь зашел под админом, то он имеет право добавить новую компанию, а также удалить или изменить какоу-то конкретную запись.
								На странице "Список компаний" происходит вывод агрегирующей информации. Удачного Вам пользования! Также вы можете войти под двумя другими пользователями. Это personal и user. (Все данные о них можно найти в админ панеле Джанго)
						</p>
            <img src="mem.jpg" className='mx-auto d-block' />
        </div>
    )}
}