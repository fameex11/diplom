const newsBlock = document.querySelector('.news')
const newsItems = []

const allNewsRender = () => {
	newsBlock.textContent = ''

	newsItems.forEach(item => {
		const newsItem = document.createElement('div')
		newsItem.className = 'news_item'
		newsItem.insertAdjacentHTML(
			'beforeend',
			`
			<img src='http://127.0.0.1:8005${item.picture}'>
			<div class='news_item_info'>
				<p class='news_item_title'>${item.title}</p>
				<button class='btn btn_news' data-news-id='${item.id}'>Читать далее</button>
			</div>
		`
		)
		newsBlock.insertAdjacentElement('beforeend', newsItem)
	})
}

const newsRender = id => {
	const newsItem = newsItems.filter(item => item.id === Number(id))[0]
	newsBlock.textContent = ''
	newsBlock.insertAdjacentHTML(
		'beforeend',
		`<div class='news_block'>
			<button class='btn btn_back'>Назад</button>
			<h1>${newsItem.title}</h1>
			<div class='news_description'>
				<img src='http://127.0.0.1:8005${newsItem.picture}'>
				<p>${newsItem.news}</p>
			</div>
			<div class='news_info'>
				
				<p>Дата публикации:${newsItem.pub_date}</p>
			</div>
		</div>`
	)
}

axios.get('http://127.0.0.1:8005/api/get-news-list/').then(res => {
	newsItems.push(...res.data.data)
	allNewsRender()
})

document.addEventListener('click', event => {
	const target = event.target
	if (target.classList.contains('btn_news')) {
		newsRender(target.dataset.newsId)
	} else if (target.classList.contains('btn_back')) {
		allNewsRender()
	}
})
