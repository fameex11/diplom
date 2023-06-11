const categoriesBlock = document.querySelector('.categories_cards')

axios.get('http://127.0.0.1:8005/api/get-category-list/').then(res => {
	const { data } = res
	console.log(data)
	data.data.forEach(element => {
		const link = document.createElement('a')
		link.className = 'categories_item'
		link.href = `/categories/${element.id}`
		link.insertAdjacentHTML(
			'beforeend',
			`<img src='http://127.0.0.1:8005${element.picture}'>
				<p>${element.name}</p>`
		)
		categoriesBlock.insertAdjacentElement('beforeend', link)
	})
})
