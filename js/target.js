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
				<p class='targets_item_title'>${item.name}</p>
				<button class='btn btn_targets' data-targets-id='${item.id}'>Открыть услугу</button>
			</div>
		`
		)
		targetsBlock.insertAdjacentElement('beforeend', targetsItem)
	})
}

const targetsRender = id => {
	const targetsItem = targetsItems.filter(item => item.id === Number(id))[0]
	targetsBlock.textContent = ''
	targetsBlock.insertAdjacentHTML(
		'beforeend',
		`<div class='targets_block'>
			<button class='btn btn_back'>Назад</button>
			<h1>${targetsItem.name}</h1>
			<div class='targets_description'>
				<img src='http://127.0.0.1:8005${targetsItem.picture}'>
				<p>${targetsItem.about}</p> 
			</div>
			<div class='targets_info'>
				<p>${targetsItem.price} рублей</p>
			</div>
			<button class='btn btn_buy'>Оформить заказ</button>
		</div>`
	)
}

axios.get('http://127.0.0.1:8005/api/get-targets-list/').then(res => {
	targetsItems.push(...res.data.data)
	allTargetsRender()
})

document.addEventListener('click', event => {
	const target = event.target
	if (target.classList.contains('btn_targets')) {
		targetsRender(target.dataset.targetsId)
	} else if (target.classList.contains('btn_back')) {
		allTargetsRender()
	}
})
