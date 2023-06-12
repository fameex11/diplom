const targetsBlock = document.querySelector('.targets')
const targetsItems = []

const allTargetsRender = () => {
	targetsBlock.textContent = ''

	targetsItems.forEach(item => {
		const targetsItem = document.createElement('div')
		targetsItem.className = 'targets_item'
		targetsItem.insertAdjacentHTML(
			'beforeend',
			`
			<img src='http://127.0.0.1:8005${item.picture}'>
			<div class='targets_item_info'>
				<p class='targets_item_title'>${item.title}</p>
				<button class='btn btn_targets' data-targets-id='${item.id}'>Читать далее</button>
			</div>
		`
		)
		newsBlock.insertAdjacentElement('beforeend', targetsItem)
	})
}

const targetsRender = id => {
	const targetsItem = targetsItems.filter(item => item.id === Number(id))[0]
	targetsBlock.textContent = ''
	targetsBlock.insertAdjacentHTML(
		'beforeend',
		`<div class='targets_block'>
			<button class='btn btn_back'>Назад</button>
			<h1>${targetsItem.title}</h1>
			<img src='http://127.0.0.1:8005${targetsItem.picture}'>
			/* <p>${newsItem.news}</p> */
			<div class='targets_info'>
				// <p>${newsItem.author}</p>
				// <p>${newsItem.pub_date}</p>
			</div>
		</div>`
	)
}

axios.get('http://127.0.0.1:8005/api/get-news-list/').then(res => {
	targetsItems.push(...res.data.data)
	allTargetsRender()
})

document.addEventListener('click', event => {
	const target = event.target
	if (target.classList.contains('btn_targets')) {
		targetsRender(target.dataset.newsId)
	} else if (target.classList.contains('btn_back')) {
		allTargetsRender()
	}
})