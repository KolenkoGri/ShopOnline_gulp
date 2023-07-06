const articleList = document.querySelector('.article__list');
const paginationArrowLeft = document.querySelector('.pagination__arrow-left');
const paginationArrowRight = document.querySelector('.pagination__arrow-right');
const pagination = document.querySelector('.pagination__pages');

export const loadArticles = async (url = 'https://gorest.co.in/public-api/posts') => {
    const result = await fetch(url);
    const data = await result.json();
    return data;
}

const loadPagination = () => {
    const paginationNumber = document.querySelectorAll('.pagination__number');
    paginationNumber.forEach((p) => {
        p.addEventListener('click', () => {
            articleList.replaceChildren();
            pagination.replaceChildren();
            loadArticles(`https://gorest.co.in/public-api/posts?page=${p.textContent}`);
            renderArticles();
        });
    });
};

const renderArticles = async () => {
    const data = await loadArticles();

    data.data.map((item) => {
        articleList.insertAdjacentHTML('beforeend', `
        <li class="article__item">
            <div class="article__image--main"></div>
            <div class="article__info">
                <a class="article__title" href="page.html?id=${item.id}" >${item.title}</a>
                <div class="article__date">22 октября 2021, 12:45</div>
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
        </li> 
        `);
    });

    for (let i = 1; i <= data.meta.pagination.pages; i ++ ){
        pagination.insertAdjacentHTML('beforeend', `
        <a class="pagination__number">${i}</a>
    `)
    }
    paginationArrowLeft.addEventListener('click', () => {
        if(data.meta.pagination.page !== 1) {
            articleList.replaceChildren();
            pagination.replaceChildren();
            loadArticles(`https://gorest.co.in/public-api/posts?page=${data.meta.pagination.page - 1}`);
            renderArticles();
        }
    });

    paginationArrowRight.addEventListener('click', () => {
        if(data.meta.pagination.page !== data.meta.pagination.pages) {
            articleList.replaceChildren();
            pagination.replaceChildren();
            loadArticles(`https://gorest.co.in/public-api/posts?page=${data.meta.pagination.page + 1}`);
            renderArticles();
        }
    });

    loadPagination();
}

renderArticles();


