const catBlock = document.querySelector('.categories')
const targetsArray = []
const query = new URLSearchParams(window.location.search).get('catId')

const allTargetsRender = () => {
	catBlock.textContent = ''
	targetsArray.forEach(elem => {
		catBlock.insertAdjacentHTML(
			'beforeend',
			`<div class='categories_block'>
				<h1>${elem.name}</h1>
				<img src='http://127.0.0.1:8005${elem.picture}'>
				<p>${elem.price} Рублей</p>
				<button class='btn btn_target' data-target-id='${elem.id}'>Открыть услугу</button>
			</div>`
		)
	})
}

const targetRender = id => {
	const targetsItem = targetsArray.filter(item => item.id === Number(id))[0]
	catBlock.textContent = ''
	catBlock.insertAdjacentHTML(
		'beforeend',
		`<div class='targets_block'>
			<button class='btn btn_back'>Назад</button>
			<h1>${targetsItem.name}</h1>
			<img src='http://127.0.0.1:8005${targetsItem.picture}'>
			<p>${targetsItem.about}</p> 
			<div class='targets_info'>
				<p>${targetsItem.price}</p>
			</div>
		</div>`
	)
}

axios.get('http://127.0.0.1:8005/api/get-targets-list/').then(res => {
	const { data } = res
	const filterCat = data.data.filter(elem => elem.category === Number(query))
	targetsArray.push(...filterCat)
	allTargetsRender()
})

document.addEventListener('click', event => {
	const target = event.target
	if (target.classList.contains('btn_target')) {
		targetRender(target.dataset.targetId)
	} else if (target.classList.contains('btn_back')) {
		allTargetRender()
	}
})
