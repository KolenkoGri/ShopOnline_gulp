import {loadArticles} from "./article.js";
const id = window.location.search.split('').slice(4).join('');

const pageContainer = document.querySelector('.page__container');

const renderPage = async() => {
    const data = await loadArticles(`https://gorest.co.in/public-api/posts/${id}`);
    const author = await loadArticles(`https://gorest.co.in/public-api/users/${data.data.user_id}`);
    
    pageContainer.insertAdjacentHTML('beforeend', `
        <div class="page__path">
            <a class="page__name" href = "index.html">Главная</a>
            <div class="page__arrow"></div>
            <a class="page__name" href = "blog.html">Блог</a>
            <div class="page__arrow"></div>
            <div class="page__name">${data.data.title}</div>
        </div>
        <div class="page__info">
            <div class="page__block">
                <div class="page__title">${data.data.title}</div>
                <div class="page__description">
                    ${data.data.body}
                </div>                
                <div class="page__bottom">
                    <div class="page__bottom-left">
                        <a class="page__arrow-back" href="index.html"></a>
                        <div class="page__back">К списку статей</div>
                    </div>
                    <div class="page__bottom-right">
                        <div class="page__author">${author.user_id ? author.user_id : "Автор не загрузился"}</div>
                        <div class="article__date page__date">22 октября 2021, 12:45</div>
                        <div class="article__metrics">
                            <div class="article__views">
                                <div class="article__image--eye"></div>
                                <div class="article__count--eye">1.9K</div>
                            </div>
                            <div class="article__comments">
                                <div class="article__image--message"></div>
                                <div class="article__count--message">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page__ads">
                <div class="page__ads-block page__ads-block--one">
                    <h3 class="page__ads--title">Горящие туры в Стамбул 
                        от 20 000 руб.</h3>
                    <h4 class="page__ads--description">Окунись в настоящую восточную сказку</h4>
                </div>
                <div class="page__ads-block page__ads-block--two">
                    <h3 class="page__ads--title">Новый RENAULT DUSTER</h3>
                    <h4 class="page__ads--description">Легендарный внедорожник в новом дизайне</h4>
                </div>
            </div>
        </div>
        `)
};

renderPage();
